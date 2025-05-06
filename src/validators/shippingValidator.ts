import { ShippingType } from '@prisma/client'
import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo8: 'Informe ao mínimo 8 caracteres.',
  minimo7: 'Informe ao mínimo 7 caracteres.',
  minimo3: 'Informe ao mínimo 3 caracteres.',
}

const Common = {
  minimumTime: z.coerce.number().optional(),
  maximumTime: z.coerce.number().optional(),
}

export const updateShippingTypeSchema = z.object({
  minimumTime: z.coerce.number().optional(),
  maximumTime: z.coerce.number().optional(),
  type: z.nativeEnum(ShippingType),
  minimumAmount: z.number().optional(),
  price: z.coerce.number().min(0),
  isMinimumPrice: z.boolean().optional().default(false),
})

export type UpdateShippingTypeSchemaType = z.infer<
  typeof updateShippingTypeSchema
>

export const fixedShippingSchema = z.object({
  ...Common,
  price: z.coerce.number().min(0),
})

export type FixedShippingSchemaType = z.infer<typeof fixedShippingSchema>

export const minimalPriceSchema = z.object({
  price: z.coerce.number().min(0).default(0),
  isActive: z.boolean().optional().default(false),
})

export type MinimalPriceSchemaType = z.infer<typeof minimalPriceSchema>

export const generalShippingSchema = z.object({
  uniqueByCPF: z.boolean().optional().default(false),
  variableWeightPercentage: z.coerce.number().optional().default(20),
  maximumOffer: z.coerce.number().optional().default(12),
  maximumOfferWeight: z.coerce.number().optional().default(6),
  minimumAmount: z.coerce.number().optional().default(20),
})

export type GeneralShippingSchemaType = z.infer<typeof generalShippingSchema>

export type UpdateMinimalPricePayloadType = MinimalPriceSchemaType & {
  storeId: string
}

const NeighborhoodItemBase = {
  city: z.string().min(3, {
    message: DEFAULTS.minimo3,
  }),
  neighborhood: z.string().min(3, {
    message: DEFAULTS.minimo3,
  }),
  ibgeCode: z.string().min(7, {
    message: DEFAULTS.minimo7,
  }),
  cost: z.number().min(0),
  ...Common,
}

export const NeighborhoodItemSchema = z.object({
  id: z.string().nanoid(),
  ...NeighborhoodItemBase,
})
export type NeighborhoodItemSchemaType = z.infer<typeof NeighborhoodItemSchema>

export const addNeighborhoodItemSchema = z.object({
  ...NeighborhoodItemBase,
  zipCode: z.string({ required_error: DEFAULTS.required_error }).min(8, {
    message: DEFAULTS.minimo8,
  }),
})

export type AddNeighborhoodItemSchemaType = z.infer<
  typeof addNeighborhoodItemSchema
>

export type AddNeighborhoodPayloadType = AddNeighborhoodItemSchemaType & {
  storeId: string
}

export const TaxByNeighborhoodSchema = z.object({
  list: z.array(NeighborhoodItemSchema),
})

export type TaxByNeighborhoodSchemaType = z.infer<
  typeof TaxByNeighborhoodSchema
>
