import dayjs from 'dayjs'
import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  cuid: 'Id inválido!',
}

export const createPriceDetailsSchema = z.object({
  barCode: z
    .string({ required_error: DEFAULTS.required_error })
    .min(2, { message: 'Campo obrigatório!' }),
  cost: z.coerce
    .number({
      required_error: DEFAULTS.required_error,
      invalid_type_error: 'Campo obrigatório!',
    })
    .min(0.01, { message: 'O valor do produto não pode ser menor que 0,01' }),
  isOffer: z.boolean().default(false),
  isFeatured: z.boolean(),
  offerCost: z.coerce
    .number({
      required_error: DEFAULTS.required_error,
    })
    .min(0.01, { message: 'O valor da oferta não pode ser menor que 0,01' })
    .optional(),
})

export type CreatePriceDetailsSchemaType = z.infer<
  typeof createPriceDetailsSchema
>

export const updatePriceOfferSchema = createPriceDetailsSchema
  .extend({
    offerStartDate: z
      .date({ required_error: DEFAULTS.required_error })
      .optional()
      .refine((value) => {
        if (!value) return true

        return dayjs(new Date()).isBefore(value)
      }, 'Data de início da oferta não pode ser menor que a data atual'),
    offerEndDate: z
      .date({ required_error: DEFAULTS.required_error })
      .optional(),
  })
  .refine(
    ({ offerEndDate, offerStartDate }) => {
      if (!offerEndDate) return true

      return dayjs(offerEndDate).isAfter(offerStartDate, 'days')
    },
    {
      message:
        'Data de término da oferta não pode ser menor ou igual à data de início',
      path: ['offerEndDate'],
    },
  )
  .refine(
    (data) => {
      if (data.isOffer && data.offerCost === undefined) {
        return false
      }
      return true
    },
    {
      message: 'O valor da oferta é obrigatório quando a oferta é ativa',
      path: ['offerCost'],
    },
  )
  .refine(
    (data) => {
      if (
        data.isOffer &&
        data.offerCost !== undefined &&
        data.offerCost > data.cost
      ) {
        return false
      }
      return true
    },
    {
      message: 'O valor do produto não pode ser menor que o valor da oferta',
      path: ['cost'],
    },
  )

export type UpdatePriceOfferSchemaType = z.infer<typeof updatePriceOfferSchema>

export const availabilityPriceSchema = z
  .object({
    barCode: z
      .string({ required_error: DEFAULTS.required_error })
      .min(2, { message: 'Campo obrigatório!' }),
    isEnabledSale: z.boolean(),
    isFractionalSale: z.boolean(),
    maxUnits: z.coerce
      .number({ required_error: DEFAULTS.required_error })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.isEnabledSale && !data.maxUnits) {
        return false
      }
      return true
    },
    {
      message:
        'O valor de unidades para venda é obrigatório quando a venda está ativa',
      path: ['maxUnits'],
    },
  )
  .refine(
    (data) => {
      if (data.isEnabledSale && data.maxUnits && data.maxUnits <= 0) {
        return false
      }
      return true
    },
    {
      message:
        'O valor mínimo de unidades para venda não pode ser menor que 0,01',
      path: ['maxUnits'],
    },
  )

export type AvailabilityPriceSchemaType = z.infer<
  typeof availabilityPriceSchema
>

export const stockPriceSchema = z.object({
  barCode: z
    .string({ required_error: DEFAULTS.required_error })
    .min(2, { message: 'Campo obrigatório!' }),
  quantity: z.coerce
    .number({ required_error: DEFAULTS.required_error })
    .min(0, {
      message: 'O valor mínimo para estoque não pode ser menor que 0',
    }),
  minAlert: z.coerce
    .number({ required_error: DEFAULTS.required_error })
    .min(0, {
      message: 'O valor mínimo para alerta não pode ser menor que 0',
    }),
})

export type StockPriceSchemaType = z.infer<typeof stockPriceSchema>

export const outherPriceSchema = z.object({
  updatedBy: z.string({ required_error: DEFAULTS.required_error }),
  updatedAt: z.string({ required_error: DEFAULTS.required_error }),
  createdAt: z.string({ required_error: DEFAULTS.required_error }),
})

export type OutherPriceSchemaType = z.infer<typeof outherPriceSchema>
