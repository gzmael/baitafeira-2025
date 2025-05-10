import type { Address } from '@/generated/prisma/client'

import type { FindGenericList } from './commons'

export type AddressFields = keyof Address
export type FindAddressesList = FindGenericList<AddressFields>

export type AddressWithCounts = Address & {
  profile: {
    name: string
  }
  store: {
    name: string
  }
}
