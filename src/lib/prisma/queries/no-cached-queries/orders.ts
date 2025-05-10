import dayjs from 'dayjs'

import type { FindOrdersList } from '@/contracts/orders'
import { prisma } from '@/lib/prisma'

export const getWeekOrdersByStoreId = async (
  { search, column, order, limit, offset }: FindOrdersList,
  storeId: string
) => {
  const startOfCurrentWeek = dayjs().startOf('week')

  const orderFilter =
    column && order
      ? {
          [column]: order,
        }
      : undefined

  const orders = await prisma.order.findMany({
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
    where: {
      storeId,
      number: search ? { contains: search } : undefined,
      createdAt: {
        gte: startOfCurrentWeek.toDate(),
      },
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.order.count({
    where: {
      storeId,
      number: search ? { contains: search } : undefined,
      createdAt: {
        gte: startOfCurrentWeek.toDate(),
      },
    },
    orderBy: orderFilter,
  })

  return { orders, count }
}

export const getMonthOrdersByStoreId = async (
  { search, column, order, limit, offset }: FindOrdersList,
  storeId: string
) => {
  const startOfCurrentMonth = dayjs().startOf('month')

  const orderFilter =
    column && order
      ? {
          [column]: order,
        }
      : undefined

  const orders = await prisma.order.findMany({
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
    where: {
      storeId,
      number: search ? { contains: search } : undefined,
      createdAt: {
        gte: startOfCurrentMonth.toDate(),
      },
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.order.count({
    where: {
      storeId,
      number: search ? { contains: search } : undefined,
      createdAt: {
        gte: startOfCurrentMonth.toDate(),
      },
    },
    orderBy: orderFilter,
  })

  return { orders, count }
}

export const getYearOrdersByStoreId = async (
  { search, column, order, limit, offset }: FindOrdersList,
  storeId: string
) => {
  const startOfCurrentYear = dayjs().startOf('year')

  const orderFilter =
    column && order
      ? {
          [column]: order,
        }
      : undefined

  const orders = await prisma.order.findMany({
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
    where: {
      storeId,
      number: search ? { contains: search } : undefined,
      createdAt: {
        gte: startOfCurrentYear.toDate(),
      },
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.order.count({
    where: {
      storeId,
      number: search ? { contains: search } : undefined,
      createdAt: {
        gte: startOfCurrentYear.toDate(),
      },
    },
    orderBy: orderFilter,
  })

  return { orders, count }
}
