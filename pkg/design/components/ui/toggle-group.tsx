/**
 * ToggleGroup: Group of toggleable buttons (single or multiple selection).
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - Controlled + uncontrolled: supports `value`/`onValueChange` or `defaultValue`.
 * - A11y:
 *   - `type="single"` uses `role="radiogroup"` + items `role="radio"` / `aria-checked`
 *   - `type="multiple"` uses `role="group"` + items `aria-pressed`
 *
 * Reference: shadcn `toggle-group.tsx` pattern (context + first/last rounding).
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from 'react'
import { cn } from '../../lib/utils'
import type { ButtonSize, ButtonVariant } from './button'
import { Button } from './button'

export type ToggleGroupType = 'single' | 'multiple'
export type ToggleGroupOrientation = 'horizontal' | 'vertical'

type ToggleValue = string | null
type ToggleValues = readonly string[]

type ToggleGroupBaseProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  type?: ToggleGroupType
  orientation?: ToggleGroupOrientation
  /** Visual variant used for non-selected items. */
  variant?: ButtonVariant
  /** Visual variant used for selected items. */
  activeVariant?: ButtonVariant
  /** Size applied to items. */
  size?: ButtonSize
  /** Adds separators between items (uses `divide-*`). */
  withSeparator?: boolean
  /** Allow deselecting the active item in single mode. */
  allowDeselect?: boolean
}

export type ToggleGroupSingleProps = ToggleGroupBaseProps & {
  type?: 'single'
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
}

export type ToggleGroupMultipleProps = ToggleGroupBaseProps & {
  type: 'multiple'
  value?: readonly string[]
  defaultValue?: readonly string[]
  onValueChange?: (value: readonly string[]) => void
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps

type ToggleGroupContextValue = {
  type: ToggleGroupType
  orientation: ToggleGroupOrientation
  variant: ButtonVariant
  activeVariant: ButtonVariant
  size?: ButtonSize
  withSeparator: boolean
  allowDeselect: boolean
  isPressed: (v: string) => boolean
  toggle: (v: string) => void
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

function normalizeType(type?: ToggleGroupType): ToggleGroupType {
  return type ?? 'single'
}

export function ToggleGroup(props: ToggleGroupProps) {
  const {
    type: rawType,
    orientation = 'horizontal',
    variant = 'secondary',
    activeVariant = 'primary',
    size,
    withSeparator = true,
    allowDeselect = true,
    className,
    children,
    // Prevent leaking non-DOM props onto the root element.
    onValueChange: _onValueChange,
    value: _value,
    defaultValue: _defaultValue,
    ...rest
  } = props

  const type = normalizeType(rawType)

  const isControlledSingle = type === 'single' && 'value' in props && props.value !== undefined
  const isControlledMultiple = type === 'multiple' && 'value' in props && props.value !== undefined

  const [uncontrolledSingle, setUncontrolledSingle] = React.useState<ToggleValue>(
    type === 'single' ? (('defaultValue' in props ? (props.defaultValue ?? null) : null) as ToggleValue) : null
  )
  const [uncontrolledMultiple, setUncontrolledMultiple] = React.useState<readonly string[]>(
    type === 'multiple' ? (('defaultValue' in props ? (props.defaultValue ?? []) : []) as readonly string[]) : []
  )

  const singleValue: ToggleValue =
    type === 'single'
      ? (isControlledSingle ? ((props as ToggleGroupSingleProps).value ?? null) : uncontrolledSingle)
      : null

  const multipleValue: readonly string[] =
    type === 'multiple'
      ? (isControlledMultiple ? ((props as ToggleGroupMultipleProps).value ?? []) : uncontrolledMultiple)
      : []

  const onSingleChange = (next: ToggleValue) => {
    ;(props as ToggleGroupSingleProps).onValueChange?.(next)
    if (!isControlledSingle) setUncontrolledSingle(next)
  }
  const onMultipleChange = (next: readonly string[]) => {
    ;(props as ToggleGroupMultipleProps).onValueChange?.(next)
    if (!isControlledMultiple) setUncontrolledMultiple(next)
  }

  const isPressed = React.useCallback(
    (v: string) => {
      return type === 'single' ? singleValue === v : multipleValue.includes(v)
    },
    [multipleValue, singleValue, type]
  )

  const toggle = React.useCallback(
    (v: string) => {
      if (type === 'single') {
        if (singleValue === v) {
          if (!allowDeselect) return
          onSingleChange(null)
          return
        }
        onSingleChange(v)
        return
      }

      // multiple
      if (multipleValue.includes(v)) {
        onMultipleChange(multipleValue.filter((x) => x !== v))
      } else {
        onMultipleChange([...multipleValue, v])
      }
    },
    [allowDeselect, multipleValue, singleValue, type]
  )

  const ctx: ToggleGroupContextValue = {
    type,
    orientation,
    variant,
    activeVariant,
    size,
    withSeparator,
    allowDeselect,
    isPressed,
    toggle,
  }

  const role = type === 'single' ? 'radiogroup' : 'group'

  return (
    <div
      data-slot="toggle-group"
      data-orientation={orientation}
      role={role}
      className={cn(
        'inline-flex w-fit overflow-hidden rounded-lg border border-border bg-card',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        withSeparator && (orientation === 'vertical' ? 'divide-y divide-border' : 'divide-x divide-border'),
        className
      )}
      {...rest}
    >
      <ToggleGroupContext.Provider value={ctx}>{children}</ToggleGroupContext.Provider>
    </div>
  )
}

export interface ToggleGroupItemProps extends Omit<React.ComponentProps<typeof Button>, 'variant' | 'size' | 'onClick'> {
  value: string
  variant?: ButtonVariant
  activeVariant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
}

export function ToggleGroupItem({
  value,
  className,
  variant,
  activeVariant,
  size,
  disabled,
  ...props
}: ToggleGroupItemProps) {
  const ctx = React.useContext(ToggleGroupContext)
  if (!ctx) {
    throw new Error('ToggleGroupItem must be used within ToggleGroup')
  }

  const pressed = ctx.isPressed(value)
  const resolvedVariant = pressed ? (ctx.activeVariant ?? activeVariant ?? 'primary') : (ctx.variant ?? variant ?? 'secondary')
  const resolvedSize = ctx.size ?? size

  const rounding =
    ctx.orientation === 'vertical'
      ? 'rounded-none first:rounded-t-lg last:rounded-b-lg'
      : 'rounded-none first:rounded-l-lg last:rounded-r-lg'

  const a11yProps =
    ctx.type === 'single'
      ? { role: 'radio', 'aria-checked': pressed }
      : { 'aria-pressed': pressed }

  return (
    <Button
      {...a11yProps}
      variant={resolvedVariant}
      size={resolvedSize}
      shape="rounded"
      disabled={disabled}
      className={cn('border-0 shadow-none focus-visible:z-10', rounding, className)}
      onClick={() => ctx.toggle(value)}
      {...props}
    />
  )
}

