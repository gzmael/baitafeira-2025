import { prisma } from '@/lib/prisma'

export const getOrderByNumberAndStoreId = (
  seuNumero: string,
  storeId: string
) => {
  const order = prisma.order.findFirst({
    where: {
      storeId,
      number: seuNumero,
    },
    select: {
      id: true,
      number: true,
      amount: true,
      total: true,
      discount: true,
      status: true,
      items: true,
      address: true,
      profile: {
        select: {
          name: true,
          lastName: true,
          phone: true,
        },
      },
      paymentMethod: true,
      shipping: true,
      createdAt: true,
    },
  })

  return order
}
