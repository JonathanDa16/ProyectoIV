import React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChatWidget } from "@/components/chat-widget"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <AuthProvider>
            <div className="flex min-h-screen flex-col font-sans antialiased">
                <SiteHeader />
                <main className="flex-1">
                    <Outlet />
                </main>
                <SiteFooter />
                <ChatWidget />
                <Toaster />
            </div>
        </AuthProvider>
    )
}
