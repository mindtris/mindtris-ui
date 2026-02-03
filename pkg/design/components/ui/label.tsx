"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

/**
 * Label
 * Small, token-driven label primitive for form controls.
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        data-slot="label"
        className={cn(
          "text-sm font-medium leading-none text-foreground",
          // When paired with form controls using `peer` (e.g. checkbox/radio inputs)
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

