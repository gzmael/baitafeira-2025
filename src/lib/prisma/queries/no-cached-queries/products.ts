import type { ProductStatus } from '@/generated/prisma/client'

import type {
  FindProductsList,
  ProductWithCounts,
  ProductWithImages,
} from '@/contracts/products'
import { formatSearchQueryOr, isEANorGTINBarcode } from '@/lib/utils'

import { prisma } from '../..'

export const getProductByBarCodeQuery = ({
  barCode,
}: {
  barCode: string
}): Promise<ProductWithImages | null> => {
  return prisma.product.findFirst({
    include: {
      productImages: true,
      subCategory: true,
      brand: true,
      productTags: true,
    },
    where: {
      barCode,
    },
  })
}

export const getProductBySlugQuery = (slug: string) => {
  return prisma.product.findUnique({
    where: {
      slug,
    },
  })
}

export const getProductsByBarcodeOptionsQuery = async (barCode?: string) => {
  let searchCondition = {}

  const isBarcode = barCode ? isEANorGTINBarcode(barCode) : false

  if (barCode) {
    searchCondition = isBarcode
      ? {
          OR: [{ barCode: { contains: barCode } }],
        }
      : {
          name: {
            search: formatSearchQueryOr(barCode),
            mode: 'insensitive',
          },
        }
  }

  const products = await prisma.product.findMany({
    where: searchCondition,
    select: {
      id: true,
      name: true,
      barCode: true,
    },
    orderBy: {
      name: 'asc',
    },
    take: barCode ? 10 : 15,
  })

  return products.map((product) => ({
    value: product.barCode,
    label: `${product.barCode} - ${product.name}`,
  }))
}

export const getProductListQuery = async ({
  limit,
  offset,
  column = 'createdAt',
  fromDay,
  order = 'desc',
  search,
  subCategory,
  toDay,
  status,
}: FindProductsList): Promise<{
  products: ProductWithCounts[]
  count: number
}> => {
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

  const subCategoriesSearch = subCategory
    ? {
        subCategory: {
          id: {
            in: subCategory.split('.'),
          },
        },
      }
    : undefined

  const statusFilter = status
    ? {
        in: status.split('.') as ProductStatus[],
      }
    : undefined

  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      barCode: true,
      subCategoryId: true,
      slug: true,
      description: true,
      status: true,
      subCategory: {
        select: {
          name: true,
        },
      },
      productImages: {
        select: {
          imageName: true,
          imageUrl: true,
        },
        take: 1,
      },
      createdAt: true,
    },
    where: {
      ...(search
        ? {
            OR: [
              { barCode: { contains: search } },
              {
                name: {
                  search: formatSearchQueryOr(search),
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
      ...subCategoriesSearch,
      status: statusFilter,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.product.count({
    where: {
      ...(search
        ? {
            OR: [
              { barCode: { contains: search } },
              {
                name: {
                  search: formatSearchQueryOr(search),
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
      ...subCategoriesSearch,
      status: statusFilter,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { products, count }
}
