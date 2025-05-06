import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo: 'Informe ao mínimo 4 caracteres.',
  minimo10: 'Informe ao mínimo 10 caracteres.',
  cuid: 'Id inválido!',
}

export const createCategorySchema = z.object({
  name: z
    .string({ required_error: DEFAULTS.required_error })
    .min(4, { message: DEFAULTS.minimo }),
  slug: z.string({ required_error: DEFAULTS.required_error }).min(4, {
    message: DEFAULTS.minimo,
  }),
  department_id: z.string({ required_error: DEFAULTS.required_error }),
})

export type CreateCategorySchemaType = z.infer<typeof createCategorySchema>

export const updateCategorySchema = createCategorySchema.extend({
  id: z.string({ required_error: DEFAULTS.required_error }).cuid({
    message: DEFAULTS.cuid,
  }),
})

export type UpdateCategorySchemaType = z.infer<typeof updateCategorySchema>
