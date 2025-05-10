import type { FindZipCodesList } from '@/contracts/zip-code'
import { prisma } from '@/lib/prisma'

export const getZipCodesListByStoreIdQuery = async (
  {
    limit,
    offset,
    column = 'createdAt',
    fromDay,
    order = 'desc',
    search,
    toDay,
  }: FindZipCodesList,
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

  const zipCodes = await prisma.zipCode.findMany({
    include: {
      _count: true,
    },
    where: {
      stores: {
        some: {
          id: storeId,
        },
      },
      createdAt: dayFilter,
      zipCode: search ? { contains: search } : undefined,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.zipCode.count({
    where: {
      zipCode: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { zipCodes, count }
}

export const getZipCodeByCepQuery = (zipCode: string) => {
  return prisma.zipCode.findUnique({
    where: {
      zipCode,
    },
  })
}

export const getZipCodeListQuery = async ({
  limit,
  offset,
  column = 'createdAt',
  fromDay,
  order = 'desc',
  search,
  toDay,
}: FindZipCodesList) => {
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

  const zipCodes = await prisma.zipCode.findMany({
    include: {
      _count: true,
    },
    where: {
      zipCode: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.zipCode.count({
    where: {
      zipCode: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { zipCodes, count }
}

export const getSearchCitiesOptionsQuery = async (search?: string) => {
  const storesWithEnabledPricesAndZipCode = await prisma.store.findMany({
    where: {
      prices: {
        some: {
          isEnabledSale: true,
        },
      },
      zipCodes: {
        some: {
          city: search ? { contains: search, mode: 'insensitive' } : undefined,
        },
      },
    },
    select: {
      zipCodes: {
        select: {
          city: true,
        },
        distinct: ['city'],
        where: {
          city: search ? { contains: search, mode: 'insensitive' } : undefined,
        },
      },
    },
  })

  const uniqueCitiesSet = new Set(
    storesWithEnabledPricesAndZipCode.flatMap((store) =>
      store.zipCodes.map((zipCode) => zipCode.city)
    )
  )
  const uniqueCities = Array.from(uniqueCitiesSet)

  return uniqueCities.map((city) => ({
    value: city,
    label: city,
  }))
}

export const getStoreByZipCodeQuery = (zipCode: string, storeId: string) => {
  return prisma.store.findFirst({
    where: { zipCodes: { some: { zipCode } }, id: storeId },
  })
}
