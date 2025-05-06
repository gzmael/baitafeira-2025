import type { ComponentType } from 'react'

import type { FileWithPath } from 'react-dropzone'

export type ParamsTypes = string | string[] | undefined

export interface SearchParamsTypes {
  searchParams: {
    [key: string]: ParamsTypes
  }
}

export interface BreadcrumbLink {
  label: string
  href?: string
}

export interface PageWithSlugParamsProps {
  params: {
    slug: string
  }
}

export interface StoredFile {
  id: string
  name: string
  url: string
  preview?: string
}

export interface Option {
  label: string
  value: string
  icon?: ComponentType<{ className?: string }>
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export type FindCommonList = {
  limit: number
  offset: number
  order?: 'asc' | 'desc'
  search?: string
  fromDay?: Date
  toDay?: Date
}

export interface DataTableFilterField<TData> {
  label: string
  value: keyof TData
  placeholder?: string
  options?: Option[]
  className?: string
}

export type FindGenericList<TFields> = {
  limit: number
  offset: number
  fromDay?: Date
  toDay?: Date
  column?: TFields
  order?: 'asc' | 'desc'
  search?: string
}

export type GoogleGeocodingApiResponse = {
  results: {
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
  }[]
  status:
    | 'OK'
    | 'ZERO_RESULTS'
    | 'INVALID_REQUEST'
    | 'OVER_QUERY_LIMIT'
    | 'REQUEST_DENIED'
    | 'UNKNOWN_ERROR'
}

export type ResizedImageResponse = {
  name: string
  data: string
}
