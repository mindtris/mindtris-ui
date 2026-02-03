/**
 * Separator: Visual divider (horizontal or vertical).
 *
 * Design-system contract
 * - Scope: UI-only primitive.
 * - Tokens-only: semantic token classes only.
 * - A11y: decorative by default.
 *
 * Usage
 * - Horizontal divider between sections:
 *   `<Separator className="my-4" />`
 * - Vertical divider between inline items:
 *   `<Separator orientation="vertical" className="mx-3 h-5" />`
 *
 * Accessibility
 * - `decorative` defaults to `true` (presentation). This is the correct default for purely visual dividers.
 * - If the separator conveys structure/meaning, set `decorative={false}`.
 *
 * Implementation notes
 * - We set explicit sizing from the `orientation` prop (instead of relying on data-attribute variants)
 *   to avoid accidental “thick” dividers when attributes/styles differ across environments.
 *
 * Reference: shadcn `separator.tsx` (Radix Separator).
 */

"use client"

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '../../lib/utils'

export type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
  // Avoid relying on data-attribute variants for sizing in case attributes/config differ.
  const orientationClasses =
    orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full'

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0',
        orientationClasses,
        className
      )}
      {...props}
    />
  )
})
Separator.displayName = 'Separator'

