import type { FindPlansList } from '@/contracts/plans'
import { prisma } from '@/lib/prisma'

export const getPlanOptionsQuery = async () => {
  const plans = await prisma.plan.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return plans.map((plan) => ({
    value: plan.id,
    label: plan.name,
  }))
}

export const getPlanByNameQuery = (name: string) => {
  return prisma.plan.findFirst({
    where: {
      name,
    },
  })
}

export const getPlanListQuery = async ({
  limit,
  offset,
  column = 'cost',
  fromDay,
  order = 'asc',
  search,
  toDay,
}: FindPlansList) => {
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

  const plans = await prisma.plan.findMany({
    include: {
      _count: true,
    },
    where: {
      name: search ? { contains: search } : undefined,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.plan.count({
    where: {
      name: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { plans, count }
}

export const getPlanByIdQuery = (planId: string) => {
  return prisma.plan.findFirstOrThrow({
    where: {
      id: planId,
    },
  })
}

export const getFreePlanQuery = () => {
  return prisma.plan.findFirstOrThrow({
    where: {
      name: 'Plano Free',
    },
  })
}
