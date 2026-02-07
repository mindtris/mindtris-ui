"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"

export type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>
export type SheetTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>
export type SheetPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>
export type SheetCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>
export type SheetOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay>
export type SheetContentSide = "top" | "right" | "bottom" | "left"
export type SheetContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: SheetContentSide
  /** Whether to render the top-right close button. */
  showCloseButton?: boolean
}
export type SheetHeaderProps = React.ComponentProps<"div">
export type SheetFooterProps = React.ComponentProps<"div">
export type SheetTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>
export type SheetDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>

export function Sheet({ ...props }: SheetProps) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

export function SheetTrigger({ ...props }: SheetTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

export function SheetPortal({ ...props }: SheetPortalProps) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

export function SheetClose({ ...props }: SheetCloseProps) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />
}

export function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        // Overlay should dim the whole page, including the sticky header (header uses z-50).
        "fixed inset-0 z-[80]",
        "bg-foreground/20",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

export function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  const sideClasses: Record<SheetContentSide, string> = {
    // Inset sheets (do not touch window edges).
    right: "top-2 bottom-2 right-2 w-[min(94vw,32rem)] max-h-[calc(100vh-1rem)] rounded-xl",
    left: "top-2 bottom-2 left-2 w-[min(94vw,32rem)] max-h-[calc(100vh-1rem)] rounded-xl",
    // Full-width (but inset) sheets for top/bottom.
    top: "top-2 left-2 right-2 w-auto max-h-[calc(100vh-1rem)] rounded-xl",
    bottom: "bottom-2 left-2 right-2 w-auto max-h-[calc(100vh-1rem)] rounded-xl min-h-[min(70vh,34rem)]",
  }

  const motionClasses: Record<SheetContentSide, string> = {
    right: "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
    left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
    top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
    bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
  }

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed z-[81] flex flex-col gap-4",
          "overflow-hidden",
          "border border-border bg-card text-card-foreground shadow-xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:duration-300 data-[state=open]:duration-500",
          motionClasses[side],
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="sheet-close"
            className={cn(
              "absolute right-4 top-4 inline-flex items-center justify-center",
              "h-8 w-8 rounded-md",
              "cursor-pointer",
              "text-muted-foreground hover:text-foreground hover:bg-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:pointer-events-none disabled:cursor-not-allowed"
            )}
          >
            <X className="h-4 w-4" aria-hidden />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return <div data-slot="sheet-header" className={cn("flex flex-col gap-1.5 p-6 pb-0", className)} {...props} />
}

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col-reverse gap-2 p-6 pt-0 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  )
}

export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

