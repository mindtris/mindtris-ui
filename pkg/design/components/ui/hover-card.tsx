"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "../../lib/utils"

export type HoverCardProps = React.ComponentProps<typeof HoverCardPrimitive.Root>
export type HoverCardTriggerProps = React.ComponentProps<typeof HoverCardPrimitive.Trigger>
export type HoverCardContentProps = React.ComponentProps<typeof HoverCardPrimitive.Content>

export function HoverCard({ ...props }: HoverCardProps) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

export function HoverCardTrigger({ ...props }: HoverCardTriggerProps) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
}

export function HoverCardContent({ className, align = "center", sideOffset = 8, ...props }: HoverCardContentProps) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-[9999] w-72 rounded-lg border border-border bg-popover text-popover-foreground p-4 shadow-lg outline-hidden",
          "origin-[--radix-hover-card-content-transform-origin]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

