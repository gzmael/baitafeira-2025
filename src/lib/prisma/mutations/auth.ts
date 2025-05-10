'use server'

import { StoreTypeUser, TypeUser } from '@prisma/client'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { createServerClient } from '@/lib/supabase/server'
import { getURL } from '@/lib/utils'
import * as validators from '@/validators'

import { prisma } from '..'

export const forgotPasswordQuery = async ({
  email,
  token,
}: validators.FogotPasswordSchemaType) => {
  const supabase = await createServerClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}/loja/nova-senha`,
    captchaToken: token,
  })

  if (error) {
    throw new Error('Erro ao enviar e-mail')
  }
}

export const recoverPasswordQuery = async ({
  password,
}: validators.RecoverPasswordSchemaType) => {
  const supabase = await createServerClient({ admin: true })
  let redirectTo = '/conta/entrar'
  const userId = (await cookies()).get('tmp_user_id')?.value

  if (!userId) {
    throw new Error('Erro ao atualizar a senha')
  }

  const {
    error,
    data: { user },
  } = await supabase.auth.admin.updateUserById(userId, {
    password,
  })

  if (error) {
    throw new Error('Erro ao atualizar a senha')
  }

  ;(await cookies()).delete('tmp_user_id')

  if (user) {
    const { user_metadata } = user
    const { role } = user_metadata

    if (['MANAGER', 'SELLER'].includes(role)) {
      redirectTo = '/loja/entrar'
    }

    if (role === 'ADMIN') {
      redirectTo = '/kratos/entrar'
    }

    if (role === 'USER') {
      redirectTo = '/conta/entrar'
    }
  }

  return { redirectTo }
}

export const signUpConfirmationQuery = async ({
  pin,
  email,
}: validators.SignUpConfirmationSchemaType & {
  email: string
}) => {
  const supabase = await createServerClient()

  const {
    error,
    data: { user },
  } = await supabase.auth.verifyOtp({
    email,
    token: pin,
    type: 'email',
  })

  if (error || !user) {
    throw new Error('Erro ao confirmar e-mail')
  }

  const { role } = user.user_metadata as { role: TypeUser | StoreTypeUser }

  if (['MANAGER', 'SELLER'].includes(role)) {
    const profileStore = await prisma.profileStore.findUnique({
      where: {
        userId: user.id,
      },
    })

    if (!profileStore) {
      throw new Error('Perfil não encontrado')
    }

    await prisma.profileStore.update({
      where: {
        userId: user.id,
      },
      data: {
        status: 'ACTIVE',
      },
    })

    await prisma.store.update({
      where: {
        id: profileStore.storeId,
      },
      data: {
        status: 'ACTIVE',
      },
    })

    return { redirectTo: `${getURL()}/loja/dashboard` }
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (!profile) {
    throw new Error('Perfil não encontrado')
  }

  await prisma.profile.update({
    where: {
      id: profile.id,
    },
    data: {
      status: 'ACTIVE',
    },
  })

  revalidatePath('/conta')
  revalidatePath('/loja/contas')
  revalidatePath('/kratos/contas')

  revalidateTag('profiles_stores')
  revalidateTag('profiles')

  return { redirectTo: `${getURL()}/conta` }
}
