'use client'

import React from 'react'
import { cn } from '../../lib/utils'

export type TabsVariant = 'simple' | 'underline' | 'container'

export interface TabsItem {
  id: string
  label: string
  icon?: React.ReactNode
}

export interface TabsProps {
  items: readonly TabsItem[]
  value: string
  onValueChange: (id: string) => void
  variant?: TabsVariant
  className?: string
}

/**
 * Tabs
 * Based on `app/(alternative)/components-library/tabs`.
 * - simple: bottom border container
 * - underline: active underline
 * - container: pill buttons (existing)
 */
export function Tabs({
  items,
  value,
  onValueChange,
  variant = 'container',
  className,
}: TabsProps) {
  if (variant === 'container') {
    return (
      <ul className={cn('inline-flex w-fit flex-wrap items-center gap-2', className)}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onValueChange(item.id)}
              className={cn(
                // Pill tabs (Mindtris tokens)
                'inline-flex items-center justify-center gap-2 text-sm font-medium leading-5 rounded-full px-4 py-2 border transition-colors',
                // Icon normalization (shadcn-style)
                "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                value === item.id
                  ? 'bg-primary text-primary-foreground border-transparent'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-border/80'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  if (variant === 'underline') {
    return (
      <div className={cn('relative', className)}>
        <div className="absolute bottom-0 w-full h-px bg-border" aria-hidden="true" />
        <ul className="relative text-sm font-medium flex flex-nowrap overflow-x-auto no-scrollbar">
          {items.map((item) => {
            const active = item.id === value
            return (
              <li key={item.id} className="mr-6 last:mr-0">
                <button
                  type="button"
                  onClick={() => onValueChange(item.id)}
                  className={cn(
                    'block pb-3 whitespace-nowrap transition-colors',
                    active
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="inline-flex items-center">
                    {item.icon ? <span className="mr-2 text-muted-foreground">{item.icon}</span> : null}
                    {item.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  // simple
  return (
    <div className={cn('border-b border-border', className)}>
      <ul className="text-sm font-medium flex flex-nowrap overflow-x-auto no-scrollbar">
        {items.map((item) => {
          const active = item.id === value
          return (
            <li key={item.id} className="pb-3 mr-6 last:mr-0">
              <button
                type="button"
                onClick={() => onValueChange(item.id)}
                className={cn(
                  'whitespace-nowrap transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="inline-flex items-center">
                  {item.icon ? <span className="mr-2 text-muted-foreground">{item.icon}</span> : null}
                  {item.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Back-compat export used elsewhere in the codebase
export type TabsWithContainerItem = TabsItem
export function TabsWithContainer(props: Omit<TabsProps, 'variant'>) {
  return <Tabs {...props} variant="container" />
}
