import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  cuid2: 'Id inválido!',
  minimoItems: 'Informe ao menos 1 item.',
  minimo: 'Informe ao mínimo 3 caracteres.',
  minimo10: 'Informe ao mínimo 10 caracteres.',
}

export const createBrandSchema = z.object({
  name: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
  slug: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
})

export type CreateBrandSchemaType = z.infer<typeof createBrandSchema>

export const updateBrandSchema = createBrandSchema.extend({
  id: z.string({ required_error: DEFAULTS.required_error }),
})

export type UpdateBrandPaylodType = z.infer<typeof updateBrandSchema>

export const deleteBrandsSchema = z.object({
  ids: z
    .array(
      z.string({ required_error: DEFAULTS.required_error }).cuid2({
        message: DEFAULTS.cuid2,
      }),
    )
    .min(1, {
      message: DEFAULTS.minimoItems,
    }),
})

export type DeleteBrandsPayloadType = z.infer<typeof deleteBrandsSchema>
