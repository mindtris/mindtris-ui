"use client"

import * as React from 'react'
import { cn } from '../../lib/utils'

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'size'> {
  /** Text shown when no file is selected. */
  emptyLabel?: string
  /** Button label (left side). */
  buttonLabel?: string
}

/**
 * FileInput
 * Custom, token-driven file picker that renders consistently across browsers.
 *
 * - Uses a hidden native `<input type="file" />` for actual file selection.
 * - Renders a visible "Choose File" button + filename label inside an Input-like container.
 * - Tokens-only styling (no hex/palette). Button uses `bg-background` (Simplifi: #f7f5f2).
 */
export function FileInput({
  id,
  name,
  accept,
  multiple,
  disabled,
  required,
  onChange,
  className,
  emptyLabel = 'No file chosen',
  buttonLabel = 'Choose file',
  ...props
}: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [label, setLabel] = React.useState<string>(emptyLabel)

  const openPicker = React.useCallback(() => {
    if (disabled) return
    inputRef.current?.click()
  }, [disabled])

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files
      if (!files || files.length === 0) {
        setLabel(emptyLabel)
      } else if (files.length === 1) {
        setLabel(files[0]?.name ?? emptyLabel)
      } else {
        setLabel(`${files.length} files`)
      }
      onChange?.(e)
    },
    [emptyLabel, onChange]
  )

  return (
    <div
      data-slot="file-input"
      className={cn(
        // Slightly tighter left padding so the button sits a bit more left.
        'w-full h-10 rounded-lg border border-input bg-field pl-2.5 pr-3',
        'flex items-center gap-3',
        'hover:border-border/80 focus-within:border-foreground/40',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={openPicker}
    >
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          openPicker()
        }}
        disabled={disabled}
        className={cn(
          'shrink-0',
          'inline-flex items-center justify-center',
          'rounded-md border border-transparent',
          'bg-primary text-primary-foreground',
          'px-3 py-1.5 text-xs font-medium',
          'focus-visible:outline-none focus-visible:ring-0'
        )}
      >
        {buttonLabel}
      </button>

      <span className={cn('min-w-0 truncate text-sm', label === emptyLabel ? 'text-muted-foreground' : 'text-foreground')}>
        {label}
      </span>
    </div>
  )
}

