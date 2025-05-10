'use server'

import { cache } from 'react'
import 'server-only'

import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache'
import { cookies } from 'next/headers'

import { defaultStoreCity } from '@/config/site'
import type { FindBrandsList } from '@/contracts/brand'
import type { FindCategorysList } from '@/contracts/category'
import type { FindDepartmentsList } from '@/contracts/departments'
import type { FindInvoicesList } from '@/contracts/invoice'
import type { FindOrdersList } from '@/contracts/orders'
import type { FindPlansList } from '@/contracts/plans'
import type { FindPricesList } from '@/contracts/price'
import type { FindProductsList } from '@/contracts/products'
import type { FindProfileStoresList } from '@/contracts/profile-store'
import type { FindStoresList } from '@/contracts/store'
import type { FindSubCategorysList } from '@/contracts/sub-category'
import type { FindTagsList } from '@/contracts/tags'
import type { FindZipCodesList } from '@/contracts/zip-code'
import { createServerClient } from '@/lib/supabase/server'

import * as Queries from './no-cached-queries'

export const getSession = cache(async () => {
  const supabase = await createServerClient()
  return supabase.auth.getSession()
})

export async function getUser() {
  'use cache'
  cacheLife('threeMinutes')
  const supabase = await createServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) return null

  cacheTag(`user_${data.user.id}`)
  return Queries.getUserQuery(data.user.id)
}

export async function getProfile() {
  'use cache'
  cacheLife('threeMinutes')

  const user = await getUser()
  if (!user) return null
  cacheTag(`profile_${user.id}`)
  return Queries.getProfileQuery(user)
}

export async function getStoreProfile() {
  'use cache'
  cacheLife('threeMinutes')

  const user = await getUser()
  if (!user) return null

  cacheTag(`store_profile_${user.id}`, 'store_list')
  return Queries.getStoreProfileQuery(user)
}

export async function getUserByEmail(email: string) {
  'use cache'
  cacheLife('threeMinutes')
  cacheTag(`user_by_email_${email}`)
  return Queries.getUserByEmailQuery(email)
}

export async function getAddressByStoreId() {
  'use cache'
  cacheLife('threeMinutes')
  const storeProfile = await getStoreProfile()
  cacheTag(`address_store_${storeProfile!.storeId}`)
  return Queries.findAddressByStoreIdQuery(storeProfile!.storeId)
}

export async function getBrandBySlug(slug: string) {
  'use cache'
  cacheLife('threeMinutes')
  cacheTag(`has_brand_${slug}`, 'brands_options')
  return Queries.getBrandBySlugQuery(slug)
}

export async function getBrandsOptions(search = '') {
  'use cache'
  cacheLife('fiveMinutes')
  cacheTag('brands_options')
  return Queries.getBrandsOptionsQuery(search)
}

export async function getBrandsList(params: FindBrandsList) {
  'use cache'
  cacheLife('fiveMinutes')
  cacheTag('brands_list')
  return Queries.getBrandsListQuery(params)
}

export async function getCategoriesOptions(departmentId?: string) {
  'use cache'
  cacheLife('fiveMinutes')
  cacheTag(`categories_options_${departmentId}`, 'category_list')
  return Queries.getCategoriesOptionsQuery(departmentId ?? '')
}

export async function getCategoryBySlug(slug: string) {
  'use cache'
  cacheLife('fiveMinutes')
  cacheTag(`has_category_by_slug_${slug}`, 'category_list')
  return Queries.getCategoryBySlugQuery(slug)
}

export async function getCategoryList(params: FindCategorysList) {
  'use cache'
  cacheLife('fiveMinutes')
  cacheTag('category_list')
  return Queries.getCategoryListQuery(params)
}

export async function getDepartmentOptions(search?: string) {
  'use cache'
  cacheLife('fiveMinutes')
  cacheTag('department_options', 'department_list')
  return Queries.getDepartmentOptionsQuery(search)
}

export async function getDepartmentListByStoreId(storeId: string) {
  'use cache'
  cacheLife('fiveMinutes')
  cacheTag(`department_list_by_store_id_${storeId}`, 'department_list')
  return Queries.getDepartmentListByStoreIdQuery(storeId)
}

export async function getDepartmentList(params: FindDepartmentsList) {
  'use cache'
  cacheLife('fiveMinutes')
  cacheTag('department_list')
  return Queries.getDepartmentListQuery(params)
}

export async function getDepartmentBySlug(slug: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`has_department_by_slug_${slug}`, 'department_list')
  return Queries.getDepartmentBySlugQuery(slug)
}

