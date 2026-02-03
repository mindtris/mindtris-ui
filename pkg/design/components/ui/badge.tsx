/**
 * Badge: Small status/label pill.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - Composition: optional `leadingIcon` slot; content via children.
 *
 * Mosaic reference variants we mirror:
 * - Small + large pills
 * - Pills with an icon
 * - Compact “chart delta” pills
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 *
 * @example
 * <Badge variant="accent">Working on</Badge>
 *
 * @example
 * <Badge size="sm" variant="inverse" leadingIcon={<Icon name="bolt" />}>Special Offer</Badge>
 */

"use client"

import * as React from 'react'
import { cn } from '../../lib/utils'
import { createVariants } from '../../lib/variant-utils'

export type BadgeVariant = 'accent' | 'secondary' | 'muted' | 'outline' | 'destructive' | 'inverse'
export type BadgeSize = 'xs' | 'sm' | 'md'

const badgeVariants = createVariants({
  base: 'inline-flex items-center font-medium whitespace-nowrap select-none',
  variants: {
    variant: {
      accent: 'bg-accent text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground border border-border',
      muted: 'bg-muted text-muted-foreground',
      outline: 'bg-transparent text-foreground border border-border',
      destructive: 'bg-destructive/15 text-destructive border border-destructive/30',
      inverse: 'bg-foreground/80 text-background border border-border/60',
    },
    size: {
      xs: 'text-xs px-2.5 py-1 rounded-full',
      sm: 'text-xs px-2.5 py-1 rounded-full',
      md: 'text-sm px-2.5 py-1 rounded-full',
    },
  },
  defaultVariants: { variant: 'muted', size: 'sm' },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  leadingIcon?: React.ReactNode
}

export function Badge({ variant = 'muted', size = 'sm', leadingIcon, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {leadingIcon ? <span className="mr-1 shrink-0">{leadingIcon}</span> : null}
      <span>{children}</span>
    </span>
  )
}

