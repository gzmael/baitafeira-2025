import type { Prisma, ShippingType } from '@prisma/client'

import type { GeneralShippingSchemaType } from '@/validators/shippingValidator'

type Common = {
  minimumTime: number
  maximumTime: number
}

export type NeighborhoodItem = Common & {
  id: string
  city: string
  neighborhood: string
  ibgeCode: string
  cost: number
}

export type TaxByNeighborhood = {
  list: NeighborhoodItem[]
}

export type DynamicItem = Common & {
  id: string
  variant: 'fixed' | 'km'
  maxKm: number
  cost: number
}

export type TaxDynamic = Common & {
  list: DynamicItem[]
}

type TaxFixed = Common & {
  cost: number
}

export type ShippingAttributesJson = {
  dynamic: TaxDynamic | null
  neighborhood: TaxByNeighborhood | null
  fixed: TaxFixed | null
  general?: GeneralShippingSchemaType | null
}

export type ShippingResponse = {
  type: ShippingType
  id: string
  attributes: Prisma.JsonValue
  minimumAmount: number | null
} | null

export type UpdateShippingPayloadType = {
  type: ShippingType
  attributes?: ShippingAttributesJson
  minimumAmount: number | null
  storeId: string
}

/* 

{
type: 'neighborhood'
list: [
  {
    city: 'São Paulo',
    neighborhood: 'Centro',
    ibgeCode: '3550308',
    cost: 10
  }
]
}

*/
