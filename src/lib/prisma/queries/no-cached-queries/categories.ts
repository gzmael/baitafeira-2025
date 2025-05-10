import type { FindCategorysList } from '@/contracts/category'
import { prisma } from '@/lib/prisma'

export const getCategoryBySlugQuery = (slug: string) => {
  return prisma.category.findUnique({
    where: {
      slug,
    },
  })
}

export const getCategoryListQuery = async ({
  limit,
  offset,
  column = 'createdAt',
  fromDay,
  order = 'desc',
  search,
  department,
  toDay,
}: FindCategorysList) => {
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

  const departmentsSearch = department
    ? {
        department: {
          id: {
            in: department.split('.'),
          },
        },
      }
    : undefined

  const categories = await prisma.category.findMany({
    select: {
      department: {
        select: {
          name: true,
        },
      },
      departmentId: true,
      id: true,
      name: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
    },
    where: {
      name: search ? { contains: search } : undefined,
      ...departmentsSearch,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.category.count({
    where: {
      name: search ? { contains: search } : undefined,
      ...departmentsSearch,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { categories, count }
}

export const getCategoriesOptionsQuery = async (departmentId?: string) => {
  const categories = await prisma.category.findMany({
    where: {
      departmentId,
    },
    select: {
      id: true,
      name: true,
      departmentId: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return categories.map((category) => ({
    value: category.id,
    label: category.name,
    department: category.departmentId,
  }))
}
