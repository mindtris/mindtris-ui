/**
 * Select (Radix): Composable select primitives.
 *
 * Design-system contract (CONTRIBUTING.md):
 * - Scope: UI-only primitive; no domain logic.
 * - Tokens-only: semantic token classes only; no hardcoded colors.
 * - Minimal state: Radix handles value, open state, a11y.
 * - Composition: SelectRoot, SelectTrigger, SelectValue, SelectContent,
 *   SelectItem, SelectGroup, SelectLabel, SelectSeparator.
 *
 * @see https://ui.shadcn.com/docs/components/radix/select
 */

"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CircleCheck, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "../../lib/utils"

export const SelectRoot = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

export type SelectRootProps = React.ComponentProps<typeof SelectPrimitive.Root>
export type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}
export type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content>
export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>
export type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>
export type SelectSeparatorProps = React.ComponentProps<typeof SelectPrimitive.Separator>

export function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
        className={cn(
          "flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm transition-colors",
          "border-foreground data-[placeholder]:border-input data-[placeholder]:text-muted-foreground",
          "text-foreground",
        "focus-visible:outline-none focus-visible:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[size=default]:h-9 data-[size=sm]:h-8",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "bg-popover text-popover-foreground border border-input",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md p-1",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
        "focus:bg-background focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 shrink-0 items-center justify-center">
        <SelectPrimitive.ItemIndicator className="inline-flex">
          <CircleCheck className="h-4 w-4 text-foreground" aria-hidden />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px min-h-0 max-h-px shrink-0 bg-border/90", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1 text-muted-foreground", className)}
      {...props}
    >
      <ChevronUp className="h-4 w-4" aria-hidden />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1 text-muted-foreground", className)}
      {...props}
    >
      <ChevronDown className="h-4 w-4" aria-hidden />
    </SelectPrimitive.ScrollDownButton>
  )
}
