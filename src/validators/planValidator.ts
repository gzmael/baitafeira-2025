import { PlanType } from '@prisma/client'
import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo0: 'Informe um valor no mínimo 0.',
  minimo: 'Informe ao mínimo 4 caracteres.',
}

export const createPlanSchema = z.object({
  name: z
    .string({ required_error: DEFAULTS.required_error })
    .min(4, { message: DEFAULTS.minimo }),
  cost: z.coerce
    .number({ required_error: DEFAULTS.required_error })
    .transform((value) => value * 100),
  description: z.string({ required_error: DEFAULTS.required_error }),
  period: z.nativeEnum(PlanType, {
    required_error: DEFAULTS.required_error,
  }),
  orders: z.coerce
    .number({ required_error: DEFAULTS.required_error })
    .min(0, { message: DEFAULTS.minimo0 }),
  prices: z.coerce
    .number({ required_error: DEFAULTS.required_error })
    .min(0, { message: DEFAULTS.minimo0 }),
  banners: z.coerce
    .number({ required_error: DEFAULTS.required_error })
    .min(0, { message: DEFAULTS.minimo0 }),
  users: z.coerce
    .number({ required_error: DEFAULTS.required_error })
    .min(0, { message: DEFAULTS.minimo0 }),
  advanced_analytics: z.boolean().default(false),
  support_priority: z.boolean().default(false),
})

export type CreatePlanSchemaType = z.infer<typeof createPlanSchema>

export const updatePlanSchema = createPlanSchema.extend({
  id: z.string({ required_error: DEFAULTS.required_error }),
})

export type UpdatePlanSchemaType = z.infer<typeof updatePlanSchema>
