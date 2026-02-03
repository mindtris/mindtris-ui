/**
 * ButtonGroup: Visually groups buttons into a segmented control.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - Composition: uses a Group + Item pattern (like shadcn ToggleGroup) to keep Button API intact.
 * - A11y: relies on underlying Button semantics. Use `aria-label` for icon-only items.
 *
 * Reference: shadcn dashboard template `toggle-group.tsx` pattern (context + first/last rounding).
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from 'react'
import { cn } from '../../lib/utils'
import type { ButtonProps, ButtonSize, ButtonVariant } from './button'
import { Button } from './button'

export type ButtonGroupOrientation = 'horizontal' | 'vertical'

type ButtonGroupContextValue = {
  variant?: ButtonVariant
  size?: ButtonSize
  orientation: ButtonGroupOrientation
  withSeparator: boolean
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({
  orientation: 'horizontal',
  withSeparator: true,
})

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default variant applied to `ButtonGroupItem` children. */
  variant?: ButtonVariant
  /** Default size applied to `ButtonGroupItem` children. */
  size?: ButtonSize
  orientation?: ButtonGroupOrientation
  /** Adds separators between items (uses `divide-*`). */
  withSeparator?: boolean
}

export function ButtonGroup({
  variant,
  size,
  orientation = 'horizontal',
  withSeparator = true,
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        'inline-flex w-fit overflow-hidden rounded-lg border border-border bg-card',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        withSeparator && (orientation === 'vertical' ? 'divide-y divide-border' : 'divide-x divide-border'),
        className
      )}
      {...props}
    >
      <ButtonGroupContext.Provider value={{ variant, size, orientation, withSeparator }}>
        {children}
      </ButtonGroupContext.Provider>
    </div>
  )
}

export interface ButtonGroupItemProps extends Omit<ButtonProps, 'shape'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function ButtonGroupItem({ className, variant, size, ...props }: ButtonGroupItemProps) {
  const ctx = React.useContext(ButtonGroupContext)
  const resolvedVariant = ctx.variant ?? variant ?? 'secondary'
  const resolvedSize = ctx.size ?? size

  const rounding =
    ctx.orientation === 'vertical'
      ? 'rounded-none first:rounded-t-lg last:rounded-b-lg'
      : 'rounded-none first:rounded-l-lg last:rounded-r-lg'

  // We remove inner borders/shadows so the group shell + separators control the visuals.
  // Consumers can still use outline variants; it will just appear as a grouped outline.
  const groupItemClasses = cn(
    'border-0 shadow-none',
    'focus-visible:z-10',
    rounding,
    className
  )

  return (
    <Button
      variant={resolvedVariant}
      size={resolvedSize}
      shape="rounded"
      className={groupItemClasses}
      {...props}
    />
  )
}

export interface ButtonGroupSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation
}

/**
 * ButtonGroupSeparator
 * Use when you want explicit separators (e.g. split button).
 * If `ButtonGroup` uses `withSeparator`, you usually don't need this.
 */
export function ButtonGroupSeparator({ orientation, className, ...props }: ButtonGroupSeparatorProps) {
  const ctx = React.useContext(ButtonGroupContext)
  const dir = orientation ?? ctx.orientation
  return (
    <div
      aria-hidden="true"
      className={cn(
        'bg-border shrink-0',
        dir === 'vertical' ? 'h-px w-full' : 'w-px h-full',
        className
      )}
      {...props}
    />
  )
}

