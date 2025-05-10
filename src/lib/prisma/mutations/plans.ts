import { typePeriod } from '@/config/constant'
import * as validators from '@/validators'

import { prisma } from '..'

export const createPlanQuery = async ({
  cost,
  period,
  description,
  name,
  ...attributes
}: validators.CreatePlanSchemaType) => {
  return prisma.plan.create({
    data: {
      name,
      cost,
      period: typePeriod[period],
      description,
      attributes,
      type: period,
    },
  })
}

export const updatePlanQuery = async ({
  id,
  cost,
  period,
  description,
  name,
  ...attributes
}: validators.UpdatePlanSchemaType) => {
  return prisma.plan.update({
    where: {
      id,
    },
    data: {
      name,
      cost,
      period: typePeriod[period],
      description,
      attributes,
      type: period,
    },
  })
}

export const deletePlanQuery = async (id: string) => {
  return prisma.plan.delete({
    where: {
      id,
    },
  })
}

export const deletePlanBatchQuery = (ids: string[]) => {
  return prisma.plan.deleteMany({
    where: { id: { in: ids } },
  })
}
