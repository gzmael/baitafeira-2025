'use client'

import type { Option } from '@/contracts/commons'
import { cn } from '@/lib/utils'

import { Badge } from './badge'
import { Button } from './button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command'
import { Icons } from './icons'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Separator } from './separator'
import { Text } from './text'

interface InputTagsProps {
  title: string
  options: Option[]
  selectedValues: string[]
  setSelectedValues: (values: string[]) => void
  onAddTag: (value: string) => void
  disabled?: boolean
  search: string
  setSearch: (value: string) => void
}

export const InputTags = ({
  title,
  options,
  selectedValues,
  setSelectedValues,
  onAddTag,
  disabled,
  search,
  setSearch,
}: InputTagsProps) => {
  const selectedValuesSet = new Set(selectedValues)

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          aria-label="Filter rows"
          variant="outline"
          size="sm"
          className="h-8 justify-start border-dashed"
        >
          <Icons.addCircle className="mr-2 size-4" aria-hidden="true" />
          {title}
          {selectedValues.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValuesSet.size > 4 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal text-xs"
                  >
                    {selectedValuesSet.size} items
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValuesSet.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder={title}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <Text scale="sm" variant="neutral">
                  Nenhum resultado encontrado.
                </Text>
                {search && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => {
                      selectedValuesSet.add(search)
                      setSelectedValues(
                        selectedValuesSet.size
                          ? Array.from(selectedValuesSet)
                          : []
                      )
                      setSearch('')
                      onAddTag(search)
                    }}
                  >
                    Adicionar Tag
                  </Button>
                )}
              </div>
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValuesSet.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValuesSet.delete(option.value)
                      } else {
                        selectedValuesSet.add(option.value)
                      }
                      setSelectedValues(
                        selectedValuesSet.size
                          ? Array.from(selectedValuesSet)
                          : []
                      )
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Icons.check
                        className={cn('size-4')}
                        aria-hidden="true"
                      />
                    </div>
                    {option.icon && (
                      <option.icon
                        className="mr-2 size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValuesSet.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedValues([])}
                    className="justify-center gap-1 text-center"
                  >
                    <Icons.close className="mr-2 size-4" aria-hidden="true" />
                    Limpar
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
