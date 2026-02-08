"use client"

import * as React from 'react'
import { cn } from './lib/utils'

/**
 * Layout primitives (root-level so consuming bundlers can resolve without ./components/ paths).
 * Canonical source for Container, Page, Section, Grid, Stack.
 */

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  center?: boolean
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
  none: '',
}

const paddingClasses = {
  none: '',
  sm: 'px-4',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-4 sm:px-6 lg:px-8 xl:px-12',
}

export function Container({
  children,
  maxWidth = '2xl',
  padding = 'md',
  center = true,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full',
        maxWidth !== 'none' && maxWidthClasses[maxWidth],
        padding !== 'none' && paddingClasses[padding],
        center && 'mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  maxWidth?: ContainerProps['maxWidth']
  padding?: ContainerProps['padding']
}

export function Page({
  children,
  title,
  description,
  maxWidth = '2xl',
  padding = 'md',
  className,
  ...props
}: PageProps) {
  return (
    <div className={cn('min-h-screen', className)} {...props}>
      <Container maxWidth={maxWidth} padding={padding}>
        {(title || description) && (
          <div className="mb-8">
            {title && <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{title}</h1>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </div>
  )
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  description?: string
  maxWidth?: ContainerProps['maxWidth']
  padding?: ContainerProps['padding']
}

export function Section({
  children,
  title,
  description,
  maxWidth = '2xl',
  padding = 'md',
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn('py-8 md:py-12', className)} {...props}>
      <Container maxWidth={maxWidth} padding={padding}>
        {(title || description) && (
          <div className="mb-6">
            {title && <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">{title}</h2>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const gapClasses = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

export function Grid({
  children,
  cols = 1,
  colsSm,
  colsMd,
  gap = 'md',
  className,
  ...props
}: GridProps) {
  const colsClass = `grid-cols-${cols}`
  const colsSmClass = colsSm ? `sm:grid-cols-${colsSm}` : ''
  const colsMdClass = colsMd ? `md:grid-cols-${colsMd}` : ''

  return (
    <div
      className={cn(
        'grid',
        colsClass,
        colsSmClass,
        colsMdClass,
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  wrap?: boolean
}

export function Stack({
  children,
  direction = 'col',
  align,
  justify,
  gap = 'md',
  wrap = false,
  className,
  ...props
}: StackProps) {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }

  return (
    <div
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        align && alignClasses[align],
        justify && justifyClasses[justify],
        gapClasses[gap],
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
