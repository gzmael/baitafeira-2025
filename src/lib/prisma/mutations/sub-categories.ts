import {
  CreateSubCategorySchemaType,
  UpdateSubCategoryPayloadType,
} from '@/validators'

import { prisma } from '..'

export const createSubCategoryQuery = ({
  category_id,
  name,
  slug,
}: Omit<CreateSubCategorySchemaType, 'department_id'>) => {
  return prisma.subCategory.create({
    data: {
      name,
      slug,
      categoryId: category_id,
    },
  })
}

export const updateSubCategoryQuery = ({
  id,
  ...data
}: UpdateSubCategoryPayloadType) => {
  return prisma.subCategory.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      slug: data.slug,
      category: {
        connect: {
          id: data.category_id,
        },
      },
    },
  })
}

export const deleteSubCategoryQuery = (id: string) => {
  return prisma.subCategory.delete({
    where: {
      id,
    },
  })
}

export const deleteBatchSubCategoriesQuery = (ids: string[]) => {
  return prisma.subCategory.deleteMany({
    where: {
      id: { in: ids },
    },
  })
}
