"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "../../lib/utils"

export type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>
export type DrawerTriggerProps = React.ComponentProps<typeof DrawerPrimitive.Trigger>
export type DrawerPortalProps = React.ComponentProps<typeof DrawerPrimitive.Portal>
export type DrawerCloseProps = React.ComponentProps<typeof DrawerPrimitive.Close>
export type DrawerOverlayProps = React.ComponentProps<typeof DrawerPrimitive.Overlay>
export type DrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Content> & {
  /** Whether to show the top-right close button (matches Sheet). */
  showCloseButton?: boolean
}
export type DrawerHeaderProps = React.ComponentProps<"div">
export type DrawerFooterProps = React.ComponentProps<"div">
export type DrawerTitleProps = React.ComponentProps<typeof DrawerPrimitive.Title>
export type DrawerDescriptionProps = React.ComponentProps<typeof DrawerPrimitive.Description>

export function Drawer({ ...props }: DrawerProps) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

export function DrawerTrigger({ ...props }: DrawerTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

export function DrawerPortal({ ...props }: DrawerPortalProps) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

export function DrawerClose({ ...props }: DrawerCloseProps) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

export function DrawerOverlay({ className, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
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

export function DrawerContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed z-[81] flex h-auto flex-col overflow-hidden",
          "border border-border bg-card text-card-foreground shadow-xl",
          // direction variants: inset like Sheet (no edge-to-edge)
          "data-[vaul-drawer-direction=top]:top-2 data-[vaul-drawer-direction=top]:left-2 data-[vaul-drawer-direction=top]:right-2 data-[vaul-drawer-direction=top]:max-h-[calc(100vh-1rem)] data-[vaul-drawer-direction=top]:rounded-xl",
          "data-[vaul-drawer-direction=bottom]:bottom-2 data-[vaul-drawer-direction=bottom]:left-2 data-[vaul-drawer-direction=bottom]:right-2 data-[vaul-drawer-direction=bottom]:max-h-[calc(100vh-1rem)] data-[vaul-drawer-direction=bottom]:min-h-[min(70vh,34rem)] data-[vaul-drawer-direction=bottom]:rounded-xl",
          "data-[vaul-drawer-direction=right]:top-2 data-[vaul-drawer-direction=right]:bottom-2 data-[vaul-drawer-direction=right]:right-2 data-[vaul-drawer-direction=right]:w-[min(94vw,32rem)] data-[vaul-drawer-direction=right]:max-h-[calc(100vh-1rem)] data-[vaul-drawer-direction=right]:rounded-xl",
          "data-[vaul-drawer-direction=left]:top-2 data-[vaul-drawer-direction=left]:bottom-2 data-[vaul-drawer-direction=left]:left-2 data-[vaul-drawer-direction=left]:w-[min(94vw,32rem)] data-[vaul-drawer-direction=left]:max-h-[calc(100vh-1rem)] data-[vaul-drawer-direction=left]:rounded-xl",
          className
        )}
        {...props}
      >
        {/* Grab handle for bottom drawers */}
        <div className="mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
        {showCloseButton ? (
          <DrawerPrimitive.Close
            data-slot="drawer-close"
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
          </DrawerPrimitive.Close>
        ) : null}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-1.5 p-6 pb-4",
        "group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
        "md:text-left",
        className
      )}
      {...props}
    />
  )
}

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 p-6 pt-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  )
}

export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

