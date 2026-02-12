"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle2, Send, Upload } from "lucide-react"

export function ReportForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <Card className="border-success/30">
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 animate-in zoom-in">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Reporte Enviado
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Tu reporte ha sido registrado exitosamente. Gracias por contribuir a
            la seguridad de tu comunidad. Un coordinador revisara tu reporte
            pronto.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Crear otro reporte
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Tu nombre" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electronico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de incidente</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="robo">Robo</SelectItem>
                  <SelectItem value="vandalismo">Vandalismo</SelectItem>
                  <SelectItem value="sospechoso">
                    Actividad sospechosa
                  </SelectItem>
                  <SelectItem value="accidente">Accidente vial</SelectItem>
                  <SelectItem value="alumbrado">
                    Falta de alumbrado
                  </SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Nivel de gravedad</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona gravedad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicacion del incidente</Label>
            <Input
              id="location"
              placeholder="Calle, colonia, referencia..."
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha del incidente</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Hora aproximada</Label>
              <Input id="time" type="time" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripcion del incidente</Label>
            <Textarea
              id="description"
              placeholder="Describe lo sucedido con el mayor detalle posible..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Evidencia (foto o video)</Label>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-secondary">
                <Upload className="h-4 w-4" />
                {fileName || "Seleccionar archivo"}
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) =>
                    setFileName(e.target.files?.[0]?.name || "")
                  }
                />
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Enviando...
              </span>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Reporte
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
