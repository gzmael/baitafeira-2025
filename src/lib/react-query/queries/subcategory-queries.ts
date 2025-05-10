import { queryOptions, useQuery } from '@tanstack/react-query'

import {
  getSubCategoriesOptions,
  getSubCategoriesSearchOptions,
} from '@/lib/prisma/queries/cached-queries'

async function getSubCategoryOptions(categoryId?: string) {
  if (!categoryId) return []
  const subCategories = await getSubCategoriesOptions(categoryId)
  return subCategories
}

export function useSubCategoryByCategoryOptions(categoryId?: string) {
  return useQuery(
    queryOptions({
      queryKey: ['subcategories-by-category-options', categoryId],
      queryFn: () => getSubCategoryOptions(categoryId),
    })
  )
}

async function getSubCategorySearchOptions(search?: string) {
  const subCategories = await getSubCategoriesSearchOptions(search)
  return subCategories
}

export function useSubCategorySearchOptions(search?: string) {
  return useQuery(
    queryOptions({
      queryKey: ['subcategories-search-options', search],
      queryFn: () => getSubCategorySearchOptions(search),
    })
  )
}
