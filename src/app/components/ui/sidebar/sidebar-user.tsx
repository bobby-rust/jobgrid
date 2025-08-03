"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Settings,
    Sparkles,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { useLogout, useUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { paths } from "@/config/paths"

export function SidebarUser() {
    const { isMobile } = useSidebar();
    const router = useRouter();

    const user = useUser();
    const logout = useLogout({
        onSuccess: () => {
            console.log("Logged out");
            router.replace(decodeURIComponent(paths.auth.login.getHref()));
        }
    });

    if (!user.data) return <></>

    return (
        <SidebarMenu className="gap-2">
            <SidebarMenuItem>
                <Badge variant="outline" className="rounded-sm bg-muted text-muted-foreground">Credits: 0</Badge>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all cursor-pointer"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarFallback className="rounded-lg text-muted-foreground">{user.data?.email[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.data?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <a href="/account/subscribe" className="flex items-center gap-2 w-full group hover:cursor-pointer">
                                    <Sparkles className="group-hover:text-sidebar-accent-foreground" />
                                    Upgrade to Premium
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <a href="/account" className="flex items-center gap-2 w-full group hover:cursor-pointer">
                                    <BadgeCheck className="group-hover:text-sidebar-accent-foreground" />
                                    Profile
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="/account/billing" className="flex items-center gap-2 w-full hover:cursor-pointer">
                                    <CreditCard className="group-hover:text-sidebar-accent-foreground" />
                                    Billing
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="/account/settings" className="flex items-center gap-2 w-full hover:cursor-pointer">
                                    <Settings className="group-hover:text-sidebar-accent-foreground" />
                                    Settings
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <span onClick={() => logout.mutate()} className="flex items-center gap-2 w-full hover:cursor-pointer">
                                <LogOut className="group-hover:text-sidebar-accent-foreground" />
                                Logout
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}