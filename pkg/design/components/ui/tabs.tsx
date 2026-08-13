/**
 * Tabs
 * Unified implementation using Radix UI primitives.
 * Includes both low-level primitives (TabsRoot, TabsList, TabsTrigger, TabsContent)
 * and a high-level Tabs component for variant-based usage.
 */

"use client"

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../lib/utils'

// Primitives
export type TabsRootProps = React.ComponentProps<typeof TabsPrimitive.Root>
export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: 'segmented' | 'line' | 'line-separator' | 'container' | 'underline' | 'simple'
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
          ? 'bg-muted text-muted-foreground h-9 rounded-lg p-[3px]'
          : variant === 'line' || variant === 'underline' || variant === 'simple'
            ? 'bg-transparent text-muted-foreground h-auto rounded-none p-0 gap-6 max-w-full overflow-x-auto'
            : variant === 'line-separator'
              ? 'bg-transparent text-muted-foreground h-auto rounded-none p-0 gap-6 border-b border-border w-full'
              : variant === 'container'
                ? 'inline-flex w-fit flex-wrap items-center gap-2'
                : '',
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
        'inline-flex h-full items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap cursor-pointer transition-all',
        // 44px touch floor on the rail variants only. Segmented tracks pin their own
        // compact heights (h-8/h-10 toolbars, signature modal) and min-height would
        // silently defeat them - tailwind-merge treats height and min-height as
        // separate groups, so callers cannot override this back.
        'max-sm:group-data-[variant=line]:min-h-11 max-sm:group-data-[variant=underline]:min-h-11 max-sm:group-data-[variant=simple]:min-h-11',
        // Icon normalization
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'text-muted-foreground hover:text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',

        // Segmented (default)
        'data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-border data-[state=active]:shadow-none',

        // Underline / Line / Simple variants
        'group-data-[variant=underline]:h-auto group-data-[variant=underline]:rounded-none group-data-[variant=underline]:border-0 group-data-[variant=underline]:px-0 group-data-[variant=underline]:pb-3 group-data-[variant=underline]:data-[state=active]:bg-transparent group-data-[variant=underline]:data-[state=active]:border-b-2 group-data-[variant=underline]:data-[state=active]:border-primary group-data-[variant=underline]:data-[state=active]:text-primary',
        'group-data-[variant=line]:h-auto group-data-[variant=line]:rounded-none group-data-[variant=line]:border-0 group-data-[variant=line]:px-0 group-data-[variant=line]:py-2 group-data-[variant=line]:data-[state=active]:bg-transparent group-data-[variant=line]:data-[state=active]:border-b-2 group-data-[variant=line]:data-[state=active]:border-foreground',
        'group-data-[variant=line-separator]:h-auto group-data-[variant=line-separator]:rounded-none group-data-[variant=line-separator]:border-0 group-data-[variant=line-separator]:px-0 group-data-[variant=line-separator]:py-2 group-data-[variant=line-separator]:data-[state=active]:bg-transparent group-data-[variant=line-separator]:data-[state=active]:border-b-[3px] group-data-[variant=line-separator]:data-[state=active]:border-foreground group-data-[variant=line-separator]:-mb-[2px]',
        'group-data-[variant=simple]:h-auto group-data-[variant=simple]:rounded-none group-data-[variant=simple]:border-0 group-data-[variant=simple]:px-0 group-data-[variant=simple]:pb-3 group-data-[variant=simple]:data-[state=active]:bg-transparent group-data-[variant=simple]:data-[state=active]:text-primary',

        // Container (Pill) variant
        'group-data-[variant=container]:rounded-full group-data-[variant=container]:px-4 group-data-[variant=container]:py-2 group-data-[variant=container]:border group-data-[variant=container]:border-border group-data-[variant=container]:data-[state=active]:bg-primary group-data-[variant=container]:data-[state=active]:text-primary-foreground group-data-[variant=container]:data-[state=active]:border-transparent',

        className
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }: TabsContentProps) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />
}

// High-level Component (Backward Compatibility)
export type TabsVariant = 'simple' | 'underline' | 'container' | 'segmented' | 'line' | 'line-separator'

export interface TabsItem {
  id: string
  label: string
  icon?: React.ReactNode
}

export interface TabsProps {
  items?: readonly TabsItem[]
  children?: React.ReactNode
  value: string
  onValueChange: (id: string) => void
  variant?: TabsVariant
  className?: string
}

export function Tabs({
  items,
  children,
  value,
  onValueChange,
  variant = 'container',
  className,
}: TabsProps) {
  const isUnderline = variant === 'underline'

  return (
    <TabsRoot value={value} onValueChange={onValueChange} className={cn('gap-0', className)}>
      <div className={cn('relative w-full', isUnderline && 'border-b border-border')}>
        {items ? (
          <TabsList variant={variant as any} className="w-full justify-start">
            {items.map((item) => (
              <TabsTrigger key={item.id} value={item.id}>
                {item.icon}
                <span>{item.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        ) : (
          children
        )}
      </div>
    </TabsRoot>
  )
}

// Back-compat export
export type TabsWithContainerItem = TabsItem
export function TabsWithContainer(props: Omit<TabsProps, 'variant'>) {
  return <Tabs {...props} variant="container" />
}
