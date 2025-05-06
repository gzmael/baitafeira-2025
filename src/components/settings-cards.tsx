import { cn } from '@/lib/utils'

import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import { Headline } from './ui/headline'
import { Separator } from './ui/separator'

interface SettingsCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  action?: React.ReactNode
  className?: string
}
export const SettingsCard = ({
  title,
  description,
  children,
  className,
  action,
}: SettingsCardProps) => {
  return (
    <Card className={cn('w-full rounded-md', className)}>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center justify-between">
          <Headline as="h2" variant="black">
            {title}
          </Headline>
          {action}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <Separator className="mb-4" />
        {children}
      </CardContent>
    </Card>
  )
}
