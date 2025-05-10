import { prisma } from '@/lib/prisma'

export const findAddressByStoreIdQuery = (storeId: string) => {
  return prisma.address.findUnique({
    where: {
      storeId: storeId,
    },
  })
}
