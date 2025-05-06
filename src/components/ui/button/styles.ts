import { type VariantProps, cva } from 'class-variance-authority'

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        mutedGhost: 'hover:bg-muted',
        navsidebar: 'w-full p-0 gap-2 justify-center',
        destructiveLink:
          'bg-transparent text-destructive hover:text-destructive/80',
        blackLink:
          'bg-transparent text-black hover:text-primary text-sm font-normal',
        footerLink:
          'bg-transparent text-primary-foreground hover:text-background text-sm font-normal',
        numberButton:
          'border border-input bg-background shadow-sm hover:bg-primary hover:text-background hover:border-primary',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        xs: 'h-7 rounded-md px-2 text-xs',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
      radii: {
        none: 'rounded-none',
        xs: 'rounded',
        sm: 'rounded-md',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        full: 'rounded-full',
      },
      w: {
        full: 'w-full',
        half: 'w-3/4',
        auto: 'w-auto',
      },
      isActive: {
        true: 'is-active',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      w: 'auto',
      radii: 'sm',
    },
    compoundVariants: [
      {
        variant: 'navsidebar',
        size: 'default',
        className: 'p-0',
      },
      {
        isActive: true,
        variant: 'outline',
        className: 'bg-accent text-accent-foreground',
      },
      {
        variant: 'destructive',
        size: 'icon',
        className:
          'p-0 size-9 bg-transparent text-destructive hover:bg-transparent shadow-none',
      },
      {
        variant: 'default',
        size: 'icon',
        className:
          'p-0 size-9 bg-transparent text-primary hover:bg-transparent shadow-none',
      },
    ],
  }
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
