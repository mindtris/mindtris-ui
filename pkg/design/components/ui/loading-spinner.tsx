'use client'

import { cn } from '../../lib/utils'
import { Skeleton as DSSkeleton } from './skeleton'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'white' | 'gray'
  className?: string
  text?: string
}

const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
}

const variantClasses = {
  default: 'text-muted-foreground',
  primary: 'text-primary',
  white: 'text-white',
  gray: 'text-muted-foreground'
}

export default function LoadingSpinner({
  size = 'md',
  variant = 'default',
  className,
  text
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="flex items-center space-x-2">
        <svg
          className={cn('animate-spin', sizeClasses[size], variantClasses[variant])}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        {text && <span className={cn('text-sm', variantClasses[variant])}>{text}</span>}
      </div>
    </div>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="card-skeleton"
      className={cn('rounded-xl border border-border bg-card p-4', className)}
      aria-busy="true"
    >
      <DSSkeleton className="h-4 w-3/4" />
      <DSSkeleton className="h-4 w-1/2 mt-2" tone="accent" />
      <DSSkeleton className="mt-4 h-40 w-full" radius="lg" />
      <div className="mt-4 flex items-center gap-2">
        <DSSkeleton className="h-9 w-24" radius="md" />
        <DSSkeleton className="h-9 w-20" radius="md" tone="accent" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden" aria-busy="true">
      <div className="px-6 py-3 border-b border-border">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <DSSkeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="px-6 py-4 border-b border-border last:border-b-0">
          <div className="flex gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <DSSkeleton key={colIndex} className="h-4 flex-1" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
