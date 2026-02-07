'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Input } from './input'
import { Separator } from './separator'

export type SidebarVariant = 'sidebar' | 'floating' | 'inset'
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none'
export type SidebarSide = 'left' | 'right'

export interface SidebarLinkProps {
  children: React.ReactNode
  href: string
  /** Controlled active state (app determines current route). */
  active?: boolean
  /** Optional leading icon. */
  leadingIcon?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  className?: string
}

/**
 * SidebarLink: route-agnostic link styling with optional leading icon.
 */
export function SidebarLink({
  children,
  href,
  active = false,
  leadingIcon,
  onClick,
  className,
}: SidebarLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 truncate rounded-md px-2.5 py-2 text-sm font-medium transition-colors cursor-pointer',
        active
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        className
      )}
    >
      {leadingIcon}
      <span className="truncate">{children}</span>
    </a>
  )
}

export interface SidebarLinkGroupProps {
  children: (handleClick: () => void, openGroup: boolean) => React.ReactNode
  open?: boolean
  className?: string
}

/**
 * SidebarLinkGroup: UI-only disclosure wrapper for grouped nav.
 */
export function SidebarLinkGroup({ children, open = false, className }: SidebarLinkGroupProps) {
  const [openGroup, setOpenGroup] = React.useState<boolean>(open)
  const handleClick = () => setOpenGroup((v) => !v)

  return (
    <li className={cn('pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 group', className)}>
      {children(handleClick, openGroup)}
    </li>
  )
}

export interface SidebarMenuButtonProps extends React.ComponentProps<'button'> {
  /** Controlled active state. */
  isActive?: boolean
  /** Optional leading icon. */
  leadingIcon?: React.ReactNode
}

/**
 * SidebarMenuButton: nav item with optional icon and label.
 */
export function SidebarMenuButton({
  children,
  isActive = false,
  leadingIcon,
  className,
  ...props
}: SidebarMenuButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-2 overflow-hidden rounded-md px-2.5 py-2 text-left text-sm outline-none transition-colors cursor-pointer',
        'text-muted-foreground hover:bg-muted hover:text-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring',
        isActive && 'bg-muted text-foreground font-medium',
        '[&>svg]:size-4 [&>svg]:shrink-0 [&>span:last-child]:truncate',
        className
      )}
      data-active={isActive}
      {...props}
    >
      {leadingIcon}
      {children != null && children !== '' ? <span className="truncate">{children}</span> : null}
    </button>
  )
}

export interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  showBackdrop?: boolean
  variant?: SidebarVariant
  collapsible?: SidebarCollapsible
  side?: SidebarSide
  className?: string
  headerSlot?: React.ReactNode
  footerSlot?: React.ReactNode
  children?: React.ReactNode
}

/**
 * Sidebar: layout chrome with variants (sidebar, floating, inset). Controlled state.
 */
export default function Sidebar({
  open,
  onOpenChange,
  showBackdrop = true,
  variant = 'sidebar',
  collapsible = 'none',
  side = 'left',
  className,
  headerSlot,
  footerSlot,
  children,
}: SidebarProps) {
  const sidebarRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!sidebarRef.current?.contains(e.target as Node)) onOpenChange(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onOpenChange])

  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onOpenChange])

  const containerChrome =
    variant === 'sidebar'
      ? side === 'left'
        ? 'border-r border-sidebar-border bg-sidebar text-sidebar-foreground'
        : 'border-l border-sidebar-border bg-sidebar text-sidebar-foreground'
      : cn(
          'rounded-xl border border-sidebar-border bg-sidebar text-sidebar-foreground',
          'shadow-[var(--shadow-sm)]',
          variant === 'floating' && 'm-2',
          variant === 'inset' && 'm-2'
        )

  const widthClasses = collapsible === 'icon' ? 'w-64 lg:w-14 lg:hover:w-64' : 'w-64'
  const mobilePosition = side === 'left' ? 'left-0' : 'right-0'
  const mobileClosedTranslate = side === 'left' ? '-translate-x-full' : 'translate-x-full'

  return (
    <div className={cn('min-w-fit', className)} data-variant={variant} data-collapsible={collapsible} data-side={side}>
      {showBackdrop ? (
        <div
          className={cn(
            'fixed inset-0 z-40 lg:hidden transition-opacity duration-200',
            open ? 'opacity-100 bg-foreground/20' : 'opacity-0 pointer-events-none'
          )}
          aria-hidden
          onClick={() => onOpenChange(false)}
        />
      ) : null}

      <div
        ref={sidebarRef}
        className={cn(
          'flex flex-col absolute z-50 lg:static top-0 lg:translate-x-0 min-h-[280px] lg:min-h-[100dvh] overflow-y-auto transition-all duration-200 ease-out',
          mobilePosition,
          widthClasses,
          containerChrome,
          open ? 'translate-x-0' : mobileClosedTranslate
        )}
        aria-hidden={!open && collapsible === 'offcanvas'}
      >
        {headerSlot != null ? <div className="shrink-0">{headerSlot}</div> : null}
        <div className="flex-1 min-h-0 overflow-auto">{children}</div>
        {footerSlot != null ? <div className="shrink-0 border-t border-sidebar-border">{footerSlot}</div> : null}
      </div>
    </div>
  )
}

export function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn('flex flex-col gap-2 p-3', className)}
      {...props}
    />
  )
}

export function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn('flex flex-col gap-2 p-3', className)}
      {...props}
    />
  )
}

export function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto', className)}
      {...props}
    />
  )
}

export function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  )
}

export function SidebarGroupLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

export function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group-content" className={cn('w-full text-sm', className)} {...props} />
}

export function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn('flex w-full min-w-0 flex-col gap-0.5 list-none p-0 m-0', className)}
      {...props}
    />
  )
}

export function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li data-slot="sidebar-menu-item" className={cn('group/menu-item relative', className)} {...props} />
  )
}

export function SidebarInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      className="shadow-none"
      {...props}
    />
  )
}

export function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  )
}
