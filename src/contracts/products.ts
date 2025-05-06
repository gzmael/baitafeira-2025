import type {
  Brand,
  Product,
  ProductImage,
  ProductStatus,
  ProductTag,
  SubCategory,
} from '@prisma/client'

import type { FindGenericList } from './commons'

export type ProductFields = keyof Product
export type FindProductsList = FindGenericList<ProductFields> & {
  subCategory?: string
  status?: ProductStatus
}

export type ProductWithCounts = {
  status: ProductStatus
  description: string | null
  subCategory: {
    name: string
  } | null
  id: string
  name: string
  slug: string
  barCode: string | null
  subCategoryId: string | null
  createdAt: Date
  productImages: {
    imageName: string
    imageUrl: string
  }[]
}

export type ProductWithImages = Product & {
  productImages: ProductImage[] | null
  subCategory: SubCategory | null
  brand: Brand | null
  productTags: ProductTag[] | null
}

export type EanImportData = {
  name: string
  category: string
  brand: string
  image?: {
    url: string
    data: string
    blob: BlobPart
    imageType: string
    imageName: string
  }
}

export type EanApiResponse = {
  Nome: string
  Marca: string
  Status: string
  Peso: string
  Categoria: string
}
