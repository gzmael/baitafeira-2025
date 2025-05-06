import * as z from 'zod'

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(0),
  subcategoryId: z.string().optional(),
})

export const checkoutItemSchema = cartItemSchema.extend({
  price: z.number(),
})

export const cartLineItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  images: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
      }),
    )
    .optional()
    .nullable(),
  category: z.string().optional().nullable(),
  subcategory: z.string().optional().nullable(),
  price: z.number(),
  originalPrice: z.number(),
  inventory: z.number().default(0),
  quantity: z.number(),
  storeId: z.string(),
  storeName: z.string().optional().nullable(),
})

export type CartItemSchema = z.infer<typeof cartItemSchema>
export type CheckoutItemSchema = z.infer<typeof checkoutItemSchema>
export type CartLineItemSchema = z.infer<typeof cartLineItemSchema>
