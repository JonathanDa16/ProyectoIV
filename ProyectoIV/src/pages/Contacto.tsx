import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactoPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-8 animate-fade-up">
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Contacto
                </h1>
                <p className="mt-2 text-muted-foreground">
                    ¿Tienes dudas o deseas colaborar con nosotros? Completa el formulario
                    o utiliza nuestros datos de contacto directo.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 animate-pop-in">
                    <ContactForm />
                </div>

                <div className="space-y-4">
                    <Card className="hover-lift animate-fade-up" style={{ animationDelay: "70ms" }}>
                        <CardContent className="flex items-start gap-3 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Direccion
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Av. La Paz 2453, Col. Arcos Vallarta
                                    <br />
                                    Guadalajara, Jalisco, Mexico
                                    <br />
                                    CP 44130
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover-lift animate-fade-up" style={{ animationDelay: "130ms" }}>
                        <CardContent className="flex items-start gap-3 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Telefono
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    +52 (33) 1234-5678
                                    <br />
                                    Lunes a Viernes
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover-lift animate-fade-up" style={{ animationDelay: "190ms" }}>
                        <CardContent className="flex items-start gap-3 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Correo
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    contacto@vigilanciavecinal.mx
                                    <br />
                                    soporte@vigilanciavecinal.mx
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover-lift animate-fade-up" style={{ animationDelay: "250ms" }}>
                        <CardContent className="flex items-start gap-3 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Horario de Atencion
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Lunes a Viernes: 9:00 - 18:00
                                    <br />
                                    Sabados: 9:00 - 14:00
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
