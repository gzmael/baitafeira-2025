import { queryOptions, useQuery } from '@tanstack/react-query'

import { getSearchStoresByCity } from '@/lib/prisma/queries/cached-queries'

const getStoresByCityOption = async (city: string, search?: string) => {
  const response = await getSearchStoresByCity(city, search)
  return response
}

export function useStoresByCityOptions(city: string, search?: string) {
  return useQuery(
    queryOptions({
      queryKey: ['stores-by-city-options', city, search],
      queryFn: () => getStoresByCityOption(city, search),
    })
  )
}
