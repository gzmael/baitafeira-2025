import { UpdateShippingPayloadType } from '@/contracts/shipping'
import { prisma } from '@/lib/prisma'

export const updateShippingQuery = ({
  type,
  minimumAmount,
  attributes,
  storeId,
}: UpdateShippingPayloadType) => {
  return prisma.shipping.upsert({
    where: {
      storeId,
    },
    update: {
      type,
      minimumAmount,
      attributes,
    },
    create: {
      type,
      minimumAmount,
      storeId,
      attributes,
    },
  })
}
