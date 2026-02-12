"use client"

import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/images/hero-1.jpg",
    title: "Tu seguridad, nuestra prioridad",
    description:
      "Reporta incidentes en tu colonia y ayuda a construir comunidades mas seguras para todos.",
    cta: "Reportar Incidente",
    href: "/reportes",
  },
  {
    image: "/images/hero-2.jpg",
    title: "Mapa interactivo en tiempo real",
    description:
      "Visualiza las zonas de riesgo y puntos criticos cerca de ti con nuestro mapa de incidentes.",
    cta: "Ver Mapa",
    href: "/mapa",
  },
  {
    image: "/images/hero-3.jpg",
    title: "Comunidad unida, colonia segura",
    description:
      "Unete al foro comunitario y colabora con tus vecinos para prevenir delitos en tu zona.",
    cta: "Ir al Foro",
    href: "/foro",
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="relative h-[32rem] w-full overflow-hidden md:h-[36rem] lg:h-[40rem]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-4 pb-16 lg:px-6">
        <div className="max-w-2xl">
          <h1 className="text-balance font-serif text-3xl font-bold tracking-tight text-card md:text-4xl lg:text-5xl">
            {slides[current].title}
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-card/85 md:text-lg">
            {slides[current].description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link to={slides[current].href}>
              <Button size="lg" className="font-semibold">
                {slides[current].cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/20 p-2 backdrop-blur-sm transition-colors hover:bg-card/40"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5 text-card" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/20 p-2 backdrop-blur-sm transition-colors hover:bg-card/40"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5 text-card" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${index === current ? "w-8 bg-card" : "w-2 bg-card/50"
              }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
