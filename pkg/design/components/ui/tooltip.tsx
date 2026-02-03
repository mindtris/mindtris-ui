"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../lib/utils"

export type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>
export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>
export type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>
export type TooltipVariant = "default" | "primary" | "secondary" | "tertiary"
export type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & {
  /**
   * Visual variant for token-driven tooltip colors.
   * Use `className` for fine-grained tweaks (e.g. max-width, whitespace).
   */
  variant?: TooltipVariant
}

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  variant = "default",
  children,
  ...props
}: TooltipContentProps) {
  const variantClasses: Record<TooltipVariant, string> = {
    default: "bg-foreground text-background",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    // For tertiary, add a border so it reads on light themes.
    tertiary: "bg-card text-foreground border border-border",
  }

  const arrowVariantClasses: Record<TooltipVariant, string> = {
    default: "bg-foreground fill-foreground",
    primary: "bg-primary fill-primary",
    secondary: "bg-secondary fill-secondary",
    tertiary: "bg-card fill-card",
  }

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-[9999] w-fit origin-[--radix-tooltip-content-transform-origin] rounded-lg px-3 py-2 text-xs leading-5 whitespace-nowrap",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
        {/* Shadcn-style rotated-square arrow (no seam). */}
        <TooltipPrimitive.Arrow
          className={cn(
            "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
            arrowVariantClasses[variant]
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

