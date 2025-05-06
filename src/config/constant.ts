import {
  PaymentMethod,
  PlanType,
  ProductStatus,
  ShippingType,
  StatusInvoice,
  type StatusOrder,
  type StatusStore,
  type StatusUser,
  StoreTypeUser,
  UnitType,
} from '@prisma/client'

import type { BadgeVariantProps } from '@/components/ui/badge/styles'
import type { DepartmentIcon } from '@/components/ui/department-icons'
import { Icons } from '@/components/ui/icons'
import type { Option } from '@/contracts/commons'

export const userStatusText: Record<StatusUser, string> = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
  BLOCKED: 'Bloqueado',
}

export const userStoreTypeText: Record<StoreTypeUser, string> = {
  MANAGER: 'Administrador',
  SELLER: 'Vendedor',
}

export const invoiceStatusOptions: Option[] = [
  {
    label: 'Pendente',
    value: StatusInvoice.PENDING,
  },
  {
    label: 'Pago',
    value: StatusInvoice.PAID,
  },
  {
    label: 'Cancelado',
    value: StatusInvoice.CANCELED,
  },
]

export const productStatusOptions: Option[] = [
  {
    label: 'Ativo',
    value: ProductStatus.ACTIVE,
  },
  {
    label: 'Inativo',
    value: ProductStatus.INACTIVE,
  },
  {
    label: 'Pendente',
    value: ProductStatus.PENDING,
  },
]

export const storeTypeUserOptions: Option[] = [
  {
    label: 'Administrador',
    value: StoreTypeUser.MANAGER,
  },
  {
    label: 'Vendedor',
    value: StoreTypeUser.SELLER,
  },
]

export const getBadgeVariantByStatus: Record<
  ProductStatus,
  BadgeVariantProps['variant']
> = {
  ACTIVE: 'success',
  PENDING: 'default',
  INACTIVE: 'destructive',
}

export const getBadgeVariantByStatusUser: Record<
  StatusUser,
  BadgeVariantProps['variant']
> = {
  ACTIVE: 'success',
  INACTIVE: 'destructive',
  BLOCKED: 'secondary',
}

export const getProductStatusText: Record<ProductStatus, string> = {
  ACTIVE: 'Ativo',
  PENDING: 'Pendente',
  INACTIVE: 'Inativo',
}

export const getStoreStatusText: Record<
  StatusStore,
  BadgeVariantProps['variant']
> = {
  ACTIVE: 'success',
  INACTIVE: 'destructive',
  DELETED: 'destructive',
}

export const storeStatusText: Record<StatusStore, string> = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
  DELETED: 'Deletado',
}

export const userStatusColors: Record<
  StatusUser,
  BadgeVariantProps['variant']
> = {
  ACTIVE: 'success',
  INACTIVE: 'destructive',
  BLOCKED: 'secondary',
}

export const invoiceStatusText: Record<StatusInvoice, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  CANCELED: 'Cancelado',
}

export const invoicePaymentMethodText: Record<PaymentMethod, string> = {
  PIX: 'Pix',
  CREDIT_CARD: 'Cartão de Crédito',
  DEBIT_CARD: 'Cartão de Débito',
  BANK_SLIP: 'Boleto Bancário',
  MONEY: 'Dinheiro',
}

export const paymentMethodOptions: Option[] = [
  {
    label: 'Cartão de Crédito',
    value: PaymentMethod.CREDIT_CARD,
    icon: Icons.invoice,
  },
  {
    label: 'Cartão de Débito',
    value: PaymentMethod.DEBIT_CARD,
    icon: Icons.invoice,
  },
  {
    label: 'Boleto Bancário',
    value: PaymentMethod.BANK_SLIP,
    icon: Icons.bankSlip,
  },
  {
    label: 'Pix',
    value: PaymentMethod.PIX,
    icon: Icons.pix,
  },
  {
    label: 'Dinheiro',
    value: PaymentMethod.MONEY,
    icon: Icons.money,
  },
]

export const orderStatusColors: Record<
  StatusOrder,
  BadgeVariantProps['variant']
> = {
  PENDING: 'secondary',
  DELIVERED: 'success',
  CANCELED: 'destructive',
  SHIPPED: 'success',
  SEPARATED: 'secondary',
  SEPARATING: 'secondary',
  REJECTED: 'destructive',
  PENDING_CONFIRMATION: 'secondary',
}

export const orderStatusText: Record<StatusOrder, string> = {
  PENDING: 'Pendente',
  DELIVERED: 'Entregue',
  CANCELED: 'Cancelado',
  SHIPPED: 'Enviado',
  SEPARATED: 'Separado',
  SEPARATING: 'Separando',
  REJECTED: 'Rejeitado',
  PENDING_CONFIRMATION: 'Aguardando confirmação',
}

