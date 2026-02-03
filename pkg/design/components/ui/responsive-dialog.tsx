"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"
import { useMediaQuery } from "../../hooks/use-media-query"
import { Button } from "./button"
import { Separator } from "./separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./drawer"

export type ResponsiveDialogMode = "dialog" | "drawer"
export type ResponsiveDrawerDirection = "top" | "right" | "bottom" | "left"

export interface ResponsiveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode

  /**
   * Media query that switches to desktop dialog mode.
   * Defaults to Tailwind `md` and up.
   */
  desktopQuery?: string

  /** Drawer direction used in mobile mode. */
  drawerDirection?: ResponsiveDrawerDirection

  /** Force a specific mode (mostly for testing). */
  mode?: ResponsiveDialogMode

  /** Visual tweaks */
  contentClassName?: string
  bodyClassName?: string
  headerClassName?: string
  footerClassName?: string

  /** Hide the close button in both modes. */
  hideClose?: boolean
}

/**
 * ResponsiveDialog
 * Renders a centered `Dialog` on desktop and a `Drawer` on mobile.
 *
 * This keeps a consistent API for “modal-like” flows across breakpoints,
 * while preserving the native semantics and ergonomics of each primitive.
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
            <DialogHeader className={cn("px-5 py-4", headerClassName)}>
              {title ? <DialogTitle className="text-base">{title}</DialogTitle> : null}
              {description ? <DialogDescription>{description}</DialogDescription> : null}
            </DialogHeader>
          ) : null}

          {(title || description) ? <Separator /> : null}

          <div className={cn("px-5 py-4", bodyClassName)}>{children}</div>

          {footer ? <Separator /> : null}

          {footer ? (
            <DialogFooter className={cn("px-5 py-4", footerClassName)}>{footer}</DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={drawerDirection}>
      <DrawerContent className={cn("p-0", contentClassName)}>
        {/* Optional close button (mobile) */}
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
          <DrawerHeader className={cn("px-5 py-4", headerClassName)}>
            {title ? <DrawerTitle className="text-base">{title}</DrawerTitle> : null}
            {description ? <DrawerDescription>{description}</DrawerDescription> : null}
          </DrawerHeader>
        ) : null}

        {(title || description) ? <Separator /> : null}

        <div className={cn("px-5 py-4", bodyClassName)}>{children}</div>

        {footer ? <Separator /> : null}

        {footer ? (
          <DrawerFooter className={cn("px-5 py-4", footerClassName)}>{footer}</DrawerFooter>
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}

