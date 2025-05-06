'use client'

import {
  type ChangeEventHandler,
  type ComponentProps,
  type PointerEvent,
  useRef,
  useState,
} from 'react'

import NumberFlow from '@number-flow/react'

import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

import type { InputVariantProps } from '../ui/input/styles'
import { Button } from './button'
import { Input } from './input'

export type InputQuantityProps = Omit<ComponentProps<'input'>, 'onChange'> &
  InputVariantProps & {
    value: number
    min?: number
    max?: number
    onChange?: (value: number) => void
  }

const InputQuantity = ({
  value,
  min = 1,
  max = Number.POSITIVE_INFINITY,
  onChange,
  className,
  radii,
  scale,
  ...props
}: InputQuantityProps) => {
  const defaultValue = useRef(value ?? 0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [animated, setAnimated] = useState(true)
  const [showCaret, setShowCaret] = useState(true)

  const handleInput: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: el,
  }) => {
    setAnimated(false)
    let next = value
    if (el.value === '') {
      next = defaultValue.current
    } else {
      const num = Number.parseInt(el.value)
      if (
        !Number.isNaN(num) &&
        (min ?? 0) <= num &&
        (max ?? Number.POSITIVE_INFINITY) >= num
      )
        next = num
    }
    el.value = String(next)
    onChange?.(next)
  }
  const handlePointerDown =
    (diff: number) => (event: PointerEvent<HTMLButtonElement>) => {
      setAnimated(true)
      if (event.pointerType === 'mouse' && inputRef.current) {
        event?.preventDefault()
        inputRef.current.focus()
      }
      const newVal = Math.min(
        Math.max(value + diff, min ?? 0),
        max ?? Number.POSITIVE_INFINITY
      )
      onChange?.(newVal)
    }

  return (
    <div className="group flex items-stretch">
      <Button
        aria-hidden="true"
        tabIndex={-1}
        disabled={min != null && value <= min}
        onPointerDown={handlePointerDown(-1)}
        variant="numberButton"
        size="icon"
        className=" size-8 rounded-r-none border-r-0"
      >
        <Icons.remove
          className="size-3"
          absoluteStrokeWidth
          strokeWidth={3.5}
        />
        <span className="sr-only">Remover um item</span>
      </Button>
      <div className="-space-x-4 relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
        <Input
          ref={inputRef}
          className={cn(
            showCaret ? 'caret-primary' : 'caret-transparent',
            'spin-hide h-8 w-16 rounded-none text-center text-transparent shadow-sm outline-none ',
            className
          )}
          radii={radii}
          scale={scale}
          style={{ fontKerning: 'none' }}
          type="number"
          min={min}
          step={1}
          autoComplete="off"
          inputMode="numeric"
          max={max}
          value={value}
          onInput={handleInput}
          {...props}
        />
        <NumberFlow
          value={value ?? 0}
          format={{ useGrouping: false }}
          aria-hidden="true"
          animated={animated}
          onAnimationsStart={() => setShowCaret(false)}
          onAnimationsFinish={() => setShowCaret(true)}
          className="grid-area:overlap pointer-events-none text-center"
          willChange
        />
      </div>
      <Button
        aria-hidden="true"
        tabIndex={-1}
        disabled={max != null && value >= max}
        onPointerDown={handlePointerDown(1)}
        variant="numberButton"
        size="icon"
        className="size-8 rounded-l-none border-l-0"
      >
        <Icons.add className="size-3" absoluteStrokeWidth strokeWidth={3.5} />
        <span className="sr-only">Adicionar um item</span>
      </Button>
    </div>
  )
}

InputQuantity.displayName = 'InputQuantity'

export { InputQuantity }
