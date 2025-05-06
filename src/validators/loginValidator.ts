import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
})

export type LoginSchemaType = z.infer<typeof loginSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido' }),
  token: z
    .string({ required_error: 'Você precisa resolver o captcha' })
    .optional(),
})

export type FogotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

export const recoverPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

export type RecoverPasswordSchemaType = z.infer<typeof recoverPasswordSchema>
