import type {
  Order,
  PaymentMethod,
  Prisma,
  StatusOrder,
} from '@/generated/prisma/client'

import type { FindGenericList } from './commons'

export type OrderFields = keyof Order
export type FindOrdersList = FindGenericList<OrderFields>

export type OrderWithCounts = {
  number: string
  status: StatusOrder
  profile: {
    name: string
    lastName: string
    phone: string | null
  }
  shipping: number
  id: string
  total: number
  amount: number
  discount: number
  items: Prisma.JsonValue
  address: Prisma.JsonValue
  paymentMethod: PaymentMethod
  createdAt: Date
}

export type OrderItem = {
  id: string
  name: string
  quantity: number
  cost: number
  confirmed: boolean | null
}

export type OrderAddress = {
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  zipCode: string
}
