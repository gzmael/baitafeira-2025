import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { DataTableFilterField } from '@/contracts/commons'
import { useDebounce } from '@/hooks/use-debounce'

import { DataTablePagination } from './DataTablePagination'
import { DataTableToolbar } from './DataTableToolbar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number
  filterFields?: DataTableFilterField<TData>[]
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>
  defaultSort?: `${Extract<keyof TData, string | number>}.${'asc' | 'desc'}`
  defaultPerPage?: number
}

const schema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().optional(),
  sort: z.string().optional(),
})

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  filterFields = [],
  deleteRowsAction,
  defaultSort = 'createdAt.desc' as `${Extract<keyof TData, string | number>}.${'asc' | 'desc'}`,
  defaultPerPage = 10,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Search params
  const search = schema.parse(Object.fromEntries(searchParams))
  const page = search.page
  const perPage = search.per_page ?? defaultPerPage
  const sort = search.sort ?? defaultSort
  const [column, order] = sort?.split('.') ?? []

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    }
  }, [filterFields])

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  // Initial column filters
  const initialColumnFilters: ColumnFiltersState = useMemo(() => {
    return Array.from(searchParams.entries()).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        const filterableColumn = filterableColumns.find(
          (column) => column.value === key
        )
        const searchableColumn = searchableColumns.find(
          (column) => column.value === key
        )

        if (filterableColumn) {
          filters.push({
            id: key,
            value: value.split('.'),
          })
        } else if (searchableColumn) {
          filters.push({
            id: key,
            value: [value],
          })
        }

        return filters
      },
      []
    )
  }, [filterableColumns, searchableColumns, searchParams])

  // Table states
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters)

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: perPage,
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  useEffect(() => {
    setPagination({
      pageIndex: Number(page) - 1,
      pageSize: Number(perPage),
    })
  }, [page, perPage])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
      })}`,
      {
        scroll: false,
      }
    )
  }, [pageIndex, pageSize])

  // Handle server-side sorting
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: column ?? '',
      desc: order === 'desc',
    },
  ])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page,
        sort: sorting[0]?.id
          ? `${sorting[0]?.id}.${sorting[0]?.desc ? 'desc' : 'asc'}`
          : null,
      })}`,
      {
        scroll: false,
      }
    )
  }, [sorting])

  // Handle server-side filtering
  const debouncedSearchableColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter) => {
          return searchableColumns.find((column) => column.value === filter.id)
        })
      ),
      500
    )
  ) as ColumnFiltersState

  const filterableColumnFilters = columnFilters.filter((filter) => {
    return filterableColumns.find((column) => column.value === filter.id)
  })

  const [mounted, setMounted] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Prevent resetting the page on initial render
    if (!mounted) {
      setMounted(true)
      return
    }

    // Initialize new params
    const newParamsObject = {
      page: 1,
    }

    // Handle debounced searchable column filters
    for (const column of debouncedSearchableColumnFilters) {
      if (typeof column.value === 'string') {
        Object.assign(newParamsObject, {
          [column.id]: typeof column.value === 'string' ? column.value : null,
        })
      }
    }

    // Handle filterable column filters
    for (const column of filterableColumnFilters) {
      if (typeof column.value === 'object' && Array.isArray(column.value)) {
        Object.assign(newParamsObject, { [column.id]: column.value.join('.') })
      }
    }
    // Remove deleted values
    for (const key of Array.from(searchParams.keys())) {
      if (
        (searchableColumns.find((column) => column.value === key) &&
          !debouncedSearchableColumnFilters.find(
            (column) => column.id === key
          )) ||
        (filterableColumns.find((column) => column.value === key) &&
          !filterableColumnFilters.find((column) => column.id === key))
      ) {
        Object.assign(newParamsObject, { [key]: null })
      }
    }

    // After cumulating all the changes, push new params
    router.push(`${pathname}?${createQueryString(newParamsObject)}`)

    table.setPageIndex(0)
  }, [
    JSON.stringify(debouncedSearchableColumnFilters),
    JSON.stringify(filterableColumnFilters),
  ])

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  })

  return (
    <div className="w-full space-y-3 overflow-auto">
      <DataTableToolbar
        table={table}
        filterFields={filterFields}
        deleteRowsAction={deleteRowsAction}
      />
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
