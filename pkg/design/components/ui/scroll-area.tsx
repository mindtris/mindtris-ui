"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "../../lib/utils"

export type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
export type ScrollAreaViewportProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
export type ScrollBarProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>

function isHorizontalScrollBar(child: React.ReactNode): boolean {
  return (
    React.isValidElement(child) &&
    child.type === ScrollBar &&
    (child.props as { orientation?: string }).orientation === "horizontal"
  )
}

/**
 * ScrollArea
 * Token-styled scroll container with Radix primitives. Vertical scroll by default.
 * Add <ScrollBar orientation="horizontal" /> as a child for horizontal scroll (shadcn-style composition).
 */
export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => {
  const childList = React.Children.toArray(children)
  const viewportChildren = childList.filter((c) => !isHorizontalScrollBar(c))
  const horizontalBars = childList.filter((c) => isHorizontalScrollBar(c))
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full rounded-[inherit]"
      >
        {viewportChildren}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      {horizontalBars}
      <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  )
})
ScrollArea.displayName = "ScrollArea"

export const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    data-slot="scroll-area-scrollbar"
    orientation={orientation}
    className={cn(
      "flex touch-none select-none p-0.5 transition-colors",
      orientation === "vertical"
        ? "h-full w-2 border-l border-l-transparent"
        : "h-2 flex-col border-t border-t-transparent",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb
      data-slot="scroll-area-thumb"
      className={cn(
        "relative flex-1 rounded-full bg-border hover:bg-muted-foreground/50"
      )}
    />
  </ScrollAreaPrimitive.Scrollbar>
))
ScrollBar.displayName = "ScrollBar"

