import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo: 'Informe ao mínimo 4 caracteres.',
  minimo10: 'Informe ao mínimo 10 caracteres.',
  cuid2: 'Categoria inválida',
}

export const createSubCategorySchema = z.object({
  name: z
    .string({ required_error: DEFAULTS.required_error })
    .min(3, { message: DEFAULTS.minimo }),
  slug: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
  category_id: z
    .string({ required_error: DEFAULTS.required_error })
    .cuid2(DEFAULTS.cuid2),
  department_id: z
    .string({ required_error: DEFAULTS.required_error })
    .cuid2(DEFAULTS.cuid2),
})

export type CreateSubCategorySchemaType = z.infer<
  typeof createSubCategorySchema
>

export const updateSubCategorySchema = createSubCategorySchema.extend({
  id: z
    .string({ required_error: DEFAULTS.required_error })
    .cuid2(DEFAULTS.cuid2),
})

export type UpdateSubCategoryType = z.infer<typeof updateSubCategorySchema>
export type UpdateSubCategoryPayloadType = Omit<
  UpdateSubCategoryType,
  'department_id'
>
