/**
 * Kbd: Keyboard shortcut display.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: renders <kbd> with token styling.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-05
 */

"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Size variant. */
  size?: "sm" | "default" | "lg"
}

const sizeClasses = {
  sm: "px-1.5 py-0.5 text-[10px]",
  default: "px-2 py-1 text-xs",
  lg: "px-2.5 py-1.5 text-sm",
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    return (
      <kbd
        ref={ref as React.Ref<HTMLSpanElement>}
        data-slot="kbd"
        data-size={size}
        className={cn(
          "inline-flex items-center justify-center rounded border font-mono font-medium",
          "border-border bg-muted text-muted-foreground",
          "shadow-[0_1px_0_0_var(--border)]",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    )
  }
)
Kbd.displayName = "Kbd"
