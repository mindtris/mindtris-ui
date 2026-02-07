"use client"

import React from 'react'
import { cn } from '../../lib/utils'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-8 text-xs px-2.5 rounded-md',
  md: 'h-10 text-sm px-3 rounded-lg',
  lg: 'h-12 text-base px-4 rounded-lg',
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = 'md', ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          'w-full rounded-lg border border-input bg-field text-sm text-foreground leading-5 shadow-none',
          // Native file inputs vary by browser; for consistent UI, prefer `FileInput`.
          // We only style the selector button here (token-driven).
          type === 'file' &&
            'cursor-pointer file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-background file:text-muted-foreground file:text-xs file:font-medium',
          'placeholder:text-muted-foreground',
          'hover:border-border/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40',
          'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed',
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

/**
 * Radio
 * Token-driven radio button component
 */
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="radio"
        className={cn(
          'h-4 w-4 rounded-full border-input bg-field text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Radio.displayName = 'Radio'
