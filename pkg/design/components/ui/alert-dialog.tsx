/**
 * Alert Dialog: Modal confirmation dialogs.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy, no API calls.
 * - Tokens-only: semantic token classes only.
 * - Composition: title/description slots, Action/Cancel buttons.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "../../lib/utils"

export type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>
export type AlertDialogTriggerProps = React.ComponentProps<typeof AlertDialogPrimitive.Trigger>
export type AlertDialogPortalProps = React.ComponentProps<typeof AlertDialogPrimitive.Portal>
export type AlertDialogOverlayProps = React.ComponentProps<typeof AlertDialogPrimitive.Overlay>
export type AlertDialogContentProps = React.ComponentProps<typeof AlertDialogPrimitive.Content>
export type AlertDialogHeaderProps = React.ComponentProps<"div">
export type AlertDialogFooterProps = React.ComponentProps<"div">
export type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialogPrimitive.Title>
export type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogPrimitive.Description>
export type AlertDialogActionProps = React.ComponentProps<typeof AlertDialogPrimitive.Action> & {
  variant?: "default" | "destructive"
} & {
  variant?: "default" | "destructive"
}
export type AlertDialogCancelProps = React.ComponentProps<typeof AlertDialogPrimitive.Cancel>

export function AlertDialog({ ...props }: AlertDialogProps) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

export function AlertDialogTrigger({ ...props }: AlertDialogTriggerProps) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
}

export function AlertDialogPortal({ ...props }: AlertDialogPortalProps) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
}

export function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
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

export function AlertDialogContent({ className, children, ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-[81] grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4",
          "rounded-xl border border-border bg-card text-card-foreground shadow-xl",
          "p-6 sm:max-w-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  )
}

export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
}

export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  )
}

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export function AlertDialogAction({
  className,
  variant = "default",
  ...props
}: AlertDialogActionProps) {
  return (
    <AlertDialogPrimitive.Action
      data-slot="alert-dialog-action"
      data-variant={variant}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "default"
          ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/90"
          : "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        className
      )}
      {...props}
    />
  )
}

export function AlertDialogCancel({ className, ...props }: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Cancel
      data-slot="alert-dialog-cancel"
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-none transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:mt-0",
        className
      )}
      {...props}
    />
  )
}
