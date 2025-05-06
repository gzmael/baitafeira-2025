import type { Prisma, StoreTypeUser, TypeUser } from '@prisma/client'

import type { CreateProfileSchemaType } from '@/validators/profileValidator'

type UserGenericType = {
  id: string
  name: string
  preferences: Prisma.JsonValue
  email: string
  image?: string
}

export type ProfileAdmin = UserGenericType & {
  role: TypeUser
  storeId?: null
  store?: null
}

export type ProfileStore = UserGenericType & {
  role: StoreTypeUser
  storeId: string
  phone: string | null
  lastName: string | null
  updatedAt: Date | null
  store: {
    plan: {
      id: string
      name: string
    }
    id: string
    name: string
    reasonSocial: string
    image: string | null
  }
}

export type CreateUserProfilePayload = Omit<
  CreateProfileSchemaType,
  'confirmPassword' | 'email' | 'password'
> & {
  userId: string
}

export type PreferencesType = {
  theme: 'light' | 'dark' | 'system'
}

export type ProfileAuth = ProfileAdmin | ProfileStore
