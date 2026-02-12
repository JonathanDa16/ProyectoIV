import { Link } from "react-router-dom"
import { Shield, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

import { featureFlags } from "@/config/featureFlags"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight text-foreground">
                  Vigilancia Vecinal
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  UDGVIRTUAL
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Plataforma de seguridad comunitaria enfocada en reducir la
              percepcion de inseguridad a traves de la participacion ciudadana y
              la tecnologia.
            </p>
            {featureFlags.interaccion.redesSociales && (
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              Plataforma
            </h3>
            <nav className="flex flex-col gap-2">
              {featureFlags.contacto.mapa && (
                <Link
                  to="/mapa"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Mapa de Incidentes
                </Link>
              )}
              <Link
                to="/#reportes"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Reportes
              </Link>
              {featureFlags.interaccion.foroFaq && (
                <Link
                  to="/foro"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Foro Comunitario
                </Link>
              )}
              {featureFlags.multimedia.galeria && (
                <Link
                  to="/galeria"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Galeria de Evidencias
                </Link>
              )}
              {featureFlags.multimedia.tienda && (
                <Link
                  to="/tienda"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Tienda de Seguridad
                </Link>
              )}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              Institucional
            </h3>
            <nav className="flex flex-col gap-2">
              {featureFlags.contenidoInstitucional.paginas && (
                <>
                  <Link
                    to="/#nosotros"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Mision y Vision
                  </Link>
                  <Link
                    to="/#politicas"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Politicas de Calidad
                  </Link>
                  <Link
                    to="/#equipo"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Equipo
                  </Link>
                </>
              )}
              {featureFlags.interaccion.foroFaq && (
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Preguntas Frecuentes
                </Link>
              )}
            </nav>
          </div>

          {featureFlags.contenidoInstitucional.paginas && (
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">Contacto</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <p>Av. La Paz 2453, Col. Arcos Vallarta</p>
                <p>Guadalajara, Jalisco, Mexico</p>
                <p>CP 44130</p>
                <a
                  href="mailto:contacto@vigilanciavecinal.mx"
                  className="transition-colors hover:text-foreground"
                >
                  contacto@vigilanciavecinal.mx
                </a>
                <a
                  href="tel:+523312345678"
                  className="transition-colors hover:text-foreground"
                >
                  +52 (33) 1234-5678
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            2025 Vigilancia Vecinal - UDGVIRTUAL. Prototipo academico. Todos
            los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Desarrollado por: Jonathan Daniel Gomez, Raymundo Chavarria y
            Cristian Martin Orozco
          </p>
        </div>
      </div>
    </footer>
  )
}
