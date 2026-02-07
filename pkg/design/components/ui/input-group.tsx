"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Input } from "./input"
import { Textarea } from "./textarea"

export type InputGroupProps = React.HTMLAttributes<HTMLDivElement>

export type InputGroupAddonAlign =
  | "inline-start"
  | "inline-end"
  | "block-start"
  | "block-end"

export type InputGroupAddonProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: InputGroupAddonAlign
}

export type InputGroupInputProps = React.ComponentProps<typeof Input> & {
  /** Set data-slot for focus state handling when used inside InputGroup. */
  "data-slot"?: string
}

export type InputGroupTextareaProps = React.ComponentProps<typeof Textarea> & {
  /** Set data-slot for focus state handling when used inside InputGroup. */
  "data-slot"?: string
}

type InputGroupLayout = "inline" | "block"
const InputGroupLayoutContext = React.createContext<InputGroupLayout>("inline")

/**
 * InputGroup. Wraps an input and addons in a single bordered box.
 *
 * Design intent:
 * - Should feel like a regular `Input` by default (same inset/padding).
 * - Addons live *inside* the control with predictable left/right spacing.
 * - Avoid absolute-positioning surprises across browsers/layouts.
 *
 * Focus order: Place InputGroupAddon *after* InputGroupInput/InputGroupTextarea in the DOM
 * so the focusable control receives focus before addon buttons when tabbing. Use the
 * `align` prop to position the addon visually (inline-start, inline-end, block-start, block-end).
 */
const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const hasBlockAddon = childArray.some(
      (c) =>
        React.isValidElement<InputGroupAddonProps>(c) &&
        (c.props?.align === "block-start" || c.props?.align === "block-end")
    )
    const layout: InputGroupLayout = hasBlockAddon ? "block" : "inline"

    return (
      <InputGroupLayoutContext.Provider value={layout}>
        <div
          ref={ref}
          data-slot="input-group"
          data-layout={layout}
          className={cn(
            "w-full rounded-lg border border-input bg-field",
            "hover:border-border/80 focus-within:border-foreground/40 focus-within:outline-none focus-within:ring-0",
            layout === "inline" && "flex min-h-10 items-center px-3 gap-0",
            // Block layout: header/footer bars + control area inside a single shell.
            layout === "block" && "flex flex-col overflow-visible",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </InputGroupLayoutContext.Provider>
    )
  }
)
InputGroup.displayName = "InputGroup"

/**
 * InputGroupAddon. Renders icons, text, or buttons beside the input. Align: inline-start | inline-end | block-start | block-end.
 */
const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align = "inline-start", ...props }, ref) => {
    const alignClasses = {
      "inline-start": "order-first shrink-0 mr-2",
      "inline-end": "order-last shrink-0 ml-2",
      "block-start":
        "order-first w-full min-w-0 bg-transparent px-3 py-1.5 text-left justify-start",
      "block-end":
        "order-last w-full min-w-0 bg-transparent px-3 pt-1.5 pb-1.5 text-left justify-start",
    }
    return (
      <div
        ref={ref}
        data-slot="input-group-addon"
        data-align={align}
        className={cn(
          "flex items-center text-muted-foreground [&_svg]:shrink-0",
          (align === "inline-start" || align === "inline-end") && "justify-center",
          alignClasses[align],
          className
        )}
        {...props}
      />
    )
  }
)
InputGroupAddon.displayName = "InputGroupAddon"

/**
 * InputGroupInput. Input styled for use inside InputGroup. Pass through to Input with data-slot for focus handling.
 */
const InputGroupInput = React.forwardRef<HTMLInputElement, InputGroupInputProps>(
  ({ className, "data-slot": dataSlot, ...props }, ref) => (
    <InputGroupLayoutContext.Consumer>
      {(layout) => (
        <Input
      ref={ref}
      data-slot={dataSlot ?? "input-group-control"}
      // Force padding to come from the group shell (like a regular Input).
      // This avoids "stretched" placeholder text and keeps right icons padded.
      className={cn(
        "w-full min-w-0",
        "text-left",
        layout === "inline" &&
          "flex-1 border-0 bg-transparent shadow-none hover:border-0 focus-visible:border-0 rounded-none px-0",
        // Block layout: control area gets standard input padding.
        layout === "block" &&
          "border-0 bg-transparent shadow-none hover:border-0 focus-visible:border-0 rounded-none px-3 py-2",
        className
      )}
      {...props}
    />
      )}
    </InputGroupLayoutContext.Consumer>
  )
)
InputGroupInput.displayName = "InputGroupInput"

const InputGroupTextarea = React.forwardRef<HTMLTextAreaElement, InputGroupTextareaProps>(
  ({ className, "data-slot": dataSlot, ...props }, ref) => (
    <InputGroupLayoutContext.Consumer>
      {(layout) => (
        <Textarea
          ref={ref}
          data-slot={dataSlot ?? "input-group-control"}
          className={cn(
            "w-full min-w-0",
            "text-left",
            layout === "inline" &&
              "border-0 bg-transparent shadow-none hover:border-0 focus-visible:border-0 rounded-none px-0",
            layout === "block" &&
              "border-0 bg-transparent shadow-none hover:border-0 focus-visible:border-0 rounded-none px-3 py-2 resize-y",
            className
          )}
          {...props}
        />
      )}
    </InputGroupLayoutContext.Consumer>
  )
)
InputGroupTextarea.displayName = "InputGroupTextarea"

export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea }
