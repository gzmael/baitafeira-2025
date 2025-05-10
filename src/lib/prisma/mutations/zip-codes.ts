import { prisma } from '@/lib/prisma'
import { CreateZipCodeSchemaType } from '@/validators/zipCodeValidator'

export const createZipCodeQuery = (
  { city, ibge, state, zipCode }: CreateZipCodeSchemaType,
  storeId: string,
) => {
  return prisma.zipCode.create({
    data: {
      zipCode,
      ibgeCode: ibge,
      city,
      state,
      stores: {
        connect: {
          id: storeId,
        },
      },
    },
  })
}

export const deleteZipCodeQuery = (id: string) => {
  return prisma.zipCode.delete({
    where: {
      id,
    },
  })
}

export const deleteZipCodeBatchQuery = (ids: string[]) => {
  return prisma.zipCode.deleteMany({
    where: { id: { in: ids } },
  })
}

export const addZipCodeToStoreQuery = (zipCodeId: string, storeId: string) => {
  return prisma.store.update({
    where: { id: storeId },
    data: { zipCodes: { connect: { id: zipCodeId } } },
  })
}

export const removeZipCodeFromStoreQuery = (
  zipCodeId: string,
  storeId: string,
) => {
  return prisma.store.update({
    where: { id: storeId },
    data: { zipCodes: { disconnect: { id: zipCodeId } } },
  })
}
