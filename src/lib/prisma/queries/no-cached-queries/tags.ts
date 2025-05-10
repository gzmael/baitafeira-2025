import type { FindTagsList } from '@/contracts/tags'
import { prisma } from '@/lib/prisma'

export const getTagOptionsQuery = async (searchTag?: string) => {
  const tags = await prisma.tag.findMany({
    where: {
      name: searchTag
        ? { contains: searchTag, mode: 'insensitive' }
        : undefined,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
    take: searchTag ? 10 : undefined,
  })

  return tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }))
}

export const hasTagBySlugQuery = (slug: string) => {
  return prisma.tag.findUnique({
    where: {
      slug,
    },
  })
}

export const findTagListQuery = async ({
  limit,
  offset,
  column = 'createdAt',
  fromDay,
  order = 'desc',
  search,
  toDay,
}: FindTagsList) => {
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

  const tags = await prisma.tag.findMany({
    include: {
      _count: true,
    },
    where: {
      name: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.tag.count({
    where: {
      name: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { tags, count }
}
