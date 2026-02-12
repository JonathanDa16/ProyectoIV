import { HeroCarousel } from "@/components/hero-carousel"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { CtaSection } from "@/components/cta-section"

export default function Home() {
    return (
        <>
            <HeroCarousel />
            <StatsSection />
            <FeaturesSection />
            <CtaSection />
        </>
    )
}
