/**
 * Empty: Empty state primitive (icon, title, description, action).
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: icon slot, title, description, action slot.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional icon or illustration above the title. */
  icon?: React.ReactNode
  /** Main heading for the empty state. */
  title?: React.ReactNode
  /** Supporting description text. */
  description?: React.ReactNode
  /** Optional action (e.g. button) below the description. */
  action?: React.ReactNode
  /** Size variant. */
  size?: "sm" | "default" | "lg"
  /** Optional override for title styling. */
  titleClassName?: string
  /** Optional override for description styling. */
  descriptionClassName?: string
}

const sizeClasses = {
  sm: "py-8 gap-3",
  default: "py-12 gap-4",
  lg: "py-16 gap-5",
}

export function Empty({
  icon,
  title,
  description,
  action,
  size = "default",
  titleClassName,
  descriptionClassName,
  className,
  children,
  ...props
}: EmptyProps) {
  return (
    <div
      data-slot="empty"
      role="status"
      aria-label={typeof title === "string" ? title : undefined}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon ? (
        <div
          data-slot="empty-icon"
          className="flex items-center justify-center text-muted-foreground [&>svg]:size-10 sm:[&>svg]:size-12"
        >
          {icon}
        </div>
      ) : null}
      {title ? (
        <h3
          data-slot="empty-title"
          className={cn("text-base font-semibold text-foreground sm:text-lg", titleClassName)}
        >
          {title}
        </h3>
      ) : null}
      {description ? (
        <p
          data-slot="empty-description"
          className={cn("max-w-sm text-sm text-muted-foreground", descriptionClassName)}
        >
          {description}
        </p>
      ) : null}
      {action ? <div data-slot="empty-action">{action}</div> : null}
      {children}
    </div>
  )
}
