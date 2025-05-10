import type { FindDepartmentsList } from '@/contracts/departments'
import { prisma } from '@/lib/prisma'

export const getDepartmentOptionsQuery = async (search?: string) => {
  const departments = await prisma.department.findMany({
    where: {
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
    take: search ? 10 : undefined,
  })

  return departments.map((department) => ({
    label: department.name,
    value: department.id,
  }))
}

export const getDepartmentBySlugQuery = (slug: string) => {
  return prisma.department.findUnique({
    where: {
      slug,
    },
  })
}

export const getDepartmentListQuery = async ({
  limit,
  offset,
  column = 'createdAt',
  fromDay,
  order = 'desc',
  search,
  toDay,
}: FindDepartmentsList) => {
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

  const departments = await prisma.department.findMany({
    include: {
      _count: true,
    },
    where: {
      name: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.department.count({
    where: {
      name: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { departments, count }
}

export const getDepartmentListByStoreIdQuery = async (storeId: string) => {
  return prisma.department.findMany({
    select: {
      slug: true,
      name: true,
    },
    where: {
      products: {
        some: {
          prices: {
            some: {
              storeId,
            },
          },
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
}
