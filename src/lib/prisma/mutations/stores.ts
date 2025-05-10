import { StoreTypeUser } from '@prisma/client'

import { CreateStorePayload } from '@/contracts/store'
import { prisma } from '@/lib/prisma'
import * as validators from '@/validators'

export const updateStoreAddressQuery = ({
  storeId,
  ...data
}: validators.UpdateStoreAddressSchemaType & { storeId: string }) => {
  return prisma.address.upsert({
    where: {
      storeId: storeId,
    },
    update: data,
    create: {
      ...data,
      storeId,
      name: 'Main',
      isMain: true,
    },
  })
}

export const updatePlanStoreQuery = ({
  planId,
  storeId,
}: {
  planId: string
  storeId: string
}) => {
  return prisma.store.update({
    where: {
      id: storeId,
    },
    data: {
      plan: {
        connect: {
          id: planId,
        },
      },
    },
  })
}

export const createStoreQuery = ({
  cnpj,
  socialReason,
  fantasy,
  name,
  lastName,
  userId,
  planId,
}: CreateStorePayload) => {
  return prisma.store.create({
    data: {
      cnpj: cnpj,
      reasonSocial: socialReason,
      name: fantasy,
      nameResponsible: `${name} ${lastName}`,
      profileStore: {
        create: {
          lastName,
          name,
          userId,
          typeUser: StoreTypeUser.MANAGER,
        },
      },
      planId,
    },
  })
}

export const deleteStoreQuery = (id: string) => {
  return prisma.store.delete({
    where: {
      id,
    },
  })
}

export const deleteStoreBatchQuery = (ids: string[]) => {
  return prisma.store.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  })
}

export const updateStoreLogoQuery = (
  storeId: string,
  logoUrl: string | null,
) => {
  return prisma.store.update({
    where: {
      id: storeId,
    },
    data: {
      image: logoUrl,
    },
  })
}

export const updateStoreQuery = (
  {
    name,
    nameResponsible,
    phone,
    phoneResponsible,
    reasonSocial,
  }: validators.UpdateStoreSchemaType,
  storeId: string,
) => {
  return prisma.store.update({
    where: {
      id: storeId,
    },
    data: {
      name,
      nameResponsible,
      phone,
      phoneResponsible,
      reasonSocial,
    },
  })
}
