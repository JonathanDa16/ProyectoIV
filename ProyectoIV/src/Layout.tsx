import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatWidget } from "@/components/chat-widget";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import { featureFlags } from "@/config/featureFlags";

export default function Layout() {
  React.useEffect(() => {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    if (!featureFlags.identidadCorporativa.favicon) {
      link.setAttribute("href", "data:;"); // Empty data URI to hide favicon
    } else {
      // Restore default favicon if needed, or assume it's already set in HTML
      // If we wanted to enforce a specific one, we could set it here.
      link.setAttribute("href", "/vite.png");
    }
  }, []);

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col font-sans antialiased">
        {featureFlags.interfaz.menuPrincipal && <SiteHeader />}
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        {featureFlags.interaccion.chat && <ChatWidget />}
        <Toaster />
      </div>
    </AuthProvider>
  );
}
