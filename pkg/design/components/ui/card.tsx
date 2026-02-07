'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

const CardSizeContext = React.createContext<'default' | 'sm'>('default')

export interface CardProps {
  children: React.ReactNode
  className?: string
  /** Size variant: default or compact spacing. */
  size?: 'default' | 'sm'
  /** Shadow: app opts in. Use "none" for flat, or token-driven shadow. */
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'gray' | 'transparent'
  hover?: boolean
}

export default function Card({
  children,
  className = '',
  size = 'default',
  shadow = 'none',
  border = true,
  rounded = 'lg',
  background = 'white',
  hover = false
}: CardProps) {
  const shadowClasses = {
    none: '',
    sm: 'shadow-[var(--shadow-sm)]',
    md: 'shadow-[var(--shadow-md)]',
    lg: 'shadow-[var(--shadow-lg)]'
  }

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  }

  const backgroundClasses = {
    white: 'bg-card',
    gray: 'bg-muted',
    transparent: 'bg-transparent'
  }

  return (
    <CardSizeContext.Provider value={size}>
      <div
        data-slot="card"
        data-size={size}
        className={cn(
          'relative overflow-hidden flex flex-col',
          shadowClasses[shadow],
          border && 'border border-border',
          roundedClasses[rounded],
          backgroundClasses[background],
          hover && 'transition-all duration-200 hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5',
          className
        )}
      >
        {children}
      </div>
    </CardSizeContext.Provider>
  )
}

export function DashboardCard({ children, className, ...props }: Omit<CardProps, 'shadow' | 'border' | 'rounded'>) {
  return (
    <Card size="default" shadow="md" border rounded="lg" background="white" className={className} {...props}>
      {children}
    </Card>
  )
}

export function StatCard({ children, className, ...props }: Omit<CardProps, 'shadow' | 'border' | 'rounded'>) {
  return (
    <Card size="default" shadow="sm" border rounded="md" background="white" className={className} {...props}>
      {children}
    </Card>
  )
}

export function SimpleCard({ children, className, ...props }: Omit<CardProps, 'shadow' | 'border' | 'rounded'>) {
  return (
    <Card size="default" shadow="none" border={false} rounded="none" background="transparent" className={className} {...props}>
      {children}
    </Card>
  )
}

function useCardSize() {
  return React.useContext(CardSizeContext)
}

export interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

/** Header with optional CardTitle, CardDescription, CardAction. CardAction appears top-right. */
export function CardHeader({ children, className = '' }: CardHeaderProps) {
  const size = useCardSize()
  const padding = size === 'sm' ? 'p-4' : 'p-6'
  return (
    <div data-slot="card-header" className={cn('grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5', padding, className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h3 data-slot="card-title" className={cn('text-lg font-semibold text-foreground', className)}>{children}</h3>
}

export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p data-slot="card-description" className={cn('text-sm text-muted-foreground mt-1', className)}>{children}</p>
}

/** Places content in the top-right of the header (e.g. button, badge). */
export function CardAction({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-slot="card-action" className={cn('col-start-2 row-span-2 row-start-1 self-start', className)}>
      {children}
    </div>
  )
}

/** Image or media before the header. Full-width, rounded top. Place as first child of Card. */
export function CardImage({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-slot="card-image" className={cn('overflow-hidden rounded-t-lg w-full bg-muted', className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const size = useCardSize()
  const padding = size === 'sm' ? 'px-4 pb-4' : 'px-6 pb-6'
  return <div data-slot="card-content" className={cn(padding, className)}>{children}</div>
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const size = useCardSize()
  const padding = size === 'sm' ? 'p-4 pt-0' : 'p-6 pt-0'
  return <div data-slot="card-footer" className={cn('border-t border-border', padding, className)}>{children}</div>
}