export const getInvoiceByStatus: Record<
  StatusInvoice,
  BadgeVariantProps['variant']
> = {
  PENDING: 'secondary',
  PAID: 'success',
  CANCELED: 'destructive',
}

export const shippingTypeOptions: Option[] = [
  {
    label: 'Grátis',
    value: ShippingType.FREE,
    icon: Icons.free,
  },
  {
    label: 'Bairro',
    value: ShippingType.NEIGHBORHOOD,
    icon: Icons.neighborhood,
  },
  {
    label: 'Dinâmico',
    value: ShippingType.DYNAMIC,
    icon: Icons.dynamic,
  },
  {
    label: 'Fixo',
    value: ShippingType.FIXED,
    icon: Icons.fixed,
  },
]

export const phoneMask = [
  '(',
  /[1-9]/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

export const zipCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

export const cnpjMask = [
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
]

export const planTypeOptions: Option[] = [
  {
    label: 'Mensal',
    value: PlanType.MONTHLY,
  },
  {
    label: 'Anual',
    value: PlanType.YEARLY,
  },
]

export const planAttributes: Option[] = [
  {
    label: 'Vendas',
    value: 'orders',
  },
  {
    label: 'Banners',
    value: 'banners',
  },
  {
    label: 'Usuários',
    value: 'users',
  },
  {
    label: 'Produtos',
    value: 'prices',
  },
  {
    label: 'Análises avançadas',
    value: 'advanced_analytics',
  },
  {
    label: 'Suporte prioritário',
    value: 'support_priority',
  },
]

export const unitTypeOptions = [
  {
    group: 'Área',
    options: [
      {
        label: 'Metro quadrado (m²)',
        value: UnitType.M2,
      },
    ],
  },
  {
    group: 'Comprimento',
    options: [
      {
        label: 'Centímetro (cm)',
        value: UnitType.CM,
      },
      {
        label: 'Metro (m)',
        value: UnitType.ME,
      },
    ],
  },
  {
    group: 'Embalagem',
    options: [
      {
        label: 'Unidade (UN)',
        value: UnitType.UN,
      },
      {
        label: 'Cartela (1)',
        value: UnitType.CT,
      },
      {
        label: 'Caixa (1)',
        value: UnitType.CX,
      },
      {
        label: 'Duzia (12)',
        value: UnitType.DU,
      },
      {
        label: 'Par (2)',
        value: UnitType.PA,
      },
      {
        label: 'Peça (1)',
        value: UnitType.PC,
      },
      {
        label: 'Pacote (1)',
        value: UnitType.PT,
      },
      {
        label: 'Rolo (1)',
        value: UnitType.RL,
      },
    ],
  },
  {
    group: 'Peso',
    options: [
      {
        label: 'Grama (g)',
        value: UnitType.GR,
      },
      {
        label: 'Quilograma (kg)',
        value: UnitType.KG,
      },
      {
        label: 'Saca (60kg)',
        value: UnitType.SC,
      },
    ],
  },
  {
    group: 'Volume',
    options: [
      {
        label: 'Litro (l)',
        value: UnitType.LT,
      },
      {
        label: 'Mililitro (ml)',
        value: UnitType.ML,
      },
      {
        label: 'Metro cúbico (m³)',
        value: UnitType.M3,
      },
    ],
  },
]

export const typePeriod: Record<PlanType, number> = {
  MONTHLY: 1,
  YEARLY: 12,
}

export const typePeriodNumber: Record<number, PlanType> = {
  1: PlanType.MONTHLY,
  12: PlanType.YEARLY,
}

export const periodOptions: Option[] = [
  {
    label: 'Mensal',
    value: '1',
  },
  {
    label: 'Anual',
    value: '12',
  },
]

export const statusProductOptions: Option[] = [
  {
    label: 'Ativo',
    value: ProductStatus.ACTIVE,
  },
  {
    label: 'Inativo',
    value: ProductStatus.INACTIVE,
  },
  {
    label: 'Pendente',
    value: ProductStatus.PENDING,
  },
]

export const departmentIconMapper: Record<string, keyof typeof DepartmentIcon> =
  {
    Bazar: 'bazaar',
    Bebidas: 'drinks',
    Bomboniere: 'candy_store',
    Congelados: 'frozen',
    Frigorífico: 'fridge',
    'Frios e Laticínios': 'cold_and_dairy',
    'Higiene e Beleza': 'hygiene_and_beauty',
    Hortfruti: 'hortifruti',
    Limpeza: 'cleaning',
    'Matinais e Sobremesas': 'breakfasts_and_desserts',
    Mercearia: 'grocery_store',
    Padaria: 'bakery',
    Pet: 'pet',
  }
