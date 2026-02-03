/**
 * Avatar: Displays a user/identity avatar with optional fallback and status.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - Composition over configuration: apps can pass `src` (image) or `fallback` (initials/icon).
 * - A11y: provide `alt` for images; for fallback-only avatars, `aria-label` uses `alt`.
 *
 * Mosaic reference variants we mirror:
 * - Basic avatar (image) in multiple sizes
 * - Avatar with notification/status dot
 * - Avatar with placeholder initials
 * - Avatar groups (overlapping) with a background ring/border
 *
 * Planned Mindtris variants (placeholders; refine later per `button.tsx` + `simplifi-frontend/CONTRIBUTING.md`):
 * - Status variants beyond `primary`/`destructive` (e.g. success/warn) once tokens exist
 * - Group max + overflow count
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 *
 * @example
 * <Avatar size="md" src="/images/avatar.jpg" alt="Profile photo" status="primary" />
 *
 * @example
 * <Avatar size="md" alt="MS" fallback="MS" />
 */

"use client"

import * as React from 'react'
import { cn } from '../../lib/utils'
import { createVariants } from '../../lib/variant-utils'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarStatus = 'none' | 'primary' | 'destructive'

const avatarVariants = createVariants<AvatarSize>({
  base:
    'relative inline-flex shrink-0 overflow-hidden rounded-full select-none align-middle ' +
    'ring-1 ring-border bg-muted',
  variants: {
    size: {
      xs: 'h-6 w-6',
      sm: 'h-7 w-7',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
      xl: 'h-16 w-16',
    },
  },
  defaultVariants: { size: 'md' },
})

const avatarFallbackTextVariants = createVariants<AvatarSize>({
  base: 'flex h-full w-full items-center justify-center font-semibold uppercase text-muted-foreground',
  variants: {
    size: {
      xs: 'text-[10px]',
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  size?: AvatarSize
  /** Image source URL. If absent, `fallback` is rendered instead. */
  src?: string
  /** Accessible text for the image or fallback-only avatar. */
  alt?: string
  /** Fallback content (e.g. initials) when `src` is missing or fails to load. */
  fallback?: React.ReactNode
  /** Optional status dot (top-right). */
  status?: AvatarStatus
  /** Customize classes for the status dot. */
  statusClassName?: string
  /** Customize classes for the inner image element. */
  imageClassName?: string
}

export function Avatar({
  size = 'md',
  src,
  alt,
  fallback,
  status = 'none',
  className,
  statusClassName,
  imageClassName,
  ...props
}: AvatarProps) {
  const [failed, setFailed] = React.useState(false)
  const showImage = Boolean(src) && !failed

  const statusBase =
    'absolute top-0 right-0 rounded-full ring-2 ring-background ' +
    'translate-x-[10%] -translate-y-[10%]'
  const statusSize = {
    xs: 'h-2 w-2',
    sm: 'h-2.5 w-2.5',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3 w-3',
  }[size]
  const statusColor = {
    none: 'hidden',
    primary: 'bg-primary',
    destructive: 'bg-destructive',
  }[status]

  return (
    <span
      className={cn(avatarVariants({ size }), className)}
      {...props}
      {...(!showImage && alt ? { role: 'img', 'aria-label': alt } : {})}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? ''}
          className={cn('h-full w-full object-cover', imageClassName)}
          onError={() => setFailed(true)}
          draggable={false}
        />
      ) : (
        <span className={cn('h-full w-full bg-muted', avatarFallbackTextVariants({ size }))} aria-hidden={alt ? true : undefined}>
          {fallback}
        </span>
      )}

      <span className={cn(statusBase, statusSize, statusColor, statusClassName)} aria-hidden />
    </span>
  )
}

export type AvatarGroupOverlap = 'xs' | 'sm' | 'md' | 'lg'

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls the overlap amount between items. */
  overlap?: AvatarGroupOverlap
  /** Adds a background ring around each avatar to separate them when overlapped. */
  withRing?: boolean
  /** Class applied to each child wrapper. */
  itemClassName?: string
}

export function AvatarGroup({
  overlap = 'md',
  withRing = true,
  className,
  itemClassName,
  children,
  ...props
}: AvatarGroupProps) {
  const overlapClass =
    overlap === 'xs' ? '-space-x-2' :
    overlap === 'sm' ? '-space-x-3' :
    overlap === 'lg' ? '-space-x-7' :
    '-space-x-4'

  return (
    <div className={cn('flex items-center', overlapClass, className)} {...props}>
      {React.Children.toArray(children).map((child, idx) => (
        <span
          key={idx}
          className={cn(
            'inline-flex rounded-full',
            withRing && 'ring-2 ring-background',
            itemClassName
          )}
        >
          {child}
        </span>
      ))}
    </div>
  )
}

