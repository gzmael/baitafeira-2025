import { cnpj as cnpjValidator } from 'cpf-cnpj-validator'
import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
  lastName: z
    .string()
    .min(3, { message: 'O sobrenome deve ter no mínimo 3 caracteres' }),
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>

export const signUpStoreSchema = z
  .object({
    cnpj: z
      .string()
      .min(14, { message: 'O CNPJ deve ter no mínimo 14 caracteres' })
      .refine((cnpj) => cnpjValidator.isValid(cnpj), {
        message: 'O CNPJ informado não é válido',
      })
      .transform((cnpj) => cnpj.replace(/\D/g, '')),
    fantasy: z
      .string()
      .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
    socialReason: z
      .string()
      .min(3, { message: 'A razão social deve ter no mínimo 3 caracteres' }),
    name: z
      .string()
      .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
    lastName: z
      .string()
      .min(3, { message: 'O sobrenome deve ter no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Informe um e-mail válido' }),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    captchaToken: z.string().nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

export type SignUpStoreSchemaType = z.infer<typeof signUpStoreSchema>

export const signUpConfirmationSchema = z.object({
  pin: z.string().min(6, {
    message: 'O PIN deve ter no mínimo 6 caracteres.',
  }),
  email: z.string().email({ message: 'Informe um e-mail válido' }),
})

export type SignUpConfirmationSchemaType = z.infer<
  typeof signUpConfirmationSchema
>
