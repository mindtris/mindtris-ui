import { ReactNode, ComponentType, ElementType } from 'react'
import type { ButtonProps } from '../../components/ui/button'

export interface HeaderLinkItem {
  id: string
  title: string
  href?: string
  type: 'link' | 'dropdown'
  children?: HeaderLinkItem[]
}

export interface HeaderCtaItem {
  title: string
  href: string
  type?: 'primary' | 'secondary' | 'external'
  variant?: ButtonProps['variant']
}

export interface HeaderBlockData {
  items: HeaderLinkItem[]
  ctaItems?: HeaderCtaItem[]
}

export interface HeaderBlockSlots {
  logo?: ReactNode
  /** Component to use for navigation links (e.g. next/link) */
  linkComponent?: ComponentType<{ href: string; className?: string; children: ReactNode; onClick?: () => void }>
  /** Custom mobile menu trigger icon */
  menuIcon?: ReactNode
  /** Custom mobile menu close icon */
  closeIcon?: ReactNode
  /** Slot for extra content on the right (like theme toggle) */
  rightActionSlot?: ReactNode
}

export interface HeaderBlockProps {
  data: HeaderBlockData
  slots?: HeaderBlockSlots
  className?: string
  /**
   * Sticky mode
   * @default true
   */
  sticky?: boolean
}
