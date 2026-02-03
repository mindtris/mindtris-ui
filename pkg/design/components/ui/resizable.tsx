"use client"

import * as React from "react"
import { Group, Panel, Separator } from "react-resizable-panels"
import { GripVertical } from "lucide-react"

import { cn } from "../../lib/utils"

export type ResizablePanelGroupProps = React.ComponentPropsWithoutRef<
  typeof Group
> & {
  /**
   * Alias for `orientation`.
   * Kept for familiarity with other design systems.
   */
  direction?: "horizontal" | "vertical"
}

export type ResizablePanelProps = React.ComponentPropsWithoutRef<typeof Panel>

export type ResizableHandleProps = React.ComponentPropsWithoutRef<typeof Separator> & {
  /** Renders a visible grab handle affordance. */
  withHandle?: boolean
}

export function ResizablePanelGroup({
  className,
  direction = "horizontal",
  orientation: orientationProp,
  ...props
}: ResizablePanelGroupProps) {
  const orientation = orientationProp ?? direction

  return (
    <Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      orientation={orientation}
      {...props}
    />
  )
}

export function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return <Panel data-slot="resizable-panel" className={cn(className)} {...props} />
}

export const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof Separator>,
  ResizableHandleProps
>(({ className, withHandle = false, ...props }, ref) => {
  return (
    <Separator
      elementRef={ref}
      data-slot="resizable-handle"
      className={cn(
        "relative flex items-center justify-center bg-border",
        // react-resizable-panels sets `data-orientation` on Separator
        "data-[orientation=vertical]:w-px data-[orientation=vertical]:h-full",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        className
      )}
      {...props}
    >
      {withHandle ? (
        <div
          data-slot="resizable-handle-grip"
          className={cn(
            "z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-card",
            "data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-4"
          )}
        >
          <GripVertical
            className={cn(
              "h-3 w-3 text-muted-foreground",
              "data-[orientation=horizontal]:rotate-90"
            )}
            aria-hidden
          />
        </div>
      ) : null}
    </Separator>
  )
})
ResizableHandle.displayName = "ResizableHandle"

