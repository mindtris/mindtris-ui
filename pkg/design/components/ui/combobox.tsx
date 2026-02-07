/**
 * Combobox: Searchable select (Popover + Command pattern).
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: Popover + Command for searchable dropdown.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface ComboboxOption<T extends string = string> {
  value: T
  label: string
  disabled?: boolean
}

export interface ComboboxProps<T extends string = string> {
  /** Controlled value. */
  value?: T
  /** Callback when selection changes. */
  onChange?: (value: T) => void
  /** Options to display. */
  options: readonly ComboboxOption<T>[]
  /** Placeholder when nothing selected. */
  placeholder?: string
  /** Search input placeholder. */
  searchPlaceholder?: string
  /** Empty state message when no results. */
  emptyMessage?: string
  /** Whether the combobox is disabled. */
  disabled?: boolean
  /** Whether to allow clearing (empty value). When true, adds an explicit "Clear" option. */
  clearable?: boolean
  /** Label for the clear option when clearable. Default: "Clear" */
  clearLabel?: string
  /** Optional class for the trigger button. */
  triggerClassName?: string
  /** Optional class for the popover content. */
  contentClassName?: string
  /** Full width trigger. */
  fullWidth?: boolean
}

export function Combobox<T extends string = string>({
  value,
  onChange,
  options,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  disabled = false,
  clearable = false,
  clearLabel = "Clear",
  triggerClassName,
  contentClassName,
  fullWidth = false,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((o) => o.value === value)

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      const isClear = clearable && (currentValue === "__clear__" || currentValue === clearLabel)
      const next = isClear ? undefined : (currentValue as T)
      onChange?.(next as T)
      setOpen(false)
    },
    [clearable, clearLabel, onChange]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={selected?.label ?? placeholder}
          disabled={disabled}
          className={cn(
            "justify-between font-normal",
            fullWidth && "w-full",
            !value && "text-muted-foreground",
            value && "border-foreground",
            triggerClassName
          )}
        >
          <span className="truncate">{selected?.label ?? placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[--radix-popover-trigger-width] p-0", contentClassName)}
        align="start"
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {clearable && value ? (
                <CommandItem value="__clear__" onSelect={() => handleSelect("__clear__")}>
                  <span className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                  {clearLabel}
                </CommandItem>
              ) : null}
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.label}
                  disabled={opt.disabled}
                  onSelect={() => handleSelect(opt.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
