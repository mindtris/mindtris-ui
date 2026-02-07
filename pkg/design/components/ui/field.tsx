/**
 * Field: Standard form layout (label, control slot, description, error).
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No react-hook-form coupling.
 * - Tokens-only: semantic token classes only.
 * - Composition: label, children (control), description, error slots.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Label } from "./label"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label text (rendered above the control). */
  label?: React.ReactNode
  /** Optional htmlFor for the label (links to control id). */
  htmlFor?: string
  /** Whether the field is required (adds required indicator). */
  required?: boolean
  /** Description text below the control. */
  description?: React.ReactNode
  /** Error message (renders in destructive color). */
  error?: React.ReactNode
  /** Whether the field has an error state (for styling the control). */
  invalid?: boolean
  /** Optional hint text (renders below description). */
  hint?: React.ReactNode
}

export function Field({
  label,
  htmlFor,
  required,
  description,
  error,
  invalid,
  hint,
  children,
  className,
  id: idProp,
  ...props
}: FieldProps) {
  const generatedId = React.useId()
  const fieldId = idProp ?? generatedId

  return (
    <div
      data-slot="field"
      data-invalid={invalid || !!error ? "true" : undefined}
      className={cn("grid gap-2", className)}
      {...props}
    >
      {label ? (
        <Label htmlFor={htmlFor ?? fieldId} className="text-sm font-medium text-foreground">
          {label}
          {required ? (
            <span className="ml-0.5 text-destructive" aria-hidden>
              *
            </span>
          ) : null}
        </Label>
      ) : null}
      {children ? (
        <div data-slot="field-control" className="min-w-0">
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<{ id?: string; "aria-invalid"?: boolean; "aria-describedby"?: string }>, {
                id: (children.props as { id?: string }).id ?? fieldId,
                ...((invalid || error) && { "aria-invalid": true }),
                ...((error || description) && {
                  "aria-describedby": error ? `${fieldId}-error` : `${fieldId}-description`,
                }),
              })
            : children}
        </div>
      ) : null}
      {description && !error ? (
        <p
          data-slot="field-description"
          id={`${fieldId}-description`}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      ) : null}
      {error ? (
        <p
          data-slot="field-error"
          id={`${fieldId}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      {hint && !error ? (
        <p data-slot="field-hint" className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export type FieldDescriptionProps = React.ComponentProps<"p">
export type FieldErrorProps = React.ComponentProps<"p">
