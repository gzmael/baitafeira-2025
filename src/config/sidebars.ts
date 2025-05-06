import { StoreTypeUser, type TypeUser } from '@prisma/client'

import type { Icons } from '@/components/ui/icons'

export type SidebarLink = {
  title: string
  url: string
  icon: keyof typeof Icons
  hideTo?: (StoreTypeUser | TypeUser)[]
}

export type NewSidebarLink = {
  title: string
  url: string
  icon: keyof typeof Icons
  isActive?: boolean
  hideTo?: (StoreTypeUser | TypeUser)[]
  items?: SidebarLink[]
}

export const sidebarKratos: NewSidebarLink[] = [
  {
    title: 'Organizations',
    url: '#',
    icon: 'categories',
    isActive: true,
    items: [
      {
        title: 'Departamentos',
        url: '/department',
        icon: 'department',
      },
      {
        title: 'Categorias',
        url: '/category',
        icon: 'categories',
      },
      {
        title: 'Sub-categorias',
        url: '/sub-categorie',
        icon: 'subcategory',
      },
    ],
  },
  {
    title: 'Produtos',
    url: '#',
    icon: 'products',
    items: [
      {
        title: 'Listagem',
        url: '/product',
        icon: 'list',
      },
      {
        title: 'Marcas',
        url: '/brand',
        icon: 'brand',
      },
      {
        title: 'Tags',
        url: '/tags',
        icon: 'tags',
      },
    ],
  },
  {
    title: 'Lojas',
    url: '#',
    icon: 'stores',
    items: [
      {
        title: 'Listagem',
        url: '/store',
        icon: 'list',
      },
      {
        title: 'Planos',
        url: '/plan',
        icon: 'plans',
      },
      {
        title: 'Pagamentos',
        url: '/payment',
        icon: 'payments',
      },
    ],
  },
  {
    title: 'Atendimento',
    url: '#',
    icon: 'feedback',
    items: [
      {
        title: 'Feedbacks',
        url: '/feedbaks',
        icon: 'feedback',
      },
      {
        title: 'Suporte',
        url: '/support',
        icon: 'support',
      },
    ],
  },
  {
    title: 'Configurações',
    url: '#',
    icon: 'settings',
    items: [
      {
        title: 'Usuários',
        url: '/user',
        icon: 'users',
      },
      {
        title: 'CEPs',
        url: '/zip-code',
        icon: 'cep',
      },
    ],
  },
]

export const sidebarStoreSetting: SidebarLink[] = [
  {
    title: 'Perfil',
    url: 'configuracoes/perfil',
    icon: 'user',
  },
  {
    title: 'Conta',
    url: 'configuracoes/conta',
    icon: 'account',
    hideTo: [StoreTypeUser.SELLER],
  },
  {
    title: 'Endereço',
    url: 'configuracoes/endereco',
    icon: 'home',
    hideTo: [StoreTypeUser.SELLER],
  },
  {
    title: 'Ceps atendidos',
    url: 'configuracoes/cep',
    icon: 'cep',
    hideTo: [StoreTypeUser.SELLER],
  },
  {
    title: 'Frete',
    url: 'configuracoes/frete',
    icon: 'shipping',
    hideTo: [StoreTypeUser.SELLER],
  },
  {
    title: 'Plano',
    url: 'configuracoes/plano',
    icon: 'plans',
    hideTo: [StoreTypeUser.SELLER],
  },
  {
    title: 'Faturas',
    url: 'configuracoes/fatura',
    icon: 'invoice',
    hideTo: [StoreTypeUser.SELLER],
  },
]

export const sidebarStore: NewSidebarLink[] = [
  {
    title: 'Preços',
    url: '#',
    icon: 'price',
    items: [
      {
        title: 'Listagem',
        url: 'preco',
        icon: 'list',
      },
      {
        title: 'Inativos',
        url: 'preco/inativo',
        icon: 'hide',
      },
      {
        title: 'Ofertas',
        url: 'preco/ofertas',
        icon: 'offer',
      },
    ],
  },
  {
    title: 'Pedidos',
    url: '#',
    icon: 'order',
    items: [
      {
        title: 'Listagem',
        url: 'pedidos/semanal',
        icon: 'list',
      },
    ],
  },
  {
    title: 'Mensagens',
    url: '#',
    icon: 'message',
    items: [
      {
        title: 'Listagem',
        url: 'mensagem',
        icon: 'list',
      },
    ],
  },
  {
    title: 'Banners',
    url: '#',
    icon: 'placeholder',
    hideTo: [StoreTypeUser.SELLER],
    items: [
      {
        title: 'Listagem',
        url: 'banner',
        icon: 'list',
      },
    ],
  },
  {
    title: 'Contas',
    url: 'conta',
    icon: 'users',
    hideTo: [StoreTypeUser.SELLER],
    items: [
      {
        title: 'Listagem',
        url: 'conta',
        icon: 'list',
      },
    ],
  },
  {
    title: 'Configurações',
    url: 'configuracoes/perfil',
    icon: 'settings',
    items: sidebarStoreSetting,
  },
]
