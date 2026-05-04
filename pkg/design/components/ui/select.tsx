/**
 * Select
 * Unified implementation using Radix UI primitives and Native Select.
 * Includes both low-level primitives (SelectRoot, SelectList, etc.)
 * and a high-level Select component for variant-based usage.
 */

"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, CircleCheck, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "../../lib/utils"

// Radix Primitives
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
        "flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm transition-colors cursor-pointer",
        "border-input data-[placeholder]:text-muted-foreground",
        "text-foreground hover:border-border/80",
        "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40",
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
  sideOffset = 6,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "bg-card text-card-foreground border border-input shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:duration-200 data-[state=open]:duration-200",
          "relative z-[9999] max-h-[var(--radix-select-content-available-height)] min-w-[8rem] overflow-hidden rounded-lg",
          position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-slot="select-viewport"
          className={cn(
            "p-1.5",
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
        "flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm font-medium outline-none transition-colors",
        "focus:bg-secondary focus:text-foreground data-[highlighted]:bg-secondary data-[highlighted]:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator asChild>
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary shadow-sm">
          <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
        </div>
      </SelectPrimitive.ItemIndicator>
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

// Native Select Wrapper
export type NativeSelectSize = "sm" | "default" | "lg"

const sizeClasses: Record<NativeSelectSize, string> = {
  sm: "h-8 text-xs px-2.5",
  default: "h-10 text-sm px-3",
  lg: "h-12 text-base px-4",
}

export interface NativeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: NativeSelectSize
  invalid?: boolean
  fullWidth?: boolean
}

export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, size = "default", invalid = false, fullWidth = true, children, ...props }, ref) => {
    return (
      <div className={cn("relative inline-flex", fullWidth && "w-full")}>
        <select
          ref={ref}
          className={cn(
            "flex w-full appearance-none rounded-lg border bg-field pr-9 shadow-none transition-colors",
            sizeClasses[size],
            "border-input text-foreground",
            "hover:border-border/80",
            "focus:outline-none focus:ring-0 focus:border-foreground/40",
            "disabled:cursor-not-allowed disabled:opacity-50",
            invalid && "border-destructive focus:border-destructive",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </div>
    )
  }
)
NativeSelect.displayName = "NativeSelect"

// High-level Select component for simple cases (Backward compatibility)
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { }

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-lg border border-input bg-field px-3 py-2 text-sm shadow-none transition-colors',
          'hover:border-border/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = 'Select'
