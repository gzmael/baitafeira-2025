import { queryOptions, useQuery } from '@tanstack/react-query'

import { getSearchCitiesOptions } from '@/lib/prisma/queries/cached-queries'

export function useCitiesOptions(search?: string) {
  return useQuery(
    queryOptions({
      queryKey: ['cities-options', search ?? ''],
      queryFn: async () => {
        const response = await getSearchCitiesOptions(search)
        return response
      },
    })
  )
}
