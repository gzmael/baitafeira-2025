import { StatusOrder } from '@prisma/client'

import { prisma } from '@/lib/prisma'

export const deleteOrderQuery = (orderId: string) => {
  return prisma.order.delete({
    where: { id: orderId },
  })
}

export const updateOrderStatusQuery = (
  orderId: string,
  status: StatusOrder,
) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  })
}

export const updateOrderItemStatusQuery = async (
  orderId: string,
  items: {
    id: string
    confirmed: boolean | null
    quantity: number
    cost: number
  }[],
  status: StatusOrder,
  subtotal: number,
  amount: number,
) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { items, status, total: subtotal, amount },
  })
}