export async function getInvoicesListByStore(params: FindInvoicesList) {
  'use cache'
  cacheLife('threeMinutes')
  const storeProfile = await getStoreProfile()
  cacheTag(`invoices_list_by_store_${storeProfile!.storeId}`)
  return Queries.getInvoicesListByStoreQuery(params, storeProfile!.storeId)
}

export async function getPlanOptions() {
  'use cache'
  cacheLife('hours')
  cacheTag('plan_options', 'plan_list')
  return Queries.getPlanOptionsQuery()
}

export async function getPlanByName(name: string) {
  'use cache'
  cacheLife('hours')
  cacheTag(`plan_by_name_${name}`, 'plan_list')
  return Queries.getPlanByNameQuery(name)
}

export async function getPlanList(params: FindPlansList) {
  'use cache'
  cacheLife('hours')
  cacheTag('plan_list')
  return Queries.getPlanListQuery(params)
}

export async function getPlanById(planId: string) {
  'use cache'
  cacheLife('hours')
  cacheTag('plan_by_id', 'plan_list')
  return Queries.getPlanByIdQuery(planId)
}

export async function getPriceByBarCode(barCode: string) {
  'use cache'
  const storeProfile = await getStoreProfile()
  cacheTag(
    `price_by_bar_code_${barCode}_${storeProfile!.storeId}`,
    'price_list'
  )
  cacheTag(`product_by_bar_code_${barCode}`, 'price_list')
  return Queries.getPriceByBarCodeQuery(barCode, storeProfile!.storeId)
}

export async function getPriceList(params: FindPricesList) {
  'use cache'
  const storeProfile = await getStoreProfile()
  cacheLife('minutes')
  cacheTag(`price_list_${storeProfile!.storeId}`, 'price_list')
  return Queries.getPriceListQuery(params, storeProfile!.storeId)
}

export async function getPriceListOffers(storeId: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`price_list_offers_${storeId}`, 'price_list')
  return Queries.getPriceListOffersQuery(storeId)
}

export async function getPriceListFeatured(storeId: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`price_list_featured_${storeId}`, 'price_list')
  return Queries.getPriceListFeaturedQuery(storeId)
}

export async function getProductByBarCode(barCode: string) {
  'use cache'
  if (!barCode) return null
  cacheLife('threeMinutes')
  cacheTag(`product_by_bar_code_${barCode}`, 'product_list')
  return Queries.getProductByBarCodeQuery({ barCode })
}

export async function getProductBySlug(slug: string) {
  'use cache'
  cacheLife('threeMinutes')
  cacheTag(`product_by_slug_${slug}`, 'product_list')
  return Queries.getProductBySlugQuery(slug)
}

export async function getProductsByBarcodeOptions(barCode?: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag('products_by_barcode_options', 'product_list')
  return Queries.getProductsByBarcodeOptionsQuery(barCode ?? '')
}

export async function getProductList(params: FindProductsList) {
  'use cache'
  cacheLife('minutes')
  cacheTag('product_list')
  return Queries.getProductListQuery(params)
}

export async function getProfilesStoreList(params: FindProfileStoresList) {
  'use cache'
  const storeProfile = await getStoreProfile()
  if (!storeProfile) {
    return {
      profileStores: [],
      count: 0,
    }
  }
  cacheTag(
    `profiles_store_list_${storeProfile!.storeId}`,
    'profiles_store_list'
  )
  return Queries.getProfilesStoreQuery(params, storeProfile!.storeId)
}

export async function getShipping() {
  'use cache'
  const storeProfile = await getStoreProfile()
  if (!storeProfile) return null
  cacheTag(`shipping_${storeProfile!.storeId}`, 'shipping')
  cacheLife('minutes')
  return Queries.getShippingQuery(storeProfile!.storeId)
}

export async function getStoreByCNPJ(cnpj: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`store_by_cnpj_${cnpj}`, 'store_list')
  return Queries.getStoreByCNPJQuery(cnpj)
}

export async function getStoreList(params: FindStoresList) {
  'use cache'
  cacheLife('minutes')
  cacheTag('store_list')
  return Queries.getStoreListQuery(params)
}

export async function getStoreById(id: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`store_by_id_${id}`, 'store_list')
  return Queries.getStoreByIdQuery(id)
}

export async function getSearchStoresByCity(city: string, search?: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`stores_by_city_${city}`, 'store_list')
  return Queries.getSearchStoresByCityQuery(city, search ?? '')
}

export async function getSubCategoryList(params: FindSubCategorysList) {
  'use cache'
  cacheLife('minutes')
  cacheTag('sub_category_list')
  return Queries.getSubCategoryListQuery(params)
}

export async function getSubCategoriesOptions(categoryId?: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`sub_categories_options_${categoryId}`, 'sub_category_list')
  return Queries.getSubCategoriesOptionsQuery(categoryId ?? '')
}

