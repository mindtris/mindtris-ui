'use client'

import React from 'react'
import { Twitter, Instagram, Facebook, Youtube, Linkedin, Hash, Github } from 'lucide-react'
import { cn } from '../../lib/utils'
import Logo from '../../components/ui/logo'
import { Container } from '../../components/layouts'
import type { FooterBlockProps, FooterSocialLink } from './types'

// Default Link Component
const DefaultLink = ({ href, className, children, target, rel }: any) => (
    <a href={href} className={className} target={target} rel={rel}>
        {children}
    </a>
)

// Helper for standard social icons
function SocialIconRenderer({ icon }: { icon: string | React.ReactNode }) {
    if (React.isValidElement(icon)) return icon as React.ReactElement

    const props = { size: 24, className: "w-5 h-5" }
    switch (icon) {
        case 'twitter': return <Twitter {...props} />
        case 'instagram': return <Instagram {...props} />
        case 'facebook': return <Facebook {...props} />
        case 'youtube': return <Youtube {...props} />
        case 'linkedin': return <Linkedin {...props} />
        case 'github': return <Github {...props} /> // Added github
        case 'threads': return <Hash {...props} />
        default: return null
    }
}

export function FooterBlock({
    data,
    slots = {},
    className,
    border = false
}: FooterBlockProps) {
    const LinkComponent = slots.linkComponent || DefaultLink
    const LogoComponent = slots.logo || <Logo />

    const { branding, columns, social, legal } = data

    return (
        <footer className={cn("bg-background text-foreground", className)}>
            <Container>
                {/* Main Grid Area */}
                <div
                    className={cn(
                        "grid gap-10 py-8 sm:grid-cols-12 md:py-12",
                        border && "border-t border-border"
                    )}
                >
                    {/* Brand Column (Col 1) */}
                    <div className="space-y-4 sm:col-span-12 lg:col-span-4">
                        <div className="-ml-3 flex items-center">
                            {LogoComponent}
                        </div>

                        <div className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} {branding.brandName} by{" "}
                            {branding.brandUrl ? (
                                <LinkComponent
                                    href={branding.brandUrl}
                                    className="font-medium hover:text-foreground transition-colors"
                                    target="_blank"
                                >
                                    {branding.brandName}
                                </LinkComponent>
                            ) : (
                                <span className="font-medium">{branding.brandName}</span>
                            )}
                            . {branding.copyrightText}
                        </div>

                        {legal && legal.length > 0 && (
                            <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
                                {legal.map((item, index) => (
                                    <span key={index} className="flex items-center gap-2">
                                        <LinkComponent href={item.href} className="hover:text-foreground transition-colors">
                                            {item.title}
                                        </LinkComponent>
                                        {index < legal.length - 1 && <span className="opacity-50">|</span>}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Links Columns */}
                    {columns.map((col, idx) => (
                        <div key={idx} className="space-y-3 sm:col-span-6 md:col-span-3 lg:col-span-2">
                            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
                                {col.title}
                            </h3>
                            <ul className="space-y-2.5 text-sm">
                                {col.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <LinkComponent
                                            href={link.href}
                                            className="text-muted-foreground transition hover:text-foreground hover:underline"
                                        >
                                            {link.title}
                                        </LinkComponent>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social Column (merged into last column or separate depending on design) */}
                    {/* For this block, let's put it as a separate block if we have space, or under the last column */}
                    <div className="space-y-3 sm:col-span-6 md:col-span-3 lg:col-span-2">
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">Social</h3>
                        {social && (
                            <ul className="flex flex-wrap gap-3 items-center">
                                {social.map((item, idx) => (
                                    <li key={idx}>
                                        <LinkComponent
                                            href={item.href}
                                            className="flex items-center justify-center text-muted-foreground transition hover:text-primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={item.name}
                                        >
                                            <SocialIconRenderer icon={item.icon} />
                                        </LinkComponent>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </Container>

            {/* Bottom Illustration Slot */}
            {slots.bottomIllustration && (
                <div className="w-full overflow-hidden" aria-hidden="true">
                    {slots.bottomIllustration}
                </div>
            )}
        </footer>
    )
}
