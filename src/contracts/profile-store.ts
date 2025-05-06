import type { AuthUser, ProfileStore } from '@prisma/client'

import type { FindGenericList } from './commons'

export type ProfileStoreFields = keyof ProfileStore
export type FindProfileStoresList = FindGenericList<ProfileStoreFields>

export type ProfileStoreWithCounts = ProfileStore & {
  user?: AuthUser
}

export type CreateProfileStorePayload = Pick<
  ProfileStore,
  'name' | 'lastName' | 'phone' | 'typeUser' | 'userId' | 'storeId'
>
