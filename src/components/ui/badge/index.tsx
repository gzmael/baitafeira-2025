import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { type ComponentProps, forwardRef } from 'react'
import { type BadgeVariantProps, badgeVariants } from './styles'

export type BadgeProps = ComponentProps<'span'> &
  BadgeVariantProps & { asChild?: boolean }

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span'
    return (
      <Comp
        data-slot="badge"
        className={cn(badgeVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
