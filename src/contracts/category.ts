import type { Category } from '@/generated/prisma/client'

import type { FindGenericList } from './commons'

export type CategoryFields = keyof Category
export type FindCategorysList = FindGenericList<CategoryFields> & {
  department?: string
}

export type CategoryWithCounts = Omit<Category, 'updateAt'> & {
  department: {
    name: string
  }
  _count: {
    department: number
    subCategories: number
  }
}
