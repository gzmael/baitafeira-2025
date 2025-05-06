import { type VariantProps, cva } from 'class-variance-authority'

export const inputVariants = cva(
  'flex w-full rounded-md border border-input border-slate-200 border-solid bg-background px-3 py-2 text-foreground text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground invalid:border-destructive invalid:text-destructive focus:invalid:border-destructive/50 focus:invalid:ring-destructive/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-foreground/10 disabled:opacity-50',
  {
    variants: {
      radii: {
        md: 'rounded-md',
      },
      scale: {
        sm: 'h-8',
        md: 'h-9',
      },
    },
    defaultVariants: {
      radii: 'md',
      scale: 'md',
    },
  }
)

export type InputVariantProps = VariantProps<typeof inputVariants>
