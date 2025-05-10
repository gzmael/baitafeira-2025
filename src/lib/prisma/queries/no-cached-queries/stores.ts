import type { AuthUser } from '@/generated/prisma/client'
import { revalidatePath } from 'next/cache'

import type { ProfileStore } from '@/contracts/profile'
import type { FindStoresList } from '@/contracts/store'
import { prisma } from '@/lib/prisma'

export const getStoreProfileQuery = async (
  user: AuthUser
): Promise<ProfileStore | null> => {
  const profile = await prisma.profileStore.findFirst({
    select: {
      id: true,
      name: true,
      lastName: true,
      typeUser: true,
      preferences: true,
      phone: true,
      updatedAt: true,
      store: {
        select: {
          id: true,
          name: true,
          image: true,
          reasonSocial: true,
          plan: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      userId: user.id,
      status: 'ACTIVE',
      store: {
        status: 'ACTIVE',
      },
    },
  })

  if (!profile || !profile.store || !profile.store.plan) {
    revalidatePath('/loja', 'layout')
    return null
  }

  const userMetadata = user.raw_user_meta_data as {
    avatar_url?: string
  }

  return {
    id: profile.id,
    name: profile.name,
    lastName: profile.lastName,
    email: user.email!,
    image: userMetadata.avatar_url,
    role: profile.typeUser,
    storeId: profile.store!.id,
    preferences: profile.preferences,
    phone: profile.phone,
    updatedAt: profile.updatedAt,
    store: {
      id: profile.store.id,
      name: profile.store.name,
      image: profile.store.image,
      reasonSocial: profile.store.reasonSocial,
      plan: {
        id: profile.store.plan.id,
        name: profile.store.plan.name,
      },
    },
  }
}

export const getStoreByCNPJQuery = (cnpj: string) => {
  return prisma.store.findUnique({
    where: { cnpj },
  })
}

export const getStoreListQuery = async ({
  limit,
  offset,
  column = 'createdAt',
  fromDay,
  order = 'desc',
  search,
  toDay,
  plan,
}: FindStoresList) => {
  const dayFilter =
    fromDay && toDay
      ? {
          gte: fromDay,
          lte: toDay,
        }
      : undefined

  const orderFilter =
    column && order
      ? {
          [column]: order,
        }
      : undefined

  const planSearch = plan
    ? {
        plan: {
          id: {
            in: plan.split('.'),
          },
        },
      }
    : undefined

  const stores = await prisma.store.findMany({
    select: {
      id: true,
      name: true,
      cnpj: true,
      reasonSocial: true,
      createdAt: true,
      status: true,
      _count: true,
      plan: {
        select: {
          name: true,
        },
      },
    },
    where: {
      name: search ? { contains: search } : undefined,
      ...planSearch,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.store.count({
    where: {
      name: search ? { contains: search } : undefined,
      ...planSearch,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { stores, count }
}

export const getStoreByIdQuery = async (id: string) => {
  return prisma.store.findUnique({
    where: { id },
  })
}

export const getSearchStoresByCityQuery = async (
  city: string,
  search: string
) => {
  const stores = await prisma.store.findMany({
    where: {
      zipCodes: {
        some: {
          city,
        },
      },
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
      status: 'ACTIVE',
    },
    select: {
      id: true,
      name: true,
    },
  })

  return stores.map((store) => ({
    label: store.name,
    value: store.id,
  }))
}

export const getSelectedStoreFooterInfoQuery = async (id: string) => {
  return prisma.store.findUniqueOrThrow({
    where: { id, status: 'ACTIVE' },
    select: {
      name: true,
      reasonSocial: true,
      image: true,
      phone: true,
      cnpj: true,
      shippings: {
        select: {
          attributes: true,
          minimumAmount: true,
          type: true,
        },
      },
    },
  })
}
