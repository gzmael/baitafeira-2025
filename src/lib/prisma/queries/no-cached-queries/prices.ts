import type {
  FindPricesList,
  PriceOffersAndFeatured,
  SearchPricesResponse,
  SearchRawProductResponse,
} from '@/contracts/price'
import { prisma } from '@/lib/prisma'
import { constructPrefixTsQuery, isEANorGTINBarcode } from '@/lib/utils'

export const getPriceByBarCodeQuery = (barCode: string, storeId: string) => {
  return prisma.price.findFirst({
    where: {
      storeId: storeId,
      product: {
        barCode,
      },
    },
    include: {
      product: {
        select: {
          id: true,
          barCode: true,
          name: true,
          productImages: true,
        },
      },
      stock: true,
    },
  })
}

export const getPriceListQuery = async (
  {
    limit,
    offset,
    column,
    fromDay,
    order = 'asc',
    search,
    toDay,
  }: FindPricesList,
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

  const prices = await prisma.price.findMany({
    select: {
      id: true,
      cost: true,
      offerCost: true,
      isOffer: true,
      isFeatured: true,
      offerStartDate: true,
      offerEndDate: true,
      createdAt: true,
      updatedAt: true,
      updatedBy: true,
      isEnabledSale: true,
      isFractionalSale: true,
      maxUnits: true,
      product: {
        select: {
          id: true,
          barCode: true,
          name: true,
          productImages: true,
        },
      },
      stock: {
        select: {
          quantity: true,
          minAlert: true,
        },
      },
    },
    where: {
      storeId,
      product: search
        ? {
            OR: [
              { name: { contains: search.toUpperCase() } },
              { barCode: search ? { contains: search } : undefined },
            ],
          }
        : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.price.count({
    where: {
      storeId,
      product: search
        ? {
            OR: [
              { name: { contains: search.toUpperCase() } },
              { barCode: search ? { contains: search } : undefined },
            ],
          }
        : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { prices, count }
}

export const getPriceListOffersQuery = async (
  storeId: string
): Promise<PriceOffersAndFeatured[]> => {
  const prices = await prisma.price.findMany({
    select: {
      cost: true,
      offerCost: true,
      isOffer: true,
      isFeatured: true,
      product: {
        select: {
          name: true,
          slug: true,
          productImages: {
            select: {
              imageUrl: true,
              imageName: true,
            },
          },
        },
      },
    },
    where: {
      storeId,
      isOffer: true,
    },
    take: 12,
  })

  return prices
}

export const getPriceListFeaturedQuery = async (storeId: string) => {
  const prices = await prisma.price.findMany({
    select: {
      cost: true,
      offerCost: true,
      isOffer: true,
      isFeatured: true,
      product: {
        select: {
          name: true,
          slug: true,
          productImages: {
            select: {
              imageUrl: true,
              imageName: true,
            },
          },
        },
      },
    },
    where: {
      storeId,
      isFeatured: true,
    },
    take: 12,
  })

  return prices
}

export const getSearchProductsQuery = async (
  search: string,
  storeId: string
): Promise<SearchPricesResponse> => {
  let searchCondition = {}
  const totalResults = 12

  const isBarcode = search ? isEANorGTINBarcode(search) : false
  const searchFormattedOr = constructPrefixTsQuery(search, 'or')

  const results = await prisma.$queryRaw<SearchRawProductResponse[]>`SELECT
  prod."name",
  prod."id",
  prod."slug",
  ts_rank(to_tsvector('english', prod.name), query) AS rank
FROM
  "products" as prod,
  to_tsquery('english', ${constructPrefixTsQuery(search, 'and', true)}) query
WHERE
  to_tsvector('english', name) @@ to_tsquery('english', ${constructPrefixTsQuery(search, 'and', true)})
ORDER BY rank DESC`

  const productsIds = results.map((result) => result.id)

  if (search) {
    searchCondition = isBarcode
      ? { barCode: { contains: search } }
      : {
          id: {
            in: productsIds,
          },
        }
  }

  const subCategories = await prisma.subCategory.findMany({
    select: {
      slug: true,
      name: true,
    },
    where: {
      name: {
        search: searchFormattedOr,
        mode: 'insensitive',
      },
    },
    take: 2,
    orderBy: {
      _relevance: {
        search: searchFormattedOr,
        fields: ['name'],
        sort: 'desc',
      },
    },
  })

  const brands = await prisma.brand.findMany({
    select: {
      slug: true,
      name: true,
    },
    where: {
      name: {
        search: searchFormattedOr,
        mode: 'insensitive',
      },
    },
    take: 2,
    orderBy: {
      _relevance: {
        search: searchFormattedOr,
        fields: ['name'],
        sort: 'desc',
      },
    },
  })

  const prices = await prisma.price.findMany({
    select: {
      productId: true,
      product: {
        select: {
          slug: true,
          name: true,
          productImages: {
            select: {
              imageUrl: true,
            },
            take: 1,
          },
        },
      },
    },
    where: {
      storeId,
      product: searchCondition,
    },
    take: totalResults - brands.length - subCategories.length,
  })

  const pricesWithRank = prices.map((price) => {
    return {
      ...price,
      rank: results.find((result) => result.id === price.productId)?.rank || 0,
    }
  })

  const pricesOrdered = pricesWithRank.sort((a, b) => b.rank - a.rank)

  return { prices: pricesOrdered, subCategories, brands }
}
