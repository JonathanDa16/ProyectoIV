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
import { CheckCircle2, Send } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
            Mensaje Enviado
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Gracias por contactarnos. Hemos recibido tu mensaje y te
            responderemos en un plazo de 24-48 horas habiles.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Enviar otro mensaje
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
              <Label htmlFor="contact-name">Nombre completo</Label>
              <Input id="contact-name" placeholder="Tu nombre" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Correo electronico</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Telefono (opcional)</Label>
              <Input
                id="contact-phone"
                type="tel"
                placeholder="+52 (33) ..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-subject">Asunto</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Solicitar informacion</SelectItem>
                  <SelectItem value="colaborar">
                    Colaborar con el proyecto
                  </SelectItem>
                  <SelectItem value="reporte">
                    Problema con un reporte
                  </SelectItem>
                  <SelectItem value="sugerencia">Sugerencia</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Mensaje</Label>
            <Textarea
              id="contact-message"
              placeholder="Escribe tu mensaje aqui..."
              rows={5}
              required
            />
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
                Enviar Mensaje
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
