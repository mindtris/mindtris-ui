import { ReactNode, ComponentType } from 'react'

export interface FooterLink {
    title: string
    href: string
}

export interface FooterColumn {
    title: string
    links: FooterLink[]
}

export interface FooterSocialLink {
    name: string
    icon: string | ReactNode // Can be logical name ('twitter') or component
    href: string
}

export interface FooterBlockData {
    branding: {
        copyrightText: string
        brandName: string
        brandUrl?: string
    }
    columns: FooterColumn[]
    social?: FooterSocialLink[]
    legal?: FooterLink[]
}

export interface FooterBlockSlots {
    logo?: ReactNode
    /** Component to use for navigation links (e.g. next/link) */
    linkComponent?: ComponentType<{ href: string; className?: string; children: ReactNode; target?: string; rel?: string }>
    /** 
     * Optional illustration slot for the bottom area 
     * (e.g., the "Big Text" effect from Simplifi) 
     */
    bottomIllustration?: ReactNode
}

export interface FooterBlockProps {
    data: FooterBlockData
    slots?: FooterBlockSlots
    className?: string
    border?: boolean
}
