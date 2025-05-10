import { CreateTagSchemaType, UpdateTagPayloadType } from '@/validators'

import { prisma } from '..'

export const createTagQuery = (data: CreateTagSchemaType) => {
  return prisma.tag.create({
    data: {
      name: data.name,
      slug: data.slug,
    },
  })
}

export const updateTagQuery = ({ id, ...data }: UpdateTagPayloadType) => {
  return prisma.tag.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  })
}

export const deleteBatchTagsQuery = (ids: string[]) => {
  return prisma.tag.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  })
}

export const deleteTagQuery = (id: string) => {
  return prisma.tag.delete({
    where: {
      id,
    },
  })
}
