import type { Icons } from '@/components/ui/icons'

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type PanelType = 'kratos' | 'store' | 'user'

export type DepartmentNavigationResponse = {
  name: string
  slug: string
  brands: {
    name: string
    slug: string
  }[]
  categories: {
    name: string
    slug: string
  }[]
  smallBanner?: {
    src: string
    alt: string
  }
}

export type SubItemNavigation = {
  defaultValue: string
  items: DepartmentNavigationResponse[]
}

type DepartmentNavigationLink = {
  value: string
  label: string
  href: string
  icon?: keyof typeof Icons
  subItems?: never
}

type DepartmentNavigationSubItem = {
  value: string
  label: string
  icon?: keyof typeof Icons
  href?: never
  subItems: SubItemNavigation[]
}

export type DepartmentNavigation =
  | DepartmentNavigationLink
  | DepartmentNavigationSubItem
