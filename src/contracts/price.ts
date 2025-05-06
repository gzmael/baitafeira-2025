import type { Price } from '@prisma/client'

import type { FindGenericList } from './commons'

export type PriceFields = keyof Price
export type FindPricesList = FindGenericList<PriceFields>

export type PriceWithCounts = {
  id: string
  cost: number
  offerCost: number | null
  offerStartDate: Date | null
  offerEndDate: Date | null
  isOffer: boolean
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
  updatedBy: string | null
  isEnabledSale: boolean
  isFractionalSale: boolean
  maxUnits: number
  product: {
    id: string
    barCode: string | null
    name: string | null
    productImages: {
      imageUrl: string | null
      imageName: string | null
    }[]
  }
  stock: {
    quantity: number | null
    minAlert: number | null
  } | null
}

export type PriceOffersAndFeatured = {
  cost: number
  offerCost: number | null
  isOffer: boolean | null
  isFeatured: boolean | null
  product: {
    name: string
    slug: string
    productImages: {
      imageUrl: string | null
      imageName: string | null
    }[]
  }
}

export type SearchPricesResponse = {
  prices: {
    rank?: number
    product: {
      name: string
      slug: string
      productImages: {
        imageUrl: string
      }[]
    }
    productId: string
  }[]
  subCategories: {
    name: string
    slug: string
  }[]
  brands: {
    name: string
    slug: string
  }[]
}

export type SearchRawProductResponse = {
  name: string
  id: string
  slug: string
  rank: number
  highlight: string
}
