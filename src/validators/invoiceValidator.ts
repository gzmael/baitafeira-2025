import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  invalid_id: 'Id inválido!',
  minimo: 'Informe ao mínimo 4 caracteres.',
  minimo10: 'Informe ao mínimo 10 caracteres.',
}

export const createInvoiceSchema = z.object({
  storeId: z.string({ required_error: DEFAULTS.required_error }).cuid({
    message: DEFAULTS.invalid_id,
  }),
  amount: z.number({ required_error: DEFAULTS.required_error }),
  dueDate: z.date({ required_error: DEFAULTS.required_error }),
  description: z.string(),
})

export const updateInvoiceSchema = createInvoiceSchema.extend({
  id: z.string({ required_error: DEFAULTS.required_error }).cuid({
    message: DEFAULTS.invalid_id,
  }),
})

export type CreateInvoiceSchemaType = z.infer<typeof createInvoiceSchema>

export type UpdateInvoicePaylodType = z.infer<typeof updateInvoiceSchema>
