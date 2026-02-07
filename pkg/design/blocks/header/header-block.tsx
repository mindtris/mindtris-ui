'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../../components/ui/button'
import Logo from '../../components/ui/logo'
import { Container } from '../../components/layouts'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent
} from '../../components/ui/dropdown'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetHeader,
    SheetTitle
} from '../../components/ui/sheet'
import type { HeaderBlockProps } from './types'

// Default Link Component (fallback to simple a tag if slot not provided)
const DefaultLink = ({ href, className, children, onClick }: any) => (
    <a href={href} className={className} onClick={onClick}>
        {children}
    </a>
)

export function HeaderBlock({
    data,
    slots = {},
    className,
    sticky = true
}: HeaderBlockProps) {
    const [isScrolled, setIsScrolled] = useState(false)

    // Slots resolution
    const LinkComponent = slots.linkComponent || DefaultLink
    const LogoComponent = slots.logo || <Logo />

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Recursive renderer for desktop dropdowns
    const renderDesktopMenuItem = (item: any) => {
        if (item.type === 'dropdown' && item.children) {
            return (
                <DropdownMenu key={item.id}>
                    <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                        {item.title}
                        <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="w-56">
                        {item.children.map((child: any) => {
                            if (child.type === 'dropdown') {
                                // Sub-menu level 1
                                return (
                                    <DropdownMenuSub key={child.id}>
                                        <DropdownMenuSubTrigger>{child.title}</DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            {child.children?.map((sub: any) => (
                                                <DropdownMenuItem key={sub.id} asChild>
                                                    <LinkComponent href={sub.href || '#'} className="cursor-pointer w-full">
                                                        {sub.title}
                                                    </LinkComponent>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                )
                            }

                            // Link item
                            return (
                                <DropdownMenuItem key={child.id} asChild>
                                    <LinkComponent href={child.href || '#'} className="cursor-pointer w-full">
                                        {child.title}
                                    </LinkComponent>
                                </DropdownMenuItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }

        // Standard Link
        return (
            <LinkComponent
                key={item.id}
                href={item.href || '#'}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-ring outline-none"
            >
                {item.title}
            </LinkComponent>
        )
    }

    return (
        <header
            className={cn(
                'w-full z-50 transition-all duration-300',
                sticky ? 'fixed top-0 md:top-6' : 'relative',
                className
            )}
        >
            <Container>
                <div
                    className={cn(
                        "relative flex h-16 items-center justify-between gap-3 px-4 transition-all",
                        // Mimicking the Simplifi glass card style
                        "bg-background/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm"
                    )}
                >
                    {/* Logo Area */}
                    <div className="flex items-center shrink-0">
                        {LogoComponent}
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:gap-1 lg:gap-2">
                        {data.items.map(renderDesktopMenuItem)}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {slots.rightActionSlot}

                        <div className="hidden md:flex gap-3">
                            {data.ctaItems?.map((cta, idx) => (
                                <Button
                                    key={idx}
                                    variant={cta.variant || (cta.type === 'primary' ? 'primary' : 'ghost')}
                                    size="sm"
                                    fullWidth={false}
                                    render={
                                        <LinkComponent href={cta.href}>
                                            {cta.title}
                                        </LinkComponent>
                                    }
                                >
                                    {cta.title}
                                </Button>
                            ))}
                        </div>

                        {/* Mobile Menu via Sheet */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <button className="p-2 text-muted-foreground hover:text-foreground">
                                        {slots.menuIcon || <Menu className="w-5 h-5" />}
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                    <SheetHeader className="px-1 text-left">
                                        <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-6 mt-6 overflow-y-auto">
                                        <nav className="flex flex-col space-y-4">
                                            {data.items.map((item) => (
                                                <div key={item.id} className="flex flex-col gap-2">
                                                    {item.type === 'link' ? (
                                                        <SheetClose asChild>
                                                            <LinkComponent
                                                                href={item.href || '#'}
                                                                className="text-lg font-medium text-foreground py-1"
                                                            >
                                                                {item.title}
                                                            </LinkComponent>
                                                        </SheetClose>
                                                    ) : (
                                                        <div className="flex flex-col gap-2">
                                                            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                                                {item.title}
                                                            </span>
                                                            <div className="pl-4 flex flex-col gap-2 border-l border-border ml-1">
                                                                {item.children?.map((child) => (
                                                                    <SheetClose asChild key={child.id}>
                                                                        <LinkComponent
                                                                            href={child.href || '#'}
                                                                            className="text-base text-foreground/80 hover:text-foreground py-1"
                                                                        >
                                                                            {child.title}
                                                                        </LinkComponent>
                                                                    </SheetClose>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </nav>

                                        <div className="flex flex-col gap-3 pt-4 border-t border-border">
                                            {data.ctaItems?.map((cta, idx) => (
                                                <SheetClose asChild key={idx}>
                                                    <Button
                                                        variant={cta.variant || 'primary'}
                                                        fullWidth
                                                        render={
                                                            <LinkComponent href={cta.href}>
                                                                {cta.title}
                                                            </LinkComponent>
                                                        }
                                                    >
                                                        {cta.title}
                                                    </Button>
                                                </SheetClose>
                                            ))}
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    )
}
