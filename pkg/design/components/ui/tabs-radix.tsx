/**
 * Tabs (Radix): shadcn-style tab primitives.
 *
 * Design-system contract
 * - Scope: UI-only primitive.
 * - Tokens-only: semantic token classes only.
 * - A11y: Radix handles keyboard + aria.
 *
 * Reference: shadcn `tabs.tsx`.
 */

"use client"

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../lib/utils'

export type TabsRootProps = React.ComponentProps<typeof TabsPrimitive.Root>
export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  /** Visual style of the tab list. */
  variant?: 'segmented' | 'line' | 'line-separator'
}
export type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger>
export type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>

export function TabsRoot({ className, ...props }: TabsRootProps) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />
}

export function TabsList({ className, variant = 'segmented', ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        'group inline-flex w-fit items-center justify-center',
        variant === 'segmented'
          ? // Segmented-control container (Mindtris tokens)
            'bg-muted text-muted-foreground h-9 rounded-lg p-[3px]'
          : variant === 'line'
            ? // Line: no separator line behind tabs
              'bg-transparent text-muted-foreground h-auto rounded-none p-0 gap-6'
            : // Line + separator: full-width baseline separator behind active underline
              'bg-transparent text-muted-foreground h-auto rounded-none p-0 gap-6 border-b border-border w-full',
        className
      )}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap',
        // Icon normalization (shadcn-style)
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'text-muted-foreground hover:text-foreground',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        // Active: visually merges with list; no shadow
        'data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-border data-[state=active]:shadow-none',
        // Line variant overrides (driven by TabsList data-variant)
        'group-data-[variant=line]:h-auto group-data-[variant=line]:rounded-none group-data-[variant=line]:border-0 group-data-[variant=line]:px-0 group-data-[variant=line]:py-2',
        'group-data-[variant=line]:data-[state=active]:bg-transparent group-data-[variant=line]:data-[state=active]:border-b-2 group-data-[variant=line]:data-[state=active]:border-foreground',
        // Line + separator overrides
        'group-data-[variant=line-separator]:h-auto group-data-[variant=line-separator]:rounded-none group-data-[variant=line-separator]:border-0 group-data-[variant=line-separator]:px-0 group-data-[variant=line-separator]:py-2',
        // Pull active underline onto baseline separator
        'group-data-[variant=line-separator]:data-[state=active]:bg-transparent group-data-[variant=line-separator]:data-[state=active]:border-b-[3px] group-data-[variant=line-separator]:data-[state=active]:border-foreground group-data-[variant=line-separator]:-mb-[2px]',
        className
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }: TabsContentProps) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />
}

