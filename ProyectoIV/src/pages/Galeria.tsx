import { EvidenceGallery } from "@/components/evidence-gallery"
import { VideoSection } from "@/components/video-section"

export default function GaleriaPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Galeria de Evidencias
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Repositorio multimedia para revisar evidencias de incidentes
                    reportados y contenido educativo de prevencion.
                </p>
            </div>
            <EvidenceGallery />
            <VideoSection />
        </div>
    )
}
