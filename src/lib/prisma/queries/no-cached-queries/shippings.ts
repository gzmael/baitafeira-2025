import { prisma } from '@/lib/prisma'

export const getShippingQuery = (storeId: string) => {
  return prisma.shipping.findFirst({
    select: {
      id: true,
      attributes: true,
      minimumAmount: true,
      type: true,
    },
    where: {
      storeId,
    },
  })
}
