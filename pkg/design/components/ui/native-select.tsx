/**
 * Native Select: Styled native <select> when Radix Select is not needed.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Simple, accessible, token-driven. Use for basic selects without custom dropdown.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"

export type NativeSelectSize = "sm" | "default" | "lg"

const sizeClasses: Record<NativeSelectSize, string> = {
  sm: "h-8 text-xs px-2.5",
  default: "h-10 text-sm px-3",
  lg: "h-12 text-base px-4",
}

export interface NativeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Size variant. */
  size?: NativeSelectSize
  /** Whether the field has an error. */
  invalid?: boolean
  /** Full width. */
  fullWidth?: boolean
}

export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      className,
      size = "default",
      invalid = false,
      fullWidth = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative inline-flex", fullWidth && "w-full")}>
        <select
          ref={ref}
          data-slot="native-select"
          data-invalid={invalid ? "true" : undefined}
          data-size={size}
          className={cn(
            "flex w-full appearance-none rounded-lg border bg-field pr-9 shadow-none transition-colors",
            sizeClasses[size],
            "border-input text-foreground",
            "hover:border-border/80",
            "focus:outline-none focus:ring-0 focus:border-foreground/40",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "invalid:border-destructive invalid:focus:border-destructive",
            invalid && "border-destructive focus:border-destructive",
            className
          )}
          aria-invalid={invalid}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </div>
    )
  }
)
NativeSelect.displayName = "NativeSelect"
