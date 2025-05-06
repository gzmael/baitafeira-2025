import { StoreTypeUser } from '@prisma/client'
import { z } from 'zod'

import type { PreferencesType } from '@/contracts/profile'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo: 'Informe ao mínimo 3 caracteres.',
  minimo10: 'Informe ao mínimo 10 caracteres.',
  email: 'Informe um email válido!',
  password: 'Informe ao mínimo 8 caracteres.',
}

const baseSchema = {
  name: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
  lastName: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
  phone: z
    .string({ required_error: DEFAULTS.required_error })
    .min(10, {
      message: DEFAULTS.minimo10,
    })
    .optional()
    .transform((val) => val?.replace(/[^0-9]/g, '')),
}

export const createProfileStoreSchema = z
  .object({
    ...baseSchema,
    email: z.string({ required_error: DEFAULTS.required_error }).email({
      message: DEFAULTS.email,
    }),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 9 caracteres' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 9 caracteres' }),
    typeUser: z.nativeEnum(StoreTypeUser, {
      required_error: 'O tipo de usuário deve ser informado!',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

export type CreateProfileStoreSchemaType = z.infer<
  typeof createProfileStoreSchema
>

export const updateProfileStoreSchema = z.object({
  ...baseSchema,
  theme: z.enum(['light', 'dark', 'system']).optional(),
})

export type UpdateProfileStoreSchemaType = z.infer<
  typeof updateProfileStoreSchema
>

export type UpdateProfileStorePayloadType = Omit<
  UpdateProfileStoreSchemaType,
  'theme'
> & {
  preferences: PreferencesType
}

export const updateProfileAvatarSchema = z.object({
  images: z
    .unknown()
    .optional()
    .nullable()
    .default(null)
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, 'Você deve selecionar um arquivo.')
    .refine(async (val) => {
      if (!Array.isArray(val)) return true
      if (val.length === 0) return true
      const file = val[0]
      const image = await createImageBitmap(file)
      if (image.width < 500 || image.height < 500) return false
      return true
    }, 'O arquivo deve ter no mínimo 500px de largura e altura.'),
})

export type UpdateProfileAvatarSchemaType = z.infer<
  typeof updateProfileAvatarSchema
>
