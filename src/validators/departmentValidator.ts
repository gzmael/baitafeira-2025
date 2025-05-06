import { z } from 'zod'

const DEFAULT_ERRORS = {
  required: 'Campo obrigatório',
  min3: 'Nome do departamento deve ter no mínimo 3 caracteres',
  min3Slug: 'Slug do departamento deve ter no mínimo 3 caracteres',
  cuid: 'Id inválido',
}
export const createDepartamentSchema = z.object({
  name: z.string({ required_error: DEFAULT_ERRORS.required }).min(3, {
    message: DEFAULT_ERRORS.min3,
  }),
  slug: z.string({ required_error: DEFAULT_ERRORS.required }).min(3, {
    message: DEFAULT_ERRORS.min3Slug,
  }),
})

export type CreateDepartamentSchemaType = z.infer<
  typeof createDepartamentSchema
>

export const updateDepartmentSchema = createDepartamentSchema.extend({
  id: z.string({ required_error: DEFAULT_ERRORS.required }).cuid({
    message: DEFAULT_ERRORS.cuid,
  }),
})

export type UpdateDepartmentSchemaType = z.infer<typeof updateDepartmentSchema>
