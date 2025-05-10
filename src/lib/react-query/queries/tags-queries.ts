import { useQuery } from '@tanstack/react-query'

import { getTagOptions } from '@/lib/prisma/queries/cached-queries'

async function getTagOptionsQuery(search?: string) {
  const tags = await getTagOptions(search)
  return tags
}

export function useTagSearchOptions(search?: string) {
  return useQuery({
    queryKey: ['tags-search-options', search],
    queryFn: () => getTagOptionsQuery(search),
  })
}
