import { useQuery } from '@tanstack/react-query'

import { getCategoriesOptions } from '@/lib/prisma/queries/cached-queries'

async function getCategoryOptions(departmentId?: string) {
  const categories = await getCategoriesOptions(departmentId)
  return categories
}

export function useCategoryByDepartmentOptions(departmentId?: string) {
  return useQuery({
    queryKey: ['categories-by-department-options', departmentId],
    queryFn: () => getCategoryOptions(departmentId),
  })
}
