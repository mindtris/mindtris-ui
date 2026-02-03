"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

export type CardDecoratorProps = React.ComponentProps<"div"> & {
  /** The decorative center content (usually an icon). */
  children: React.ReactNode
}

/**
 * CardDecorator
 * Small decorative wrapper for empty states / feature callouts.
 * Token-driven, no inline styles.
 */
export function CardDecorator({ className, children, ...props }: CardDecoratorProps) {
  return (
    <div
      data-slot="card-decorator"
      className={cn(
        "relative grid h-36 w-36 place-items-center",
        "rounded-2xl border border-border bg-muted/30",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-card"
      />
      <div
        data-slot="card-decorator-center"
        className={cn(
          "relative z-10 grid h-12 w-12 place-items-center",
          "rounded-lg border border-border bg-card shadow-sm"
        )}
      >
        {children}
      </div>
    </div>
  )
}

