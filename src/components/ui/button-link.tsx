'use client'

import { type HTMLAttributes, forwardRef } from 'react'

import Link, { type LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

import { buttonVariants } from './button/styles'
import type { ButtonVariantProps } from './button/styles'

type ButtonLinkProps = HTMLAttributes<HTMLAnchorElement> &
  ButtonVariantProps &
  LinkProps & {
    isExternal?: boolean
  }

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, w, radii, isExternal, ...props }, ref) => {
    return (
      <Link
        target={isExternal ? '_blank' : undefined}
        className={cn(buttonVariants({ variant, size, w, radii, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

ButtonLink.displayName = 'ButtonLink'

export { ButtonLink }
