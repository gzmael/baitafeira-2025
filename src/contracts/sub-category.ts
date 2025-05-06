import type { SubCategory } from '@prisma/client'

import type { FindGenericList } from './commons'

export type SubCategoryFields = keyof SubCategory
export type FindSubCategorysList = FindGenericList<SubCategoryFields> & {
  category?: string
}

export type SubCategoryWithCounts = SubCategory & {
  category: {
    name: string
  }
  _count: {
    category: number
    products: number
  }
}
