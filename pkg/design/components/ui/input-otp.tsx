"use client"

import * as React from "react"
import { OTPInput, type SlotProps } from "input-otp"

import { cn } from "../../lib/utils"

type InputOTPRenderState = {
  slots: SlotProps[]
} & Record<string, unknown>

/** "connected" = slots share borders (strip). "boxed" = 6 square boxes with gap. */
export type InputOTPSlotVariant = "connected" | "boxed"

const InputOTPContext = React.createContext<InputOTPRenderState | null>(null)
const InputOTPVariantContext = React.createContext<InputOTPSlotVariant>("connected")

function useInputOTPContext() {
  const ctx = React.useContext(InputOTPContext)
  if (!ctx) {
    throw new Error("InputOTPSlot must be used within InputOTP.")
  }
  return ctx
}

function useInputOTPVariant() {
  return React.useContext(InputOTPVariantContext)
}

export type InputOTPProps = Omit<React.ComponentProps<typeof OTPInput>, "render" | "containerClassName"> & {
  /** The visual container classes (token-driven). */
  containerClassName?: string
  /** Slot layout: connected (strip) or boxed (6 square boxes with gap). Default connected. */
  slotVariant?: InputOTPSlotVariant
  /** Rendered slot structure (use `InputOTPGroup` + `InputOTPSlot`). */
  children: React.ReactNode
}

/**
 * InputOTP
 * Compound OTP input primitive built on top of `input-otp`.
 *
 * Design-system rules:
 * - Token-driven styling only
 * - Minimal state (delegates behavior to `input-otp`)
 * - No hidden side effects
 */
export function InputOTP({
  className,
  containerClassName,
  children,
  disabled,
  slotVariant = "connected",
  ...props
}: InputOTPProps) {
  return (
    <OTPInput
      data-slot="input-otp"
      data-slot-variant={slotVariant}
      data-disabled={disabled ? "true" : undefined}
      disabled={disabled}
      className={className}
      containerClassName={cn(
        "group flex items-center",
        slotVariant === "connected" && "gap-2",
        slotVariant === "boxed" && "gap-3",
        disabled ? "cursor-not-allowed opacity-50" : undefined,
        containerClassName
      )}
      render={(renderProps: any) => (
        <InputOTPVariantContext.Provider value={slotVariant}>
          <InputOTPContext.Provider value={renderProps as InputOTPRenderState}>{children}</InputOTPContext.Provider>
        </InputOTPVariantContext.Provider>
      )}
      {...props}
    />
  )
}

export type InputOTPGroupProps = React.HTMLAttributes<HTMLDivElement>

/** Groups multiple `InputOTPSlot`s into a single segmented control. */
export function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  const variant = useInputOTPVariant()
  return (
    <div
      data-slot="input-otp-group"
      data-variant={variant}
      className={cn(
        "flex items-center",
        variant === "boxed" && "gap-3",
        className
      )}
      {...props}
    />
  )
}

export type InputOTPSeparatorOrientation = "vertical" | "horizontal"

export type InputOTPSeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Vertical = thin line between groups (default). Horizontal = dash between groups. */
  orientation?: InputOTPSeparatorOrientation
}

/** Visual separator between OTP groups. */
export function InputOTPSeparator({ orientation = "vertical", className, ...props }: InputOTPSeparatorProps) {
  return (
    <div
      data-slot="input-otp-separator"
      data-orientation={orientation}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 self-center bg-border",
        orientation === "vertical" && "mx-2 h-4 w-px",
        orientation === "horizontal" && "my-0 mx-1.5 h-px w-4",
        className
      )}
      {...props}
    />
  )
}

export type InputOTPSize = "sm" | "md" | "lg"

const slotSizeClasses: Record<InputOTPSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
}

export type InputOTPSlotProps = React.HTMLAttributes<HTMLDivElement> & {
  index: number
  /** Slot size; defaults to md to match Input. */
  size?: InputOTPSize
}

export function InputOTPSlot({ index, size = "md", className, ...props }: InputOTPSlotProps) {
  const { slots } = useInputOTPContext()
  const variant = useInputOTPVariant()
  const slot = slots[index]

  if (!slot) {
    return null
  }

  const isBoxed = variant === "boxed"

  return (
    <div
      data-slot="input-otp-slot"
      data-active={slot.isActive ? "true" : "false"}
      data-variant={variant}
      className={cn(
        "relative flex items-center justify-center",
        "transition-[border-color,background-color] duration-150 ease-out",
        "hover:border-border/80",
        "data-[active=true]:border-foreground/40 data-[active=true]:outline-none data-[active=true]:ring-0",
        "aria-invalid:border-destructive",
        "group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:opacity-50",
        isBoxed
          ? "border border-input rounded-lg bg-field text-foreground"
          : "border-y border-r border-input bg-field text-foreground first:rounded-l-lg first:border-l last:rounded-r-lg",
        slotSizeClasses[size],
        className
      )}
      {...props}
    >
      <span
        data-slot="input-otp-slot-char"
        className={cn(slot.char ? "text-foreground" : "text-muted-foreground")}
      >
        {slot.char ?? slot.placeholderChar}
      </span>

      {slot.hasFakeCaret ? (
        <span
          data-slot="input-otp-slot-caret"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="h-4 w-px bg-foreground animate-pulse" />
        </span>
      ) : null}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Single-box OTP (one input field, same tokens as Input – e.g. multi-factor verify)
// ---------------------------------------------------------------------------

const singleSizeClasses: Record<InputOTPSize, string> = {
  sm: "h-8 text-xs px-2.5 rounded-md",
  md: "h-10 text-sm px-3 rounded-lg",
  lg: "h-12 text-base px-4 rounded-lg",
}

export type InputOTPSingleProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  /** Max length (e.g. 4 or 6). */
  maxLength?: number
  /** Restrict to digits only; otherwise alphanumeric. */
  digitsOnly?: boolean
  /** Size; defaults to md. */
  size?: InputOTPSize
}

/**
 * InputOTPSingle
 * Single input box for OTP/code entry (e.g. multi-factor verification).
 * Styled like Input; supports digits-only or alphanumeric, sizes, and controlled value.
 */
export const InputOTPSingle = React.forwardRef<HTMLInputElement, InputOTPSingleProps>(
  ({ className, maxLength = 6, digitsOnly = true, size = "md", value, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let next = e.target.value
      if (digitsOnly) next = next.replace(/\D/g, "")
      if (maxLength != null) next = next.slice(0, maxLength)
      e.target.value = next
      onChange?.(e)
    }

    return (
      <input
        ref={ref}
        type="text"
        inputMode={digitsOnly ? "numeric" : "text"}
        autoComplete="one-time-code"
        data-slot="input-otp-single"
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        className={cn(
          "w-full rounded-lg border border-input bg-field text-foreground leading-5 shadow-none",
          "placeholder:text-muted-foreground",
          "transition-[border-color] duration-150 ease-out",
          "hover:border-border/80 focus:outline-none focus:ring-0 focus:border-foreground/40",
          "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
          "aria-invalid:border-destructive",
          singleSizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
InputOTPSingle.displayName = "InputOTPSingle"

