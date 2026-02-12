import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { featureFlags } from "@/config/featureFlags"

export function CtaSection() {
  return (
    <section className="border-t border-border bg-primary py-16">
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-6">
        <h2 className="text-balance font-serif text-2xl font-bold text-primary-foreground md:text-3xl">
          Juntos podemos hacer la diferencia
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-primary-foreground/80">
          Cada reporte cuenta. Unete a la red de vecinos que estan
          transformando la seguridad de sus colonias.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/reportes">
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold"
            >
              Crear un Reporte
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          {featureFlags.contacto.mapa && (
            <Link to="/mapa">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                Explorar el Mapa
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
