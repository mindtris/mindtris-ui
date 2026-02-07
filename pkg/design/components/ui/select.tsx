"use client"

import React from 'react'
import { cn } from '../../lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Select styled to match Input — single design system control for dropdowns.
 * Use across theme customizer (preset, fonts, etc.) for consistency.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-lg border border-input bg-field px-3 py-2 text-sm shadow-none transition-colors',
          'hover:border-border/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = 'Select'
