'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

/**
 * Label
 * Accessible label for form controls. Use with htmlFor + id on the control.
 * Token-driven; supports peer-disabled and group disabled state.
 * Composable: no business logic, no domain terminology.
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        data-slot="label"
        className={cn(
          'flex items-center gap-2 text-sm font-medium leading-none text-foreground select-none',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = 'Label'
