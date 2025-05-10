'use client'

import { useQuery } from '@tanstack/react-query'

import type { EanApiResponse, EanImportData } from '@/contracts/products'
import { apiLocal } from '@/lib/axios'
import {
  getProductBySlug,
  getProductsByBarcodeOptions,
} from '@/lib/prisma/queries/cached-queries'

async function getProductsBarcodeOptions(barcode?: string) {
  const products = await getProductsByBarcodeOptions(barcode)
  return products
}

export function useProductsByBarcodeOptions(barcode?: string) {
  const hasFullSearch = barcode?.split(' - ')

  const barcodeFormatted = hasFullSearch?.length
    ? barcode?.split(' - ')[0]
    : barcode

  return useQuery({
    queryKey: ['products-by-barcode-options', barcodeFormatted],
    queryFn: () => getProductsBarcodeOptions(barcodeFormatted),
  })
}

async function getProductImport(
  barcode?: string
): Promise<EanImportData | null> {
  if (!barcode) {
    return null
  }

  const response = await apiLocal.get<EanApiResponse>(`/ean/desc/${barcode}`)
  if (response.data && response.data.Status === '200') {
    const { Nome, Categoria, Marca } = response.data

    try {
      const responseImage = await apiLocal.get<ArrayBuffer>(
        `/ean/gtin/${barcode}`,
        {
          responseType: 'arraybuffer',
        }
      )
      const imageType = responseImage.headers['content-type']
      const imageBuffer = responseImage.data
      const base64Image = Buffer.from(imageBuffer).toString('base64')
      const dataUrl = `data:image/png;base64,${base64Image}`

      const blobPart = new Blob([imageBuffer], { type: imageType })

      return {
        name: Nome,
        category: Categoria !== 'Desconhecido' ? Categoria : '',
        brand: Marca !== 'Desconhecido' ? Marca : '',
        image: {
          url: `http://www.eanpictures.com.br:9000/api/gtin/${barcode}`,
          data: dataUrl,
          blob: blobPart,
          imageType,
          imageName: responseImage.headers['content-disposition']
            .split('filename=')[1]
            .replace(/"/g, ''),
        },
      }
    } catch (error) {
      return {
        name: Nome,
        category: Categoria !== 'Desconhecido' ? Categoria : '',
        brand: Marca !== 'Desconhecido' ? Marca : '',
      }
    }
  }

  return null
}

export function useProductImport(barcode?: string) {
  return useQuery({
    queryKey: ['ean-import-data', barcode],
    queryFn: () => getProductImport(barcode),
    enabled: !!barcode,
  })
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ['product-by-slug', slug],
    queryFn: () => getProductBySlug(slug),
  })
}
