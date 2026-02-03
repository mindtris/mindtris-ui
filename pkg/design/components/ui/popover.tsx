'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '../../lib/utils'

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>
export type PopoverTriggerProps = React.ComponentProps<typeof PopoverPrimitive.Trigger>
export type PopoverAnchorProps = React.ComponentProps<typeof PopoverPrimitive.Anchor>
export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      data-slot="popover-content"
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-[9999] w-72 rounded-lg border border-border bg-popover text-popover-foreground p-4 shadow-lg outline-hidden',
        'origin-[--radix-popover-content-transform-origin]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent }
