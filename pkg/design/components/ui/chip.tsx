/**
 * Chip: Compact pill used for selection, filtering, and tags.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - A11y: toggle chips use `aria-pressed`; disabled uses native `disabled`.
 * - Controlled + uncontrolled: supports `selected` + `onSelectedChange` or `defaultSelected`.
 *
 * Reference (Once UI / modern apps):
 * - selectable chips
 * - optional leading icon
 * - optional remove action
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

export type ChipSize = 'sm' | 'md'
export type ChipVariant = 'default' | 'outline'

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  size?: ChipSize
  variant?: ChipVariant
  leadingIcon?: React.ReactNode
  /** Shows a trailing remove button (X). */
  onRemove?: () => void

  /** Uncontrolled initial selected state. */
  defaultSelected?: boolean
  /** Controlled selected state. */
  selected?: boolean
  /** Fired when selection changes (toggle). */
  onSelectedChange?: (selected: boolean) => void
}

export function Chip({
  size = 'md',
  variant = 'default',
  leadingIcon,
  onRemove,
  defaultSelected = false,
  selected,
  onSelectedChange,
  className,
  disabled,
  children,
  onClick,
  ...props
}: ChipProps) {
  const isControlled = typeof selected === 'boolean'
  const [uncontrolledSelected, setUncontrolledSelected] = React.useState(defaultSelected)
  const isSelected = isControlled ? (selected as boolean) : uncontrolledSelected

  const toggle = React.useCallback(() => {
    const next = !isSelected
    if (!isControlled) setUncontrolledSelected(next)
    onSelectedChange?.(next)
  }, [isControlled, isSelected, onSelectedChange])

  const sizeClass = size === 'sm' ? 'h-7 px-2.5 text-xs' : 'h-8 px-3 text-sm'
  const base =
    'inline-flex items-center gap-1.5 rounded-full font-medium border shadow-sm transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClass =
    variant === 'outline'
      ? (isSelected
        ? 'bg-muted border-border text-foreground'
        : 'bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-muted/40')
      : (isSelected
        ? 'bg-primary text-primary-foreground border-transparent'
        : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/90')

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      disabled={disabled}
      className={cn(base, sizeClass, variantClass, className)}
      onClick={(e) => {
        toggle()
        onClick?.(e)
      }}
      {...props}
    >
      {leadingIcon ? <span className="shrink-0">{leadingIcon}</span> : null}
      <span className="truncate">{children}</span>

      {onRemove ? (
        <span className="ml-1 inline-flex">
          <span
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label="Remove"
            className={cn(
              'inline-flex items-center justify-center rounded-full border border-transparent',
              'text-current/80 hover:text-current',
              size === 'sm' ? 'h-5 w-5' : 'h-5 w-5'
            )}
            onClick={(e) => {
              e.stopPropagation()
              if (disabled) return
              onRemove()
            }}
            onKeyDown={(e) => {
              if (disabled) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                onRemove()
              }
            }}
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </span>
        </span>
      ) : null}
    </button>
  )
}

