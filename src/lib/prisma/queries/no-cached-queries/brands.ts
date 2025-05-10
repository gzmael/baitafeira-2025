import type { FindBrandsList } from '@/contracts/brand'
import { prisma } from '@/lib/prisma'

export const getBrandBySlugQuery = (slug: string) => {
  return prisma.brand.findUnique({
    where: {
      slug,
    },
  })
}

export const getBrandsOptionsQuery = async (search = '') => {
  const brands = await prisma.brand.findMany({
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
    take: 10,
  })

  return brands.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }))
}

export const getBrandsListQuery = async ({
  limit,
  offset,
  column = 'createdAt',
  fromDay,
  order = 'desc',
  search,
  toDay,
}: FindBrandsList) => {
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

  const brands = await prisma.brand.findMany({
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

  const count = await prisma.brand.count({
    where: {
      name: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { brands, count }
}
