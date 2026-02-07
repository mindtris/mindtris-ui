"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"
import { useMediaQuery } from "../../hooks/use-media-query"
import { Button } from "./button"
import { Separator } from "./separator"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./drawer"

export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>
export type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>
export type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>
export type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>
export type DialogOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay>
export type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  /** Whether to render the top-right close button. */
  showCloseButton?: boolean
}
export type DialogHeaderProps = React.ComponentProps<"div">
export type DialogFooterProps = React.ComponentProps<"div">
export type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>
export type DialogDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>

export function Dialog({ ...props }: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

export function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

export function DialogPortal({ ...props }: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

export function DialogClose({ ...props }: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
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

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
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
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={cn(
              "absolute right-4 top-4 inline-flex cursor-pointer items-center justify-center rounded-md",
              "h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:pointer-events-none [&_svg]:pointer-events-none"
            )}
          >
            <X className="h-4 w-4" aria-hidden />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  )
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export type ResponsiveDialogMode = "dialog" | "drawer"
export type ResponsiveDrawerDirection = "top" | "right" | "bottom" | "left"

export interface ResponsiveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  desktopQuery?: string
  drawerDirection?: ResponsiveDrawerDirection
  mode?: ResponsiveDialogMode
  contentClassName?: string
  bodyClassName?: string
  headerClassName?: string
  footerClassName?: string
  hideClose?: boolean
}

/**
 * ResponsiveDialog
 * Renders Dialog on desktop and Drawer on mobile (md+ breakpoint). Extends Dialog; apps use this when a modal should adapt by breakpoint.
 */
export function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  desktopQuery = "(min-width: 768px)",
  drawerDirection = "bottom",
  mode,
  contentClassName,
  bodyClassName,
  headerClassName,
  footerClassName,
  hideClose = false,
}: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery(desktopQuery)
  const resolvedMode: ResponsiveDialogMode = mode ?? (isDesktop ? "dialog" : "drawer")

  if (resolvedMode === "dialog") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn("p-0 overflow-hidden", contentClassName)} showCloseButton={!hideClose}>
          {(title || description) ? (
            <DialogHeader className={cn("px-6 pt-6 pb-4", headerClassName)}>
              {title ? <DialogTitle className="text-base">{title}</DialogTitle> : null}
              {description ? <DialogDescription>{description}</DialogDescription> : null}
            </DialogHeader>
          ) : null}
          {(title || description) ? <Separator /> : null}
          <div className={cn("px-6 py-4", bodyClassName)}>{children}</div>
          {footer ? <Separator /> : null}
          {footer ? (
            <DialogFooter className={cn("px-6 pt-4 pb-6", footerClassName)}>{footer}</DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={drawerDirection}>
      <DrawerContent className={cn("p-0", contentClassName)}>
        {!hideClose ? (
          <div className="absolute right-4 top-4 z-10">
            <DrawerClose asChild>
              <Button variant="icon-ghost" size="icon-sm" aria-label="Close">
                <X className="h-4 w-4" aria-hidden />
              </Button>
            </DrawerClose>
          </div>
        ) : null}
        {(title || description) ? (
          <DrawerHeader className={cn("px-6 pt-6 pb-4", headerClassName)}>
            {title ? <DrawerTitle className="text-base">{title}</DrawerTitle> : null}
            {description ? <DrawerDescription>{description}</DrawerDescription> : null}
          </DrawerHeader>
        ) : null}
        {(title || description) ? <Separator /> : null}
        <div className={cn("px-6 py-4", bodyClassName)}>{children}</div>
        {footer ? <Separator /> : null}
        {footer ? (
          <DrawerFooter className={cn("px-6 pt-4 pb-6", footerClassName)}>{footer}</DrawerFooter>
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}

