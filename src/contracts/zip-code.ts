import type { ZipCode } from '@/generated/prisma/client'

import type { FindGenericList } from './commons'

export type ZipCodeFields = keyof ZipCode
export type FindZipCodesList = FindGenericList<ZipCodeFields>

export type ZipCodeWithCounts = ZipCode & {
  _count: {
    stores: number
  }
}
