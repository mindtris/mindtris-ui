"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "../../lib/utils"
import { createVariants } from "../../lib/variant-utils"

export type SwitchSize = "sm" | "md" | "lg"

export type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  "size"
> & {
  size?: SwitchSize
}

const switchRootVariants = createVariants({
  base: [
    "group relative inline-flex shrink-0 items-center rounded-full overflow-hidden outline-none transition-colors",
    "border border-transparent",
    "bg-muted data-[state=checked]:bg-primary",
    "hover:data-[state=unchecked]:bg-border",
    "focus-visible:ring-0 focus-visible:border-foreground/40",
    "data-[state=checked]:border-transparent",
    "disabled:pointer-events-none disabled:opacity-70 disabled:border-transparent disabled:data-[state=unchecked]:bg-muted",
    "aria-invalid:data-[state=unchecked]:bg-destructive/10",
  ].join(" "),
  variants: {
    size: {
      sm: "h-4 w-7",
      md: "h-5 w-9",
      lg: "h-6 w-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const thumbSizeMap: Record<SwitchSize, string> = {
  sm: "size-3 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-[14px]",
  md: "size-4 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-[18px]",
  lg: "size-5 data-[state=unchecked]:translate-x-1 data-[state=checked]:translate-x-[26px]",
}

/**
 * Switch. Token-driven. Toggle between checked and unchecked.
 * Use with Label for accessibility; supports size (sm, md, lg), disabled, aria-invalid.
 */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size = "md", ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    data-size={size}
    className={cn(switchRootVariants({ size }), className)}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block rounded-full bg-background shadow-sm ring-0 transition-transform group-data-[state=unchecked]:ring-1 group-data-[state=unchecked]:ring-border/80 group-data-[state=unchecked]:ring-inset",
        thumbSizeMap[size]
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = "Switch"
