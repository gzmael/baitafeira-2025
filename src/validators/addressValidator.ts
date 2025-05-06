import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo: 'Informe ao mínimo 3 caracteres.',
  minimo2: 'Informe ao mínimo 2 caracteres.',
  minimo8: 'Informe ao mínimo 8 caracteres.',
}

export const addressSchema = z.object({
  name: z
    .string({ required_error: DEFAULTS.required_error })
    .min(3, {
      message: DEFAULTS.minimo,
    })
    .optional(),
  zipCode: z.string({ required_error: DEFAULTS.required_error }).min(8, {
    message: DEFAULTS.minimo8,
  }),
  city: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
  state: z.string({ required_error: DEFAULTS.required_error }).min(2, {
    message: DEFAULTS.minimo2,
  }),
  street: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
  number: z.string({ required_error: DEFAULTS.required_error }).min(1, {
    message: DEFAULTS.minimo,
  }),
  neighborhood: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  reference: z
    .string()
    .min(3, {
      message: DEFAULTS.minimo,
    })
    .nullable()
    .optional(),
  complement: z
    .string()
    .min(3, {
      message: DEFAULTS.minimo,
    })
    .nullable()
    .optional(),
  isMain: z.boolean().optional(),
  profileId: z.string().optional(),
})

export type AddressSchemaType = z.infer<typeof addressSchema>

export const updateStoreAddressSchema = addressSchema.extend({
  storeId: z.string({ required_error: DEFAULTS.required_error }).cuid2(),
})

export type UpdateStoreAddressSchemaType = z.infer<
  typeof updateStoreAddressSchema
>
