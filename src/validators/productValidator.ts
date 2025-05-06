import { ProductStatus, UnitType } from '@prisma/client'
import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo: 'Informe ao mínimo 4 caracteres.',
  minimo10: 'Informe ao mínimo 10 caracteres.',
  minimo1: 'Informe ao menos 1 unidade de medida!',
}

export const baseProductSchema = z.object({
  name: z
    .string({ required_error: DEFAULTS.required_error })
    .min(4, { message: DEFAULTS.minimo }),
  slug: z.string({ required_error: DEFAULTS.required_error }).min(4, {
    message: DEFAULTS.minimo,
  }),
  description: z.string({ required_error: DEFAULTS.required_error }).min(4, {
    message: DEFAULTS.minimo,
  }),
  barCode: z.string({ required_error: DEFAULTS.required_error }),
  sub_category_id: z.string({ required_error: DEFAULTS.required_error }).cuid({
    message: 'Subcategoria inválida!',
  }),
  unitType: z.nativeEnum(UnitType),
  quantity: z.coerce.number().min(1, { message: DEFAULTS.minimo1 }),
  isFractional: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  brand_id: z.string({ required_error: DEFAULTS.required_error }).cuid({
    message: 'Marca inválida!',
  }),
  department_id: z.string().optional(),
  category_id: z.string().optional(),
  status: z.enum([
    ProductStatus.ACTIVE,
    ProductStatus.INACTIVE,
    ProductStatus.PENDING,
  ]),
})

export const createProductFormSchema = baseProductSchema.extend({
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, 'Deve ser uma lista de Arquivos')
    .optional()
    .nullable()
    .default(null),
})

export type CreateProductFormSchemaType = z.infer<
  typeof createProductFormSchema
>

export const createProductPayloadSchema = baseProductSchema.extend({
  images: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
        preview: z.string().optional(),
      }),
    )
    .nullable(),
  tags: z.array(z.string()).optional(),
})

export type CreateProductPayloadType = z.infer<
  typeof createProductPayloadSchema
>

export const updateProductFormSchema = createProductFormSchema.extend({
  id: z.string().cuid({ message: 'ID de Produto inválido!' }),
})

export type UpdateProductFormSchemaType = z.infer<
  typeof updateProductFormSchema
>

export const updateProductPayloadSchema = createProductPayloadSchema.extend({
  id: z.string().cuid({ message: 'ID de Produto inválido!' }),
})

export type UpdateProductPayloadType = z.infer<
  typeof updateProductPayloadSchema
>
