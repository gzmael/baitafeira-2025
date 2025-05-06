import type { ReactNode } from 'react'

import { Alert, AlertDescription, AlertTitle } from './alert'
import type { AlertVariantProps } from './alert/styles'
import { Icons } from './icons'

interface AlertCardProps {
  title: string
  description: string
  icon?: keyof typeof Icons
  variant?: AlertVariantProps['variant']
  children?: ReactNode
}

export function AlertCard({
  title,
  description,
  icon,
  variant = 'default',
  children,
}: AlertCardProps) {
  const Icon = icon ? Icons[icon] : null

  return (
    <Alert variant={variant} className="w-full">
      {Icon && <Icon className="size-6" />}
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        {children}
      </div>
    </Alert>
  )
}
