import { PaymentMethod } from '@prisma/client'
import { StatusOrder } from '@prisma/client'
import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo0: 'Informe um valor no mínimo 0.',
  minimo: 'Informe ao mínimo 4 caracteres.',
}

export const createOrderSchema = z.object({
  number: z.string({ required_error: DEFAULTS.required_error }),
  total: z.coerce.number({ required_error: DEFAULTS.required_error }),
  amount: z.coerce.number({ required_error: DEFAULTS.required_error }),
  discount: z.coerce.number({ required_error: DEFAULTS.required_error }),
  shipping: z.coerce.number({ required_error: DEFAULTS.required_error }),
  items: z.array(
    z.object({
      id: z.string({ required_error: DEFAULTS.required_error }),
      quantity: z.number({ required_error: DEFAULTS.required_error }),
      cost: z.number({ required_error: DEFAULTS.required_error }),
      confirmed: z.boolean().nullable().default(null),
    }),
  ),
  address: z.object({
    number: z.string({ required_error: DEFAULTS.required_error }),
    street: z.string({ required_error: DEFAULTS.minimo }),
    neighborhood: z.string({ required_error: DEFAULTS.minimo }),
    city: z.string({ required_error: DEFAULTS.minimo }),
    zipCode: z.string({ required_error: DEFAULTS.minimo }),
    complement: z.string().optional(),
  }),
  status: z.nativeEnum(StatusOrder, {
    required_error: DEFAULTS.required_error,
  }),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    required_error: DEFAULTS.required_error,
  }),
})

export type CreateOrderSchemaType = z.infer<typeof createOrderSchema>

export const updateOrderStatusSchema = z.object({
  id: z.string({ required_error: DEFAULTS.required_error }),
  status: z.nativeEnum(StatusOrder, {
    required_error: DEFAULTS.required_error,
  }),
})

export type UpdateOrderStatusSchemaType = z.infer<
  typeof updateOrderStatusSchema
>

export const updateOrderItemStatusSchema = z.object({
  id: z.string({ required_error: DEFAULTS.required_error }),
  subtotal: z.coerce.number({ required_error: DEFAULTS.required_error }),
  amount: z.coerce.number({ required_error: DEFAULTS.required_error }),
  status: z.nativeEnum(StatusOrder, {
    required_error: DEFAULTS.required_error,
  }),
  items: z.array(
    z.object({
      id: z.string({ required_error: DEFAULTS.required_error }),
      quantity: z.number({ required_error: DEFAULTS.required_error }),
      cost: z.number({ required_error: DEFAULTS.required_error }),
      confirmed: z.boolean().nullable().default(null),
    }),
  ),
})

export type UpdateOrderItemStatusSchemaType = z.infer<
  typeof updateOrderItemStatusSchema
>
