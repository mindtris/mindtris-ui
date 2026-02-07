/**
 * Avatar: Composable image/fallback avatar (Radix-based).
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: semantic token classes only; no hardcoded colors.
 *   Any component accepts className to apply any semantic token (e.g. bg-primary, bg-secondary, bg-chart-1).
 * - Composition: Avatar (root) + AvatarImage + AvatarFallback; optional AvatarBadge.
 *   AvatarGroup and AvatarGroupCount for stacked avatars and +N count.
 * - Minimal state: Radix handles image load/error; fallback shows when image fails or is absent.
 *
 * @see https://ui.shadcn.com/docs/components/radix/avatar
 *
 * @author: @mindtris-team
 * @version: 0.2.0
 * @since: 2026-02-01
 *
 * @example
 * <Avatar size="md">
 *   <AvatarImage src="/photo.jpg" alt="Profile" />
 *   <AvatarFallback>AB</AvatarFallback>
 * </Avatar>
 *
 * @example
 * <Avatar size="md">
 *   <AvatarImage src="/photo.jpg" alt="Profile" />
 *   <AvatarFallback>AB</AvatarFallback>
 *   <AvatarBadge variant="primary" />
 * </Avatar>
 */

"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "../../lib/utils"

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl"

const AvatarSizeContext = React.createContext<AvatarSize>("md")

const avatarSizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6",
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-16 w-16",
}

const fallbackTextClasses: Record<AvatarSize, string> = {
  xs: "text-[10px]",
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-lg",
}

export interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  size?: AvatarSize
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ size = "md", className, ...props }, ref) => (
  <AvatarSizeContext.Provider value={size}>
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative inline-flex shrink-0 rounded-full select-none align-middle bg-muted",
        avatarSizeClasses[size],
        className
      )}
      {...props}
    />
  </AvatarSizeContext.Provider>
))
Avatar.displayName = "Avatar"

export interface AvatarImageProps
  extends React.ComponentProps<typeof AvatarPrimitive.Image> {}

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full overflow-hidden rounded-full object-cover", className)}
    draggable={false}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

export type AvatarFallbackVariant =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"

const fallbackVariantClasses: Record<AvatarFallbackVariant, string> = {
  default: "bg-transparent text-muted-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  tertiary: "bg-muted text-foreground",
  "chart-1": "bg-[var(--chart-1)] text-primary-foreground",
  "chart-2": "bg-[var(--chart-2)] text-primary-foreground",
  "chart-3": "bg-[var(--chart-3)] text-primary-foreground",
  "chart-4": "bg-[var(--chart-4)] text-primary-foreground",
  "chart-5": "bg-[var(--chart-5)] text-primary-foreground",
}

export interface AvatarFallbackProps
  extends React.ComponentProps<typeof AvatarPrimitive.Fallback> {
  size?: AvatarSize
  variant?: AvatarFallbackVariant
}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ size: sizeProp, variant = "default", className, ...props }, ref) => {
  const sizeFromContext = React.useContext(AvatarSizeContext)
  const size = sizeProp ?? sizeFromContext
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full overflow-hidden rounded-full items-center justify-center font-semibold uppercase",
        fallbackTextClasses[size],
        fallbackVariantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

export type AvatarBadgeVariant = "primary" | "secondary" | "destructive" | "muted" | "accent"

const badgeVariantClasses: Record<AvatarBadgeVariant, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  muted: "bg-muted",
  accent: "bg-accent",
}

const badgeSizeClasses: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
}

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: AvatarBadgeVariant
  size?: AvatarSize
}

const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ variant = "primary", size: sizeProp, className, ...props }, ref) => {
    const sizeFromContext = React.useContext(AvatarSizeContext)
    const size = sizeProp ?? sizeFromContext
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden
        className={cn(
          "absolute right-0 bottom-0 z-10 shrink-0 rounded-full aspect-square inline-flex items-center justify-center ring-2 ring-background",
          badgeSizeClasses[size],
          badgeVariantClasses[variant],
          className
        )}
        {...props}
      />
    )
  }
)
AvatarBadge.displayName = "AvatarBadge"

export type AvatarGroupOverlap = "2xs" | "xs" | "sm" | "md" | "lg"

const overlapClasses: Record<AvatarGroupOverlap, string> = {
  "2xs": "-space-x-[2px]",
  xs: "-space-x-2",
  sm: "-space-x-3",
  md: "-space-x-4",
  lg: "-space-x-7",
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  overlap?: AvatarGroupOverlap
  withRing?: boolean
  itemClassName?: string
}

function AvatarGroup({
  overlap = "md",
  withRing = false,
  className,
  itemClassName,
  children,
  ...props
}: AvatarGroupProps) {
  const items = React.Children.toArray(children)
  return (
    <div
      className={cn("flex items-center", overlapClasses[overlap], className)}
      {...props}
    >
      {items.map((child, idx) => (
        <span
          key={idx}
          className={cn(
            "relative inline-flex shrink-0 rounded-full",
            withRing && "ring-2 ring-background",
            itemClassName
          )}
          style={{ zIndex: idx + 1 }}
        >
          {child}
        </span>
      ))}
    </div>
  )
}

const groupCountSizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-7 w-7 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
  xl: "h-16 w-16 text-base",
}

export interface AvatarGroupCountProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize
}

function AvatarGroupCount({
  size = "md",
  className,
  children,
  ...props
}: AvatarGroupCountProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full aspect-square font-medium bg-muted text-muted-foreground select-none",
        groupCountSizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
}
