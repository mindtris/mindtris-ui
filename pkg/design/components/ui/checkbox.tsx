"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"

import { cn } from "../../lib/utils"

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

/**
 * Checkbox. Token-driven. Check when checked; minus when indeterminate.
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "group peer h-4 w-4 shrink-0 rounded border border-input bg-field outline-none",
      "hover:border-border/80",
      "focus-visible:ring-0 focus-visible:border-foreground/40",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
      "disabled:pointer-events-none disabled:opacity-50",
      "transition-colors",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current"
    >
      <Check className="h-3 w-3 group-data-[state=indeterminate]:hidden" strokeWidth={2.5} />
      <Minus className="h-3 w-3 group-data-[state=checked]:hidden" strokeWidth={2.5} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = "Checkbox"
