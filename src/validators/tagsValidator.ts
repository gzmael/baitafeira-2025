import { z } from 'zod'

export const createTagSchema = z.object({
  name: z.string().min(3, {
    message: 'Nome da tag deve ter no mínimo 3 caracteres',
  }),
  slug: z.string().min(3, {
    message: 'Slug da tag deve ter no mínimo 3 caracteres',
  }),
})

export type CreateTagSchemaType = z.infer<typeof createTagSchema>

export const updateTagSchema = createTagSchema.extend({
  id: z.string(),
})

export type UpdateTagPayloadType = z.infer<typeof updateTagSchema>
