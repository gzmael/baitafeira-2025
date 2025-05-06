import type { StatusStore, Store } from '@prisma/client'

import type { SignUpStoreSchemaType } from '@/validators'

import type { FindGenericList, StoredFile } from './commons'

export type StoreFields = keyof Store
export type FindStoresList = FindGenericList<StoreFields> & {
  plan?: string
}

export type StoreWithCounts = {
  status: StatusStore
  name: string
  plan: {
    name: string
  } | null
  id: string
  reasonSocial: string
  cnpj: string
  createdAt: Date
  _count: {
    profileStore: number
    slides: number
    zipCodes: number
    plan: number
  }
}

export type UpdateStoreLogoPayload = {
  logo: StoredFile | null
}

export type CreateStorePayload = Omit<
  SignUpStoreSchemaType,
  'captchaToken' | 'confirmPassword' | 'email' | 'password'
> & {
  userId: string
  planId: string
}
