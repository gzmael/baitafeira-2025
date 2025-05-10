import type { StatusInvoice } from '@/generated/prisma/client'

import type { FindInvoicesList } from '@/contracts/invoice'
import { prisma } from '@/lib/prisma'

export const getInvoicesListByStoreQuery = async (
  {
    limit,
    offset,
    column = 'createdAt',
    fromDay,
    order = 'desc',
    toDay,
    status,
  }: FindInvoicesList,
  storeId: string
) => {
  const dayFilter =
    fromDay && toDay
      ? {
          gte: fromDay,
          lte: toDay,
        }
      : undefined

  const orderFilter =
    column && order
      ? {
          [column]: order,
        }
      : undefined

  const statusFilter = status
    ? { in: status.split('.').map((status) => status as StatusInvoice) }
    : undefined

  const invoices = await prisma.invoice.findMany({
    where: {
      store: {
        id: storeId,
      },
      createdAt: dayFilter,
      status: statusFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.invoice.count({
    where: {
      store: {
        id: storeId,
      },
      createdAt: dayFilter,
      status: statusFilter,
    },
    orderBy: orderFilter,
  })

  return { invoices, count }
}
