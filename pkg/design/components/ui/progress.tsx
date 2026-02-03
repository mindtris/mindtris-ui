"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../../lib/utils"

export type ProgressVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "accent"
  | "destructive"
  | "muted"
  | "foreground"

export type ProgressSize = "sm" | "md" | "lg"

export type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  /** 0-100 */
  value?: number | null
  variant?: ProgressVariant
  size?: ProgressSize
}

const sizeClasses: Record<ProgressSize, string> = {
  // Make the visual differences obvious in docs.
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
}

const indicatorClasses: Record<ProgressVariant, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  // "Tertiary" in this system is a subtle surface + primary accent.
  // For progress, we interpret that as a subtle primary fill.
  tertiary: "bg-primary/40",
  accent: "bg-accent",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground",
  foreground: "bg-foreground",
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = "primary", size = "md", ...props }, ref) => {
  const isIndeterminate = value === null
  const clamped = Math.max(0, Math.min(100, Number(value ?? 0)))

  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      value={isIndeterminate ? null : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={isIndeterminate ? undefined : clamped}
      aria-valuetext={isIndeterminate ? "Loading" : undefined}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-muted",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full transition-[width] duration-200 ease-out rounded-full",
          indicatorClasses[variant],
          isIndeterminate ? "animate-pulse" : undefined
        )}
        style={{ width: `${isIndeterminate ? 40 : clamped}%` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = "Progress"

