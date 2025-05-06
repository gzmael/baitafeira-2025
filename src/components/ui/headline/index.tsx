import type { ElementType, HTMLAttributes } from 'react'

import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

import { type HeadlineVariantTypes, headlineVariants } from './styles'

export type HeadlineProps = HTMLAttributes<HTMLHeadingElement> &
  HeadlineVariantTypes & {
    asChild?: boolean
    as?: ElementType
  }

const Headline = ({
  variant,
  size,
  className,
  as: Comp = 'h2',
  asChild,
  ...props
}: HeadlineProps) => {
  const CompFinal = asChild ? Slot : Comp
  return (
    <CompFinal
      className={cn(headlineVariants({ variant, size, className }))}
      {...props}
    />
  )
}

Headline.displayName = 'Headline'

export { Headline }
