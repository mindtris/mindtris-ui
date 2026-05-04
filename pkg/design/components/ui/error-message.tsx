'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'

export type ErrorMessageProps = React.ComponentProps<'p'>

/**
 * ErrorMessage
 * Inline form error message with minimal gap. Use below form inputs for validation errors.
 * Consistent styling: text-xs, destructive color, mt-px for tight spacing.
 */
export const ErrorMessage = React.forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        data-slot="error-message"
        role="alert"
        className={cn('text-xs text-destructive mt-px', className)}
        {...props}
      />
    )
  }
)
ErrorMessage.displayName = 'ErrorMessage'
