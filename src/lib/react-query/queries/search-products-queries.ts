import { queryOptions, useQuery } from '@tanstack/react-query'

import type { SearchPricesResponse } from '@/contracts/price'
import { apiLocal } from '@/lib/axios'

const getSearchProducts = async (search: string) => {
  if (!search || search.length < 3)
    return {
      subCategories: [],
      prices: [],
      brands: [],
    }

  const response = await apiLocal.get<SearchPricesResponse>(
    `/search?query=${search}`
  )
  return response.data
}

export function useSearchProducts(search: string) {
  return useQuery(
    queryOptions({
      queryKey: ['search-products', search],
      queryFn: async () => {
        const response = await getSearchProducts(search)
        return response
      },
    })
  )
}
