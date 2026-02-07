"use client"

import * as React from 'react'
import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

/** Token-driven trigger style: matches Input (flat, no raised shadow) for consistency with time/other inputs. */
const triggerButtonClass =
  'inline-flex items-center gap-2 rounded-lg border border-input bg-field px-3 py-2 text-left text-sm font-normal text-foreground shadow-none transition-colors hover:border-border/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40 disabled:pointer-events-none disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0'

export interface DatePickerProps {
  /** Selected date (controlled). */
  value?: Date
  /** Called when date is selected. */
  onSelect?: (date: Date | undefined) => void
  /** Placeholder when no date selected. */
  placeholder?: string
  /** Disabled state. */
  disabled?: boolean
  /** Trigger button class. */
  className?: string
  /** Calendar props (e.g. disabled dates). mode/selected/onSelect/required are controlled by this component. */
  calendarProps?: Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect' | 'required'>
}

/**
 * DatePicker
 * Single-date picker: Popover + Calendar. Token-driven, minimal state.
 * Reusable component; no business logic. Composition: PopoverTrigger + Calendar.
 */
export function DatePicker({
  value,
  onSelect,
  placeholder = 'Pick a date',
  disabled = false,
  className,
  calendarProps,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(triggerButtonClass, !value && 'text-muted-foreground', className)}
        >
          <CalendarIcon />
          {value ? format(value, 'PPP') : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" collisionPadding={16} avoidCollisions>
        <Calendar
          mode="single"
          selected={value}
          onSelect={onSelect}
          initialFocus
          {...calendarProps}
          required={false}
        />
      </PopoverContent>
    </Popover>
  )
}

export interface DatePickerRangeProps {
  /** Selected range (controlled). */
  value?: DateRange
  /** Called when range is selected. */
  onSelect?: (range: DateRange | undefined) => void
  /** Placeholder when no range selected. */
  placeholder?: string
  /** Disabled state. */
  disabled?: boolean
  /** Trigger button class. */
  className?: string
  /** Calendar props. mode/selected/onSelect/required are controlled by this component. */
  calendarProps?: Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect' | 'required'>
}

/**
 * DatePickerRange
 * Range date picker: Popover + Calendar in range mode. Token-driven, minimal state.
 */
export function DatePickerRange({
  value,
  onSelect,
  placeholder = 'Pick a date range',
  disabled = false,
  className,
  calendarProps,
}: DatePickerRangeProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          shape="rounded"
          disabled={disabled}
          className={cn(
            'w-full min-w-[15rem] justify-start text-left font-normal rounded-lg shadow-none border-input bg-field hover:border-border/80 focus-visible:ring-0 focus-visible:border-foreground/40',
            !value?.from && 'text-muted-foreground',
            className
          )}
          leadingIcon={<CalendarIcon className="size-4" />}
        >
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, 'LLL dd, y')} – {format(value.to, 'LLL dd, y')}
              </>
            ) : (
              format(value.from, 'LLL dd, y')
            )
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" collisionPadding={16} avoidCollisions>
        <Calendar
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onSelect}
          initialFocus
          {...calendarProps}
          required={false}
        />
      </PopoverContent>
    </Popover>
  )
}
