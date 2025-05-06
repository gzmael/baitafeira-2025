import { type ComponentProps, useState } from 'react'

import { type MaskitoOptions, maskitoTransform } from '@maskito/core'
import { maskitoWithPlaceholder } from '@maskito/kit'
import { useMaskito } from '@maskito/react'

import { cn } from '@/lib/utils'

import { type InputVariantProps, inputVariants } from './input/styles'

type InputMaskProps = {
  initialValue?: string
  onCallback?: (value: string) => void
  options: MaskitoOptions
  defaultValue?: string
  maskitoPlaceholder?: string
}

export type InputProps = ComponentProps<'input'> &
  InputVariantProps &
  InputMaskProps

const InputMask = ({
  className,
  onCallback,
  options,
  radii,
  scale,
  maskitoPlaceholder,
  defaultValue,
  ...props
}: InputProps) => {
  const [value, setValue] = useState(
    maskitoTransform(defaultValue ?? '', options)
  )
  const maskedInputRef = useMaskito({
    options: {
      ...options,
      ...maskitoWithPlaceholder(maskitoPlaceholder ?? ''),
    },
  })

  function handleChange(value: string) {
    onCallback?.(value)
  }

  return (
    <input
      {...props}
      ref={maskedInputRef}
      className={cn(inputVariants({ radii, scale, className }))}
      value={value}
      onInput={(event) => {
        setValue(event.currentTarget.value)
        handleChange(event.currentTarget.value)
      }}
    />
  )
}

InputMask.displayName = 'InputMask'

export { InputMask }
