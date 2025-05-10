import { StoreTypeUser, TypeUser } from '@/generated/prisma/client'
import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

import { KratosNavigation, StoreNavigation } from '@/config/navigation'
import { env } from '@/env'

import 'dayjs/locale/pt-br'
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\p{Diacritic}]/gu, '')
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
}

export function formatFirstLetter(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const ApiError = (
  message: string,
  headers: HeadersInit,
  status = 400
) => {
  return new Response(JSON.stringify({ message }), {
    status,
    headers,
  })
}

export function formatDate(date: Date | string | number, short = false) {
  if (short) {
    return dayjs(date).format('DD/MM/YYYY')
  }

  return new Intl.DateTimeFormat('pt-BR', {
    month: short ? 'short' : 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date?: Date | string | number | null) {
  if (!date) return '--'
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: '2-digit',
  }).format(new Date(date))
}

export const niceDate = (datetime: string): string => {
  return dayjs(datetime).fromNow()
}

export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files)
  if (!isArray) return false
  return files.every((file) => file instanceof File)
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: 'accurate' | 'normal' = 'normal'
) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  )
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function isValidItems(items: unknown) {
  return (
    items &&
    typeof items === 'object' &&
    Array.isArray(items) &&
    items.length > 0
  )
}

export const makeBreadcrumbByKeys = (
  keys: string[],
  type: 'kratos' | 'store'
) => {
  const path = keys
    .map((key) =>
      type === 'kratos'
        ? KratosNavigation.find((item) => item.key === key)
        : StoreNavigation.find((item) => item.key === key)
    )
    .filter(Boolean)

  return path.map((item) => ({
    label: item!.label,
    href: item!.href,
  }))
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast.error('Erro', {
      description: errors.join('\n'),
    })
  }
  if (err instanceof Error) {
    return toast.error('Erro', {
      description: err.message,
    })
  }
  return toast.error('Erro', {
    description: 'Algo falhou, por favor tente novamente mais tarde.',
  })
}

export const getURL = () => {
  let url =
    env.NEXT_PUBLIC_APP_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`
  return url
}

export const validatePathByRole = (
  pathname: string,
  role: TypeUser | StoreTypeUser
) => {
  const atKratos = pathname.startsWith('/kratos')
  const atConta = pathname.startsWith('/conta')
  const atLoja = pathname.startsWith('/loja')

  const signInAccountPath = '/conta/entrar'
  const signInStorePath = '/loja/entrar'

  const validationPath = {
    [TypeUser.ADMIN]: {
      isValidPath: atKratos,
      signInPath: signInAccountPath,
      dashboardPath: '/kratos',
    },
    [TypeUser.USER]: {
      isValidPath: atConta,
      signInPath: signInAccountPath,
      dashboardPath: '/conta',
    },
    [StoreTypeUser.MANAGER]: {
      isValidPath: atLoja,
      signInPath: signInStorePath,
      dashboardPath: '/loja/dashboard',
    },
    [StoreTypeUser.SELLER]: {
      isValidPath: atLoja,
      signInPath: signInStorePath,
      dashboardPath: '/loja/dashboard',
    },
  }

  return validationPath[role]
}

export const formatPlanAttributes = (attribute: number | boolean | string) => {
  if (typeof attribute === 'boolean') {
    return attribute ? 'Sim' : 'Não'
  }

  if (typeof attribute === 'number') {
    return attribute
  }

  return attribute
}

export function formatMoney(
  amount: number,
  currency = 'BRL',
  locale = 'pt-BR'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function calculatePercentage(cost: number, offerCost: number) {
  if (cost === 0) return 0
  const percentage = ((offerCost - cost) / cost) * 100
  return percentage % 1 === 0 ? percentage : percentage.toFixed(2)
}

export function calculateDiscountPercentage(cost: number, offerCost: number) {
  return (100 - (offerCost / cost) * 100).toFixed(0)
}

export const logger = (message: string, params?: unknown) => {
  console.log(message, params)
}

export function isMacOs() {
  if (typeof window === 'undefined') return false

  return window.navigator.userAgent.includes('Mac')
}

export function isEANorGTINBarcode(barCode: string) {
  const regexValidEanGtin = /^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/
  return regexValidEanGtin.test(barCode)
}

export function removeInvalidCharacters(search: string) {
  return search.replace(/[^a-zA-Z0-9 ãõçáéíóúàèìòùâêîôûäëïöüñ]/g, '')
}

export function formatSearchQueryAnd(search: string) {
  return removeInvalidCharacters(search)
    .trim()
    .split(' ')
    .filter(Boolean)
    .join(' & ')
}

export function formatSearchQueryOr(search: string) {
  return removeInvalidCharacters(search)
    .trim()
    .split(' ')
    .filter(Boolean)
    .join(' | ')
}

export const constructPrefixTsQuery = (
  term: string,
  operation: 'and' | 'or' = 'and',
  advanced = false
) => {
  const sanitized = term
    .replace(/'/g, "''")
    .replace(/[!&|():*<>]/g, '')
    .replaceAll(/[^a-zA-Z0-9 ãõçáéíóúàèìòùâêîôûäëïöüñ]/g, '')
    .trim()
  if (sanitized === '') return ''
  const tokens = sanitized.split(/\s+/)
  return tokens
    .map((token) => (advanced ? `${token}:*` : token))
    .join(operation === 'and' ? ' & ' : ' | ')
}

export const highlightMatches = (text: string, term: string) => {
  if (!term.trim()) return text

  const searchTerms = term.split(/\s+/).filter((t) => t.length > 0)
  const escapedTerms = searchTerms.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )
  const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi')

  return text.replace(regex, '<strong>$1</strong>')
}

export function formatPhone(phone: string) {
  return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}

export function formatCNPJ(cnpj: string) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}
