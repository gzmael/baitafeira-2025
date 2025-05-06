import type { Tag } from '@prisma/client'

import type { FindGenericList } from './commons'

export type TagFields = keyof Tag
export type FindTagsList = FindGenericList<TagFields>

export type TagWithCounts = Tag & {
  _count: {
    products: number
  }
}
