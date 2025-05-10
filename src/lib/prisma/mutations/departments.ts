import * as validators from '@/validators'

import { prisma } from '..'

export const createDepartmentQuery = (
  data: validators.CreateDepartamentSchemaType,
) => {
  return prisma.department.create({
    data,
  })
}

export const updateDepartmentQuery = ({
  id,
  ...data
}: validators.UpdateDepartmentSchemaType) => {
  return prisma.department.update({
    where: { id },
    data,
  })
}

export const deleteDepartmentQuery = (id: string) => {
  return prisma.department.delete({
    where: { id },
  })
}

export const deleteDepartmentBatchQuery = (ids: string[]) => {
  return prisma.department.deleteMany({
    where: { id: { in: ids } },
  })
}
