"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "../../lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogProps,
  DialogTitle,
} from "./dialog"

export type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>
export type CommandDialogProps = DialogProps & {
  title?: string
  description?: string
  /** Props applied to the inner command root. */
  commandProps?: CommandProps
  /** Extra classes applied to the dialog content. */
  className?: string
  /** Whether to render the top-right close button. */
  showCloseButton?: boolean
}

export const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    data-slot="command"
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = "Command"

export function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  commandProps,
  className,
  showCloseButton = true,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={cn("overflow-hidden p-0", className)} showCloseButton={showCloseButton}>
        <Command
          {...commandProps}
          className={cn(
            // Match shadcn-like internal spacing when rendered in a dialog
            "[&_[data-slot=command-input-wrapper]]:h-12 [&_[data-slot=command-input]]:h-12",
            "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
            "[&_[cmdk-group]]:px-2",
            "[&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3",
            commandProps?.className
          )}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    data-slot="command-input-wrapper"
    className="flex h-9 items-center gap-2 border-b border-border bg-muted/30 px-3 rounded-t-lg"
  >
    <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
    <CommandPrimitive.Input
      ref={ref}
      data-slot="command-input"
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none",
        "placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = "CommandInput"

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    data-slot="command-list"
    className={cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className)}
    {...props}
  />
))
CommandList.displayName = "CommandList"

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    data-slot="command-empty"
    className={cn("py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
))
CommandEmpty.displayName = "CommandEmpty"

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    data-slot="command-group"
    className={cn(
      "overflow-hidden p-1 text-foreground",
      // heading
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = "CommandGroup"

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    data-slot="command-separator"
    className={cn("-mx-1 h-px min-h-0 max-h-px shrink-0 bg-border/90", className)}
    {...props}
  />
))
CommandSeparator.displayName = "CommandSeparator"

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    data-slot="command-item"
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:h-4 [&_svg:not([class*='size-'])]:w-4",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = "CommandItem"

export function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}

