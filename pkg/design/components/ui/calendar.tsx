'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { DayPicker, UI } from 'react-day-picker'

import { cn } from '../../lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/** Custom dropdown so we always render ChevronDown (lucide) and control layout. */
function CalendarDropdown(props: {
  options?: Array<{ value: number; label: string; disabled?: boolean }>
  className?: string
  components: Record<string, React.ComponentType<unknown>>
  classNames: Record<string, string>
  [key: string]: unknown
}) {
  const { options, className, components, classNames, ...selectProps } = props
  const selectedOption = options?.find(({ value }) => value === selectProps.value)
  const cssClassSelect = [classNames[UI.Dropdown], className].filter(Boolean).join(' ')
  // `react-day-picker` passes component overrides as unknown; cast to allow standard props.
  const Select = components.Select as React.ComponentType<any>
  const Option = components.Option as React.ComponentType<any>
  return (
    <span data-disabled={selectProps.disabled} className={classNames[UI.DropdownRoot]}>
      {React.createElement(Select, { className: cssClassSelect, ...selectProps }, options?.map(({ value, label, disabled }) => React.createElement(Option, { key: value, value, disabled }, label)))}
      <span className={classNames[UI.CaptionLabel]} aria-hidden="true">
        {selectedOption?.label}
        <ChevronDown className="size-3 shrink-0 opacity-40 text-muted-foreground" />
      </span>
    </span>
  )
}

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 text-foreground', className)}
      classNames={{
        months: 'relative flex flex-col sm:flex-row space-y-4 sm:space-y-0',
        month_caption: 'flex justify-center items-center h-10 min-h-[2.5rem] shrink-0 relative leading-none',
        caption_label: 'text-xs font-medium inline-flex items-center gap-2 pointer-events-none',
        dropdowns: 'flex items-center justify-center gap-2 w-full',
        dropdown_root:
          'relative flex items-center justify-center gap-2 rounded-md border border-border bg-field h-7 min-h-7 pl-2.5 pr-2 py-1 text-xs text-foreground',
        dropdown:
          'absolute inset-0 w-full h-full cursor-pointer opacity-0 appearance-none bg-transparent',
        months_dropdown: 'min-w-[5.5rem]',
        years_dropdown: 'min-w-[4.5rem]',
        nav: 'absolute left-3 right-3 top-0 flex items-center justify-between h-10 min-h-[2.5rem] pointer-events-none [&_button]:pointer-events-auto',
        button_previous:
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:opacity-100 [&_svg]:size-[7px_11px] size-7 min-h-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-50',
        button_next:
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:opacity-100 [&_svg]:size-[7px_11px] size-7 min-h-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-50',
        chevron: 'fill-current shrink-0 w-3 h-3 opacity-50 text-muted-foreground',
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-muted-foreground font-medium rounded-md w-9 text-xs',
        week: 'flex w-full mt-2',
        day: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-muted [&:has([aria-selected])]:bg-primary first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day_button:
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary hover:text-primary-foreground h-9 w-9 p-0 aria-selected:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        range_start: 'rounded-l-lg',
        range_end: 'day-range-end rounded-r-lg',
        selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-primary text-primary-foreground',
        outside: 'day-outside text-muted-foreground aria-selected:bg-primary/50 aria-selected:text-muted-foreground',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'aria-selected:bg-primary/70 aria-selected:text-primary-foreground',
        hidden: 'invisible',
        ...classNames
      }}
      components={{
        Dropdown: CalendarDropdown,
        Chevron: (props) => {
          const svgClass = cn('fill-current shrink-0', props.className)
          if (props.orientation === 'left') {
            return <svg className={svgClass} width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>
          }
          if (props.orientation === 'right') {
            return <svg className={svgClass} width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>
          }
          return null
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
