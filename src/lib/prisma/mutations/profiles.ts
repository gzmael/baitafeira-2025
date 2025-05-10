import { TypeUser } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { StoredFile } from '@/contracts/commons'
import { CreateUserProfilePayload } from '@/contracts/profile'
import { createServerClient } from '@/lib/supabase/server'
import { utapi } from '@/utils/uploadthing'
import * as validators from '@/validators'

import { prisma } from '..'
import { getUser } from '../queries/cached-queries'

export const createAdminProfileQuery = async ({
  email,
  lastName,
  name,
  password,
}: validators.SignUpSchemaType) => {
  const supabase = await createServerClient({ admin: true })
  const { data, error } = await supabase.auth.admin.createUser({
    phone: '+5588993713010',
    email,
    password,
    email_confirm: true,
    phone_confirm: true,
    role: TypeUser.ADMIN,
    user_metadata: {
      name,
      lastName,
      typeUser: TypeUser.ADMIN,
      role: TypeUser.ADMIN,
    },
  })

  if (error) {
    throw new Error('Erro ao criar o usuário')
  }

  const { user } = data

  if (user) {
    await prisma.profile.create({
      data: {
        lastName,
        name,
        userId: user.id,
        typeUser: TypeUser.ADMIN,
      },
    })
  }
}

export const updateProfileQuery = async ({
  userId,
  avatar,
}: {
  userId: string
  avatar: StoredFile | null
}) => {
  const user = await getUser()

  if (!user) {
    return { error: 'Usuário não encontrado' }
  }

  const supabase = await createServerClient({ admin: true })

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      ...(user.raw_user_meta_data as object),
      avatar_url: avatar ? avatar.url : null,
    },
  })

  if (error) {
    if (avatar) {
      await utapi.deleteFiles([avatar.url])
    }
    return { error: error.message }
  }

  const { avatar_url } = user.raw_user_meta_data as {
    avatar_url: string | null
  }

  if (avatar_url) {
    await utapi.deleteFiles([avatar_url])
  }

  revalidatePath('/')
  return { error: null }
}

export const createUserProfileQuery = async ({
  lastName,
  name,
  userId,
}: CreateUserProfilePayload) => {
  return prisma.profile.create({
    data: {
      lastName,
      name,
      typeUser: TypeUser.USER,
      userId,
    },
  })
}
