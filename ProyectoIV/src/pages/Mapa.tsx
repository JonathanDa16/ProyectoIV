import { IncidentMap } from "@/components/incident-map"

export default function MapaPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-8 animate-fade-up">
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Mapa de Incidentes
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Visualiza los puntos criticos y zonas de riesgo detectadas en la Zona
                    Metropolitana de Guadalajara. Los marcadores indican incidentes
                    reportados por los ciudadanos.
                </p>
            </div>
            <IncidentMap />
        </div>
    )
}
