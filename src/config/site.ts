import type { FooterItem, MainNavItem } from '@/contracts/navigation'

const socialLinks = {
  instagram: 'https://www.instagram.com/baita.feira/',
  facebook: 'https://www.instagram.com/baita.feira/',
  whatsapp: 'https://www.instagram.com/baita.feira/',
}

const mainNav: MainNavItem[] = [
  {
    title: 'Ofertas',
    href: '/ofertas',
    icon: 'offer',
  },
  {
    title: 'Destaques',
    href: '/destaques',
    icon: 'highlight',
  },
  {
    title: 'Marcas',
    href: '/marcas',
    icon: 'brands',
  },
  {
    title: 'Atendimento',
    href: '/atendimento',
    icon: 'help',
  },
  {
    title: 'Formas de Pagamento',
    href: '/formas-de-pagamento',
  },
  {
    title: 'Política de Entrega',
    href: '/politica-de-entrega',
    icon: 'help',
  },
  {
    title: 'Política de Devolução',
    href: '/politica-de-devolucao',
    icon: 'help',
  },
]

export const userLobbyNav: MainNavItem[] = [
  {
    title: 'Perfil',
    href: '/perfil',
    icon: 'user',
  },
  {
    title: 'Pedidos',
    href: '/pedidos',
    icon: 'orders',
  },
  {
    title: 'Favoritos',
    href: '/favoritos',
    icon: 'favorite',
  },
  {
    title: 'Listas',
    href: '/listas',
    icon: 'list',
  },
  {
    title: 'Pagamentos',
    href: '/pagamentos',
    icon: 'payments',
  },
  {
    title: 'Configurações',
    href: '/configuracoes',
    icon: 'settings',
  },
]

export const siteConfig = {
  lang: 'pt-br',
  name: 'Baita Feira',
  shortDescription: 'Feira de Serviços',
  description:
    'MF Peças e Acessórios é sua loja especializada em peças e acessórios para motos, oferecemos uma ampla variedade de itens de alta qualidade e diversidade.',
  url: 'https://baitafeira.com.br',
  ogImage: 'https://baitafeira.com.br/opengraph-image.png',
  socialLinks,
  keywords: ['Supermercado', 'Feira', 'Marketplace'],
  mainNav,
  footerNav: [
    {
      title: 'Atendimento',
      items: [
        {
          title: 'Como Comprar',
          href: '/como-comprar',
        },
        {
          title: 'Cadastre sua loja',
          href: '/cadastre-sua-loja',
        },
        {
          title: 'Sugestões de Lojas',
          href: '/sugestoes-de-lojas',
        },
        {
          title: 'Fale Conosco',
          href: '/fale-conosco',
        },
        {
          title: 'Política de Privacidade',
          href: '/privacidade',
        },
        {
          title: 'Termos de Uso',
          href: '/termos',
        },
      ],
    },
    {
      title: 'Nossas Redes',
      items: [
        {
          title: 'Instagram',
          href: socialLinks.instagram,
          external: true,
        },
        {
          title: 'Facebook',
          href: socialLinks.facebook,
          external: true,
        },
        {
          title: 'Whatsapp',
          href: socialLinks.whatsapp,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
}

export const defaultStoreCity = {
  store: {
    store_id: 'cm1tjxurb0000hk39fzq7o8ik',
    store_name: 'Jeff Bank',
  },
  city_id: 'Várzea Alegre',
}
