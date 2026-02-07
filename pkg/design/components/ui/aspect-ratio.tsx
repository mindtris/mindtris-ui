/**
 * Aspect Ratio: Wrapper for fixed aspect ratios.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: single wrapper; children fill the area.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-05
 */

"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export type AspectRatioPreset = "square" | "video" | "video-wide" | "portrait" | "auto"

const ratioMap: Record<Exclude<AspectRatioPreset, "auto">, string> = {
  square: "1 / 1",
  video: "16 / 9",
  "video-wide": "21 / 9",
  portrait: "3 / 4",
}

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Preset ratio or custom value (e.g. "16/9", "4/3"). */
  ratio?: AspectRatioPreset | string
}

export function AspectRatio({
  ratio = "video",
  className,
  children,
  style,
  ...props
}: AspectRatioProps) {
  const aspectValue =
    ratio === "auto"
      ? undefined
      : (ratioMap[ratio as Exclude<AspectRatioPreset, "auto">] as string | undefined) ??
        (typeof ratio === "string" ? ratio.replace(/\s/g, " / ") : undefined)

  return (
    <div
      data-slot="aspect-ratio"
      data-ratio={ratio}
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        ...style,
        aspectRatio: aspectValue,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
