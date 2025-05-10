import { prisma } from '@/lib/prisma'
import {
  UpdateProductPayloadType,
  CreateProductPayloadType,
} from '@/validators/productValidator'

export const createProductQuery = ({
  barCode,
  brand_id,
  description,
  images,
  isFractional,
  name,
  quantity,
  slug,
  status,
  sub_category_id,
  tags,
  unitType,
}: CreateProductPayloadType) => {
  return prisma.product.create({
    data: {
      name,
      slug,
      description,
      barCode,
      status,
      isFractional,
      quantity,
      unitType,
      subCategory: {
        connect: {
          id: sub_category_id,
        },
      },
      brand: {
        connect: {
          id: brand_id,
        },
      },
      productImages: {
        createMany: {
          data: images
            ? images.map(({ name, url }) => ({
                imageName: name,
                imageUrl: url,
              }))
            : [],
          skipDuplicates: true,
        },
      },
      productTags: {
        createMany: {
          data: tags
            ? tags.map((tag) => ({
                tagId: tag,
              }))
            : [],
          skipDuplicates: true,
        },
      },
    },
  })
}

export const updateProductQuery = ({
  id,
  barCode,
  brand_id,
  description,
  images,
  isFractional,
  name,
  quantity,
  slug,
  status,
  sub_category_id,
  tags,
  unitType,
}: UpdateProductPayloadType) => {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      barCode,
      description,
      isFractional,
      quantity,
      unitType,
      status,
      brand: {
        connect: {
          id: brand_id,
        },
      },
      subCategory: {
        connect: {
          id: sub_category_id,
        },
      },
      productImages: {
        deleteMany: {},
        createMany: {
          data: images
            ? images.map(({ name, url }) => ({
                imageName: name,
                imageUrl: url,
              }))
            : [],
          skipDuplicates: true,
        },
      },
      productTags: {
        deleteMany: {},
        createMany: {
          data: tags
            ? tags.map((tag) => ({
                tagId: tag,
              }))
            : [],
          skipDuplicates: true,
        },
      },
    },
  })
}

export const deleteProductQuery = (id: string) => {
  return prisma.product.delete({
    where: {
      id,
    },
  })
}

export const deleteBatchProductsQuery = (ids: string[]) => {
  return prisma.product.deleteMany({
    where: {
      id: { in: ids },
    },
  })
}
