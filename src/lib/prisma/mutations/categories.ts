import { prisma } from '@/lib/prisma'
import * as validators from '@/validators'

export const createCategoryQuery = (
  data: validators.CreateCategorySchemaType,
) => {
  return prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      department: {
        connect: {
          id: data.department_id,
        },
      },
    },
  })
}

export const updateCategoryQuery = ({
  department_id,
  id,
  name,
  slug,
}: validators.UpdateCategorySchemaType) => {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      departmentId: department_id,
    },
  })
}

export const deleteCategoryQuery = (id: string) => {
  return prisma.category.delete({
    where: {
      id,
    },
  })
}
