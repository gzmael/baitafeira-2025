import { CreateProfileStorePayload } from '@/contracts/profile-store'
import { UpdateProfileStorePayloadType } from '@/validators/profileStoreValidator'

import { prisma } from '..'

export const createProfileStoreQuery = ({
  userId,
  storeId,
  lastName,
  name,
  typeUser,
  phone,
}: CreateProfileStorePayload) => {
  return prisma.profileStore.create({
    data: {
      name,
      lastName,
      phone,
      status: 'ACTIVE',
      userId,
      storeId,
      typeUser,
    },
  })
}

export const deleteProfileStoreQuery = (id: string, storeId: string) => {
  return prisma.profileStore.delete({
    where: {
      id,
      storeId,
    },
  })
}

export const deleteProfileStoreBatchQuery = (
  storeId: string,
  ids: string[],
) => {
  return prisma.profileStore.deleteMany({
    where: {
      storeId,
      id: {
        in: ids,
      },
    },
  })
}

export const updateProfileStoreQuery = (
  id: string,
  storeId: string,
  { lastName, name, phone, preferences }: UpdateProfileStorePayloadType,
) => {
  return prisma.profileStore.update({
    where: {
      id,
      storeId,
    },
    data: {
      lastName,
      name,
      phone,
      preferences,
    },
  })
}
