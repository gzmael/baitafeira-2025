import type { Plan } from '@prisma/client'

import type { FindGenericList } from './commons'

export type PlanFields = keyof Plan
export type FindPlansList = FindGenericList<PlanFields>

export type PlanWithCounts = Plan & {
  _count: {
    stores: number
  }
}

export type PlanAttributes = {
  orders: number
  prices: number
  banners: number
  users: number
  advanced_analytics: boolean
  support_priority: boolean
}
