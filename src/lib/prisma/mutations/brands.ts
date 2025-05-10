import {
  revalidatePath,
  revalidateTag,
} from 'next/dist/server/web/spec-extension/revalidate'

import { prisma } from '@/lib/prisma'
import * as validators from '@/validators'

export const createBrandQuery = async (
  data: validators.CreateBrandSchemaType,
) => {
  const brand = await prisma.brand.create({
    data: {
      name: data.name,
      slug: data.slug,
    },
  })

  revalidatePath('/kratos/brand')
  revalidateTag('brands_options')
  revalidateTag('brands_list')

  return brand
}

export const updateBrandQuery = ({
  id,
  name,
  slug,
}: validators.UpdateBrandPaylodType) => {
  return prisma.brand.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
    },
  })
}

export const deleteBrandsQuery = (ids: string[]) => {
  return prisma.brand.deleteMany({
    where: {
      id: {
        in: ids,
      },
      products: {
        none: {},
      },
    },
  })
}
