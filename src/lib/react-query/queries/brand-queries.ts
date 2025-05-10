import { queryOptions, useQuery } from '@tanstack/react-query'

import { getBrandsOptions } from '@/lib/prisma/queries/cached-queries'

const getBrandOption = async (search = '') => {
  const response = await getBrandsOptions(search)
  return response
}

export function useBrandSearchOptions(search?: string) {
  return useQuery(
    queryOptions({
      queryKey: ['brands-search-options', search],
      queryFn: () => getBrandOption(search),
    })
  )
}
