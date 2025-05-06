import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo: 'Informe ao mínimo 3 caracteres.',
  minimo10: 'Informe ao mínimo 10 caracteres.',
}

const baseSchema = {
  name: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
  nameResponsible: z
    .string({ required_error: DEFAULTS.required_error })
    .min(3, {
      message: DEFAULTS.minimo,
    }),
  reasonSocial: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
}

export const createStoreSchema = z.object({
  ...baseSchema,
  cnpj: z.string({ required_error: DEFAULTS.required_error }).min(14, {
    message: DEFAULTS.minimo,
  }),
})

export const updateStoreSchema = z.object({
  ...baseSchema,
  phone: z
    .string({ required_error: DEFAULTS.required_error })
    .min(10, {
      message: DEFAULTS.minimo10,
    })
    .transform((val) => val.replace(/[^0-9]/g, '')),
  phoneResponsible: z
    .string({ required_error: DEFAULTS.required_error })
    .min(10, {
      message: DEFAULTS.minimo10,
    })
    .transform((val) => val.replace(/[^0-9]/g, '')),
})

export const updateStoreLogoSchema = z.object({
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

export const storeModalSchema = z.object({
  city_id: z.string({ required_error: DEFAULTS.required_error }),
  city_name: z.string().optional(),
  store_id: z.string({ required_error: DEFAULTS.required_error }),
  store_name: z.string().optional(),
})

export type StoreModalSchemaType = z.infer<typeof storeModalSchema>

export type UpdateStoreLogoSchemaType = z.infer<typeof updateStoreLogoSchema>

export type CreateStoreSchemaType = z.infer<typeof createStoreSchema>

export type UpdateStoreSchemaType = z.infer<typeof updateStoreSchema>

export type UpdateStorePaylodType = CreateStoreSchemaType & {
  id: string
}
