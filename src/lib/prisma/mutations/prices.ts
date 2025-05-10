import { PriceWithCounts } from '@/contracts/price'
import {
  AvailabilityPriceSchemaType,
  CreatePriceDetailsSchemaType,
  UpdatePriceOfferSchemaType,
  StockPriceSchemaType,
} from '@/validators/priceValidator'

import { prisma } from '..'

const MULTIPLIER = 100

export const createPriceQuery = (
  payload: CreatePriceDetailsSchemaType,
  productId: string,
  storeId: string,
  updatedBy: string,
): Promise<PriceWithCounts> => {
  return prisma.price.create({
    data: {
      cost: payload.cost * MULTIPLIER,
      updatedBy,
      productId,
      storeId,
      stock: {
        create: {
          quantity: 0,
        },
      },
    },
    select: {
      id: true,
      cost: true,
      offerCost: true,
      offerStartDate: true,
      offerEndDate: true,
      isFeatured: true,
      isOffer: true,
      isEnabledSale: true,
      isFractionalSale: true,
      maxUnits: true,
      createdAt: true,
      updatedAt: true,
      updatedBy: true,
      product: {
        select: {
          id: true,
          barCode: true,
          name: true,
          productImages: {
            select: {
              imageUrl: true,
              imageName: true,
            },
          },
        },
      },
      stock: {
        select: {
          quantity: true,
          minAlert: true,
        },
      },
    },
  })
}

export const updatePriceCostQuery = (
  cost: number,
  isFeatured: boolean,
  priceId: string,
  updatedBy: string,
) => {
  return prisma.price.update({
    where: {
      id: priceId,
    },
    data: {
      cost: cost * MULTIPLIER,
      isFeatured,
      updatedBy,
    },
  })
}

export const updatePriceOfferQuery = (
  {
    isOffer,
    offerCost,
    offerEndDate,
    offerStartDate,
  }: UpdatePriceOfferSchemaType,
  priceId: string,
  updatedBy: string,
) => {
  return prisma.price.update({
    where: {
      id: priceId,
    },
    data: {
      isOffer,
      offerCost: offerCost ? offerCost * MULTIPLIER : undefined,
      offerStartDate,
      offerEndDate,
      updatedBy,
    },
  })
}

export const updatePriceAvailabilityQuery = (
  payload: AvailabilityPriceSchemaType,
  priceId: string,
  updatedBy: string,
) => {
  return prisma.price.update({
    where: {
      id: priceId,
    },
    data: {
      isEnabledSale: payload.isEnabledSale,
      isFractionalSale: payload.isFractionalSale,
      maxUnits: payload.maxUnits,
      updatedBy,
    },
  })
}

export const updatePriceStockQuery = (
  { minAlert, quantity }: StockPriceSchemaType,
  priceId: string,
  updatedBy: string,
) => {
  return prisma.price.update({
    where: {
      id: priceId,
    },
    data: {
      stock: {
        update: {
          quantity,
          minAlert,
        },
      },
      updatedBy,
    },
  })
}

export const deletePriceQuery = (priceId: string) => {
  return prisma.price.delete({
    where: {
      id: priceId,
    },
  })
}
