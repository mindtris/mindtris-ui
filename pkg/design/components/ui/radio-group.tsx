"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "../../lib/utils"
import { createVariants } from "../../lib/variant-utils"

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>

export type RadioGroupSize = "sm" | "md" | "lg"

export type RadioGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  "size"
> & {
  size?: RadioGroupSize
}

const radioGroupItemVariants = createVariants({
  base: [
    "relative aspect-square shrink-0 rounded-full border-2 border-input bg-field outline-none",
    "hover:border-border/80",
    "focus-visible:ring-0 focus-visible:border-foreground/40",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=checked]:border-primary data-[state=checked]:text-primary",
    "aria-invalid:border-destructive",
    "data-[state=checked]:aria-invalid:border-destructive data-[state=checked]:aria-invalid:text-destructive",
    "transition-colors",
  ].join(" "),
  variants: {
    size: {
      sm: "size-3",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const dotSizeMap: Record<RadioGroupSize, string> = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
}

/**
 * RadioGroup. Token-driven. Single choice from a set of options.
 */
export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    data-slot="radio-group"
    className={cn("grid gap-3", className)}
    {...props}
  />
))
RadioGroup.displayName = "RadioGroup"

/**
 * RadioGroupItem. Token-driven. Border and focus match Input/Checkbox.
 * Supports size: sm (12px), md (16px), lg (20px).
 */
export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size = "md", ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    data-slot="radio-group-item"
    data-size={size}
    className={cn(radioGroupItemVariants({ size }), className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator
      data-slot="radio-group-indicator"
      className="absolute inset-0 flex items-center justify-center"
    >
      <Circle
        className={cn("fill-current", dotSizeMap[size])}
        strokeWidth={0}
      />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = "RadioGroupItem"
