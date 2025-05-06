import { z } from 'zod'

const DEFAULTS = {
  minimo: 'Informe ao mínimo 2 caracteres.',
  minimo7: 'Informe ao mínimo 7 caracteres.',
  minimo8: 'Informe ao mínimo 8 caracteres.',
}

export const createZipCodeSchema = z.object({
  zipCode: z.string({ required_error: 'Informe o CEP' }).min(8, {
    message: DEFAULTS.minimo8,
  }),
  ibge: z.string({ required_error: 'Informe o IBGE' }).min(7, {
    message: DEFAULTS.minimo7,
  }),
  city: z.string({ required_error: 'Informe a cidade' }).min(2, {
    message: DEFAULTS.minimo,
  }),
  state: z.string({ required_error: 'Informe o estado' }).min(2, {
    message: DEFAULTS.minimo,
  }),
})

export type CreateZipCodeSchemaType = z.infer<typeof createZipCodeSchema>
export type UpdateZipCodePaylodType = CreateZipCodeSchemaType & {
  id: string
}

// TODO: criar um schema para associar CEP à loja
export const associateZipCodeAndStoreSchema = z.object({
  zipCode: z.string({ required_error: 'Informe o CEP' }).min(8, {
    message: DEFAULTS.minimo8,
  }),
})

export type AssociateZipCodeAndStorePayloadType = z.infer<
  typeof associateZipCodeAndStoreSchema
>
