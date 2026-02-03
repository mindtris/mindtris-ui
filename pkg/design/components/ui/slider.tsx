"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/utils"

export type SliderSize = "sm" | "md" | "lg"
export type SliderOrientation = "horizontal" | "vertical"
export type SliderVariant =
  | "tertiary"
  | "foreground"
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "muted"

export type SliderThumbStyle = "outline" | "solid"

export type SliderMark = {
  value: number
  label?: React.ReactNode
}

export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  size?: SliderSize
  variant?: SliderVariant
  /**
   * Thumb visual style.
   * - outline: background uses `bg-background` with a token border.
   * - solid: background uses the token variant color.
   */
  thumbStyle?: SliderThumbStyle
  /**
   * Optional marks/ticks along the track.
   * Provide `label` to render step labels.
   */
  marks?: SliderMark[]
  /** Render labels for marks that include `label`. */
  showMarkLabels?: boolean
}

const trackSizeClasses: Record<SliderOrientation, Record<SliderSize, string>> = {
  horizontal: { sm: "h-2", md: "h-2.5", lg: "h-3" },
  vertical: { sm: "w-2", md: "w-2.5", lg: "w-3" },
}

const thumbSizeClasses: Record<SliderSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
}

const rangeClasses: Record<SliderVariant, string> = {
  // "Tertiary" in this system is a subtle surface + primary accent.
  // For slider, we interpret that as a subtle primary fill.
  tertiary: "bg-primary/40",
  foreground: "bg-foreground",
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground",
}

const thumbBorderClasses: Record<SliderVariant, string> = {
  tertiary: "border-border",
  foreground: "border-foreground",
  primary: "border-primary",
  secondary: "border-secondary",
  accent: "border-accent",
  destructive: "border-destructive",
  muted: "border-muted-foreground",
}

const thumbFillClasses: Record<SliderVariant, string> = {
  tertiary: "bg-primary/40",
  foreground: "bg-foreground",
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground",
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      size = "md",
      variant = "foreground",
      thumbStyle = "outline",
      marks,
      showMarkLabels = false,
      ...props
    },
    ref
  ) => {
    const orientation = (props.orientation ?? "horizontal") as SliderOrientation
    const min = typeof props.min === "number" ? props.min : 0
    const max = typeof props.max === "number" ? props.max : 100

    const rawThumbValues = (props.value ?? props.defaultValue ?? [min]) as number[]
    const thumbCount = Math.max(1, Array.isArray(rawThumbValues) ? rawThumbValues.length : 1)

    const safeMarks =
      marks?.map((m) => ({
        value: Math.max(min, Math.min(max, m.value)),
        label: m.label,
      })) ?? []

    const showLabels = showMarkLabels && safeMarks.some((m) => m.label != null)

    const trackBase =
      orientation === "vertical"
        ? "relative h-full grow overflow-hidden rounded-full bg-muted"
        : "relative w-full grow overflow-hidden rounded-full bg-muted"

    const rangeBase =
      orientation === "vertical" ? "absolute w-full rounded-full" : "absolute h-full rounded-full"

    const marksLabelContainer =
      orientation === "vertical"
        ? "relative h-full ml-3"
        : "relative w-full mt-2"

    const marksLabelText =
      orientation === "vertical"
        ? "absolute -translate-y-1/2 text-xs text-muted-foreground"
        : "absolute -translate-x-1/2 text-xs text-muted-foreground"

    return (
      <div
        data-slot="slider-wrapper"
        className={cn(orientation === "vertical" ? "flex h-full items-start gap-3" : "w-full")}
      >
        <SliderPrimitive.Root
          ref={ref}
          data-slot="slider"
          className={cn(
            "relative flex touch-none select-none",
            orientation === "vertical" ? "h-full flex-col items-center" : "w-full items-center",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(trackBase, trackSizeClasses[orientation][size])}
          >
            <SliderPrimitive.Range
              data-slot="slider-range"
              className={cn(rangeBase, rangeClasses[variant])}
            />
          </SliderPrimitive.Track>

          {Array.from({ length: thumbCount }).map((_, idx) => (
            <SliderPrimitive.Thumb
              key={`thumb-${idx}`}
              data-slot="slider-thumb"
              className={cn(
                "block rounded-full",
                thumbSizeClasses[size],
                thumbStyle === "solid"
                  ? cn(thumbFillClasses[variant])
                  : cn("border bg-background", thumbBorderClasses[variant]),
                "ring-offset-background transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50"
              )}
            />
          ))}
        </SliderPrimitive.Root>

        {showLabels ? (
          <div data-slot="slider-mark-labels" className={marksLabelContainer} aria-hidden="true">
            {safeMarks
              .filter((m) => m.label != null)
              .map((m) => {
                const pct = ((m.value - min) / (max - min || 1)) * 100
                const style =
                  orientation === "vertical"
                    ? ({ bottom: `${pct}%` } as React.CSSProperties)
                    : ({ left: `${pct}%` } as React.CSSProperties)
                return (
                  <span
                    key={`mark-label-${m.value}`}
                    className={marksLabelText}
                    style={style}
                  >
                    {m.label}
                  </span>
                )
              })}
          </div>
        ) : null}
      </div>
    )
  }
)
Slider.displayName = "Slider"

