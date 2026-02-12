import { ReportForm } from "@/components/report-form"

export default function ReportesPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-6">
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Crear Reporte de Incidente
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Completa el siguiente formulario para reportar un incidente de
                    seguridad. Tu informacion ayuda a mapear las zonas de riesgo.
                </p>
            </div>
            <ReportForm />
        </div>
    )
}
