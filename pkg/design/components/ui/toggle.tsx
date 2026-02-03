/**
 * Toggle: Single toggleable control.
 *
 * Design-system contract
 * - Scope: UI-only primitive.
 * - Tokens-only: semantic token classes only.
 * - A11y: uses `aria-pressed`.
 *
 * Reference: shadcn `toggle.tsx` (Radix Toggle + variants).
 */

"use client"

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cn } from '../../lib/utils'
import { createVariants } from '../../lib/variant-utils'

export type ToggleVariant = 'default' | 'outline'
export type ToggleSize = 'default' | 'sm' | 'lg'
export type ToggleActiveVariant = 'primary' | 'secondary' | 'tertiary'

const toggleVariants = createVariants({
  base:
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap ' +
    // Icon normalization (shadcn-style)
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4 ' +
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
    'disabled:pointer-events-none disabled:opacity-50 ' +
    'hover:bg-muted hover:text-foreground',
  variants: {
    variant: {
      default: 'bg-transparent border border-transparent',
      outline: 'border border-input bg-transparent',
    },
    size: {
      default: 'h-9 px-2 min-w-9',
      sm: 'h-8 px-1.5 min-w-8',
      lg: 'h-10 px-2.5 min-w-10',
    },
    activeVariant: {
      primary: 'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
      secondary: 'data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground',
      tertiary: 'data-[state=on]:bg-tertiary data-[state=on]:text-tertiary-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    activeVariant: 'primary',
  },
})

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  variant?: ToggleVariant
  size?: ToggleSize
  /** Which semantic color to use when pressed. */
  activeVariant?: ToggleActiveVariant
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant = 'default', size = 'default', activeVariant = 'primary', ...props }, ref) => {
  return (
    <TogglePrimitive.Root
      ref={ref}
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, activeVariant }), className)}
      {...props}
    />
  )
})
Toggle.displayName = 'Toggle'

export { toggleVariants }

