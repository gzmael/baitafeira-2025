import type { FindSubCategorysList } from '@/contracts/sub-category'
import { prisma } from '@/lib/prisma'

export const getSubCategoryListQuery = async ({
  limit,
  offset,
  column = 'createdAt',
  fromDay,
  order = 'desc',
  search,
  category,
  toDay,
}: FindSubCategorysList) => {
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

  const categoriesSearch = category
    ? {
        category: {
          id: {
            in: category.split('.'),
          },
        },
      }
    : undefined

  const subCategories = await prisma.subCategory.findMany({
    select: {
      category: {
        select: {
          name: true,
        },
      },
      categoryId: true,
      id: true,
      name: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
    },
    where: {
      name: search ? { contains: search } : undefined,
      ...categoriesSearch,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.subCategory.count({
    where: {
      name: search ? { contains: search } : undefined,
      ...categoriesSearch,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { subCategories, count }
}

export const getSubCategoriesOptionsQuery = async (categoryId?: string) => {
  const subCategories = await prisma.subCategory.findMany({
    where: {
      categoryId,
    },
    select: {
      id: true,
      name: true,
      categoryId: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return subCategories.map((subCategory) => ({
    value: subCategory.id,
    label: subCategory.name,
    category: subCategory.categoryId,
  }))
}

export const getSubCategoriesSearchOptionsQuery = async (search?: string) => {
  const subCategories = await prisma.subCategory.findMany({
    where: {
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
    take: 10,
  })

  return subCategories.map((subCategory) => ({
    value: subCategory.id,
    label: subCategory.name,
  }))
}

export const getSubCategoryBySlugQuery = (slug: string) => {
  return prisma.subCategory.findUnique({
    where: {
      slug,
    },
  })
}
