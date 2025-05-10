import type { DepartmentNavigationResponse } from '@/contracts/navigation'

import { prisma } from '../..'

export const getDepartmentNavigationQuery = async (
  storeId: string
): Promise<DepartmentNavigationResponse[]> => {
  const enabledProducts = await prisma.price.findMany({
    where: {
      storeId,
      isEnabledSale: true,
      product: {
        subCategoryId: {
          not: null,
        },
        departmentId: {
          not: null,
        },
        categoryId: {
          not: null,
        },
      },
    },
    select: {
      productId: true,
      product: {
        select: {
          subCategoryId: true,
          departmentId: true,
          categoryId: true,
          brandId: true,
        },
      },
    },
  })

  const uniquesDepartmentIds = new Set(
    enabledProducts.map((product) => product.product.departmentId!)
  )

  const uniquesBrandsWithDepartmentIds = new Set(
    enabledProducts.map((product) => ({
      departmentId: product.product.departmentId!,
      brandId: product.product.brandId!,
    }))
  )

  const uniquesBrandsIds = new Set(
    enabledProducts.map((item) => item.product.brandId!)
  )

  const departments = await prisma.department.findMany({
    where: {
      id: {
        in: Array.from(uniquesDepartmentIds),
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
        orderBy: {
          name: 'asc',
        },
        take: 5,
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  const brands = await prisma.brand.findMany({
    where: {
      id: {
        in: Array.from(uniquesBrandsIds),
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  const departmentsWithBrands = departments.map((department) => {
    return {
      ...department,
      brands: brands.filter((brand) =>
        Array.from(uniquesBrandsWithDepartmentIds).some(
          (item) =>
            item.departmentId === department.id && item.brandId === brand.id
        )
      ),
    }
  })

  return departmentsWithBrands
}
