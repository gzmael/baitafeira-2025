import type { Brand } from '@prisma/client'

import type { FindGenericList } from './commons'

export type BrandFields = keyof Brand
export type FindBrandsList = FindGenericList<BrandFields>

export type BrandWithCounts = Brand & {
  _count: {
    products: number
  }
}
