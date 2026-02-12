import { HeroCarousel } from "@/components/hero-carousel"
import { StatsSection } from "@/components/stats-section"
import { CtaSection } from "@/components/cta-section"

import { featureFlags } from "@/config/featureFlags"
import NosotrosPage from "./Nosotros"
import ReportesPage from "./Reportes"

export default function Home() {
    return (
        <div className="flex flex-col">
            <HeroCarousel />

            <div className="bg-background">
                <StatsSection />
            </div>

            <CtaSection />

            {featureFlags.contenidoInstitucional.paginas && (
                <section id="nosotros" className="scroll-mt-16 py-12 bg-background border-b border-border">
                    <NosotrosPage />
                </section>
            )}

            <section id="reportes" className="scroll-mt-16 py-12 bg-muted/30">
                <ReportesPage />
            </section>
        </div>
    )
}
