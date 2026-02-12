"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Calendar, MapPin, Eye, X } from "lucide-react"

interface Evidence {
  id: number
  image: string
  title: string
  type: string
  date: string
  location: string
  description: string
  category: "foto" | "video"
}

const evidences: Evidence[] = [
  {
    id: 1,
    image: "/images/evidence-1.jpg",
    title: "Falla en alumbrado - Calle Morelos",
    type: "Falta de alumbrado",
    date: "15 Ene 2025",
    location: "Calle Morelos #234",
    description:
      "Luminaria completamente apagada generando zona oscura. Reportado al municipio.",
    category: "foto",
  },
  {
    id: 2,
    image: "/images/evidence-2.jpg",
    title: "Vandalismo en parque central",
    type: "Vandalismo",
    date: "14 Ene 2025",
    location: "Parque de la Colonia Centro",
    description:
      "Grafiti y daño a mobiliario urbano. Se solicita limpieza y vigilancia.",
    category: "foto",
  },
  {
    id: 3,
    image: "/images/evidence-3.jpg",
    title: "Accidente vial en cruce",
    type: "Accidente",
    date: "13 Ene 2025",
    location: "Av. Juarez esq. Reforma",
    description:
      "Colision vehicular en cruce sin semaforo. Se requiere señalamiento.",
    category: "foto",
  },
  {
    id: 4,
    image: "/images/evidence-4.jpg",
    title: "Intento de robo a comercio",
    type: "Robo",
    date: "12 Ene 2025",
    location: "Calle Independencia #456",
    description:
      "Cortina metalica dañada tras intento de robo nocturno. Camara capturo evidencia.",
    category: "foto",
  },
  {
    id: 5,
    image: "/images/evidence-5.jpg",
    title: "Reunion de vigilancia vecinal",
    type: "Organizacion",
    date: "11 Ene 2025",
    location: "Plaza comunitaria",
    description:
      "Vecinos organizandose para rondines de vigilancia en la colonia.",
    category: "foto",
  },
  {
    id: 6,
    image: "/images/evidence-6.jpg",
    title: "Apagon en zona residencial",
    type: "Infraestructura",
    date: "10 Ene 2025",
    location: "Col. Americana",
    description:
      "Tres cuadras sin iluminacion publica por falla en transformador.",
    category: "foto",
  },
]

const typeColors: Record<string, string> = {
  "Falta de alumbrado": "bg-warning/10 text-warning",
  Vandalismo: "bg-destructive/10 text-destructive",
  Accidente: "bg-primary/10 text-primary",
  Robo: "bg-destructive/10 text-destructive",
  Organizacion: "bg-success/10 text-success",
  Infraestructura: "bg-warning/10 text-warning",
}

export function EvidenceGallery() {
  const [selected, setSelected] = useState<Evidence | null>(null)
  const [filter, setFilter] = useState("todos")

  const types = ["todos", ...new Set(evidences.map((e) => e.type))]
  const filtered =
    filter === "todos" ? evidences : evidences.filter((e) => e.type === filter)

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {types.map((t) => (
          <Button
            key={t}
            variant={filter === t ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(t)}
            className="capitalize"
          >
            {t}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="group relative overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/30">
                <Eye className="h-8 w-8 text-card opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <Badge
                className={`absolute left-3 top-3 ${typeColors[item.type] || "bg-secondary text-secondary-foreground"}`}
              >
                {item.type}
              </Badge>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {item.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Badge className={typeColors[selected.type]}>
                  {selected.type}
                </Badge>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {selected.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {selected.location}
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
