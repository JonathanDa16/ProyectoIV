"use client"

import { Link } from "react-router-dom"
import {
  Map,
  MessageSquare,
  Camera,
  ShoppingBag,
  FileText,
  Phone,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { featureFlags } from "@/config/featureFlags"

const features = [
  {
    icon: Map,
    title: "Mapa de Incidentes",
    description:
      "Visualiza en tiempo real los puntos criticos y zonas de riesgo de tu colonia en un mapa interactivo.",
    href: "/mapa",
    color: "bg-primary/10 text-primary",
    enabled: featureFlags.contacto.mapa,
  },
  {
    icon: FileText,
    title: "Reportes Ciudadanos",
    description:
      "Envia reportes detallados de incidentes con evidencias fotograficas y ubicacion exacta.",
    href: "/#reportes",
    color: "bg-accent/10 text-accent",
    enabled: true,
  },
  {
    icon: MessageSquare,
    title: "Foro Comunitario",
    description:
      "Comparte alertas y coordina con tus vecinos para mantener la seguridad de la colonia.",
    href: "/foro",
    color: "bg-success/10 text-success",
    enabled: featureFlags.interaccion.foroFaq,
  },
  {
    icon: Camera,
    title: "Galeria de Evidencias",
    description:
      "Repositorio multimedia organizado para revisar fotos y videos de incidentes reportados.",
    href: "/galeria",
    color: "bg-warning/10 text-warning",
    enabled: featureFlags.multimedia.galeria,
  },
  {
    icon: ShoppingBag,
    title: "Tienda de Seguridad",
    description:
      "Catalogo de articulos de seguridad: camaras, alarmas, sensores y mas para tu hogar.",
    href: "/tienda",
    color: "bg-destructive/10 text-destructive",
    enabled: featureFlags.multimedia.tienda,
  },
  {
    icon: Phone,
    title: "Contacto Directo",
    description:
      "Formulario de contacto para autoridades y ciudadanos que deseen mas informacion.",
    href: "/contacto",
    color: "bg-primary/10 text-primary",
    enabled: featureFlags.contacto.formulario,
  },
].filter(f => f.enabled)

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-balance font-serif text-2xl font-bold text-foreground md:text-3xl">
            Herramientas para una comunidad mas segura
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Nuestra plataforma integra multiples funcionalidades para que
            ciudadanos y autoridades trabajen juntos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.href} to={feature.href}>
                <Card className="group h-full transition-all hover:border-primary/30 hover:shadow-md">
                  <CardHeader>
                    <div
                      className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent />
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