export async function getSubCategoriesSearchOptions(search?: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag('sub_categories_search_options', 'sub_category_list')
  return Queries.getSubCategoriesSearchOptionsQuery(search)
}

export async function getSubCategoryBySlug(slug: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`sub_category_by_slug_${slug}`, 'sub_category_list')
  return Queries.getSubCategoryBySlugQuery(slug)
}

export async function getTagOptions(searchTag?: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag('tag_options', 'tag_list')
  return Queries.getTagOptionsQuery(searchTag ?? '')
}

export async function getTagBySlug(slug: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`tag_by_slug_${slug}`, 'tag_list')
  return Queries.hasTagBySlugQuery(slug)
}

export async function getTagList(params: FindTagsList) {
  'use cache'
  cacheLife('minutes')
  cacheTag('tag_list')
  return Queries.findTagListQuery(params)
}

export async function getZipCodesListByStoreId(
  params: FindZipCodesList,
  storeId: string
) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`zip_codes_list_by_store_id_${storeId}`, 'zip_code_list')
  return Queries.getZipCodesListByStoreIdQuery(params, storeId)
}

export async function getZipCodeByCep(zipCode: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`zip_code_by_cep_${zipCode}`, 'zip_code_list')
  return Queries.getZipCodeByCepQuery(zipCode)
}

export async function getZipCodeList(params: FindZipCodesList) {
  'use cache'
  cacheLife('minutes')
  cacheTag('zip_code_list')
  return Queries.getZipCodeListQuery(params)
}

export async function getSearchCitiesOptions(search?: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`cities_options_${search}`, 'cities_list')
  return Queries.getSearchCitiesOptionsQuery(search ?? '')
}

export async function getOrderByNumberStoreId(orderNumber: string) {
  'use cache'
  const storeProfile = await getStoreProfile()
  if (!storeProfile) return null
  cacheTag(
    `order_by_number_store_id_${orderNumber}_${storeProfile!.storeId}`,
    'order_list'
  )
  return Queries.getOrderByNumberAndStoreId(orderNumber, storeProfile!.storeId)
}

export async function getWeekOrdersList(params: FindOrdersList) {
  'use cache'
  cacheLife('threeMinutes')
  const storeProfile = await getStoreProfile()
  if (!storeProfile) {
    return {
      orders: [],
      count: 0,
    }
  }
  cacheTag(`orders_week_list_${storeProfile!.storeId}`, 'order_list')

  return Queries.getWeekOrdersByStoreId(params, storeProfile!.storeId)
}

export async function getMonthOrdersList(params: FindOrdersList) {
  'use cache'
  cacheLife('threeMinutes')
  const storeProfile = await getStoreProfile()
  if (!storeProfile) {
    return {
      orders: [],
      count: 0,
    }
  }
  cacheTag(`orders_month_list_${storeProfile!.storeId}`, 'order_list')
  return Queries.getMonthOrdersByStoreId(params, storeProfile!.storeId)
}

export async function getYearOrdersList(params: FindOrdersList) {
  'use cache'
  cacheLife('threeMinutes')
  const storeProfile = await getStoreProfile()
  if (!storeProfile) {
    return {
      orders: [],
      count: 0,
    }
  }
  cacheTag(`orders_year_list_${storeProfile!.storeId}`, 'order_list')
  return Queries.getYearOrdersByStoreId(params, storeProfile!.storeId)
}

export async function getDepartmentNavigation(storeId: string) {
  'use cache'
  cacheTag(
    'department_navigation',
    'department_list',
    'category_list',
    'brand_list'
  )
  cacheLife('threeMinutes')
  return Queries.getDepartmentNavigationQuery(storeId)
}

export async function getSearchProducts(search: string, storeId: string) {
  'use cache'
  cacheTag(`search_products_${search}_${storeId}`, 'price_list')
  cacheLife('threeMinutes')
  return Queries.getSearchProductsQuery(search, storeId)
}

export async function getSelectedStore() {
  'use cache'
  const {
    store_id = defaultStoreCity.store.store_id,
    city_id = defaultStoreCity.city_id,
  } = JSON.parse((await cookies()).get('favorite-store')?.value ?? '{}') as {
    store_id: string
    city_id: string
  }
  cacheTag('selected_store')
  cacheLife('threeMinutes')
  return { store_id, city_id }
}

export async function getSelectedStoreFooterInfo() {
  'use cache'
  const { store_id } = await getSelectedStore()
  cacheTag(
    `selected_store_footer_info_${store_id}`,
    'selected_store',
    'store_list',
    `shipping_${store_id}`
  )
  cacheLife('threeMinutes')
  return Queries.getSelectedStoreFooterInfoQuery(store_id)
}
