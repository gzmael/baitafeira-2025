import type { Department } from '@/generated/prisma/client'

import type { FindGenericList } from './commons'

export type DepartmentFields = keyof Department
export type FindDepartmentsList = FindGenericList<DepartmentFields>

export type DepartmentWithCounts = Department & {
  _count: {
    categories: number
  }
}
