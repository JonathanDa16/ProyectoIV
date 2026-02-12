import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Shield,
    Target,
    Eye,
    Award,
    Users,
    MapPin,
    CheckCircle2,
} from "lucide-react"

const team = [
    {
        name: "Jonathan Daniel Gomez",
        role: "Scrum Master",
        initials: "JG",
        description:
            "Coordinador del equipo de desarrollo, encargado de facilitar las ceremonias Scrum y remover impedimentos del equipo.",
    },
    {
        name: "Raymundo Chavarria",
        role: "Product Owner",
        initials: "RC",
        description:
            "Responsable de la vision del producto, priorizacion del backlog y comunicacion con los stakeholders del proyecto.",
    },
    {
        name: "Cristian Martin Orozco",
        role: "Developer",
        initials: "CO",
        description:
            "Desarrollador principal del sistema, encargado de la implementacion tecnica de las funcionalidades de la plataforma.",
    },
]

const policies = [
    "Proteger la privacidad y datos personales de todos los usuarios",
    "Verificar la informacion de reportes antes de su publicacion",
    "Mantener canales de comunicacion activos y accesibles",
    "Colaborar con autoridades locales para dar seguimiento a incidentes",
    "Actualizar constantemente las funcionalidades de la plataforma",
    "Promover la participacion ciudadana responsable y respetuosa",
]

export default function NosotrosPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            {/* Mission & Vision */}
            <section className="mb-16">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <h1 className="font-serif text-3xl font-bold text-foreground">
                        Sobre Vigilancia Vecinal
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        Proyecto academico de UDGVIRTUAL enfocado en reducir la percepcion
                        de inseguridad a traves de la tecnologia y la participacion
                        ciudadana.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-primary/20">
                        <CardContent className="p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                Mision
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                Proporcionar una plataforma tecnologica accesible que empodere a
                                los ciudadanos para reportar, visualizar y prevenir incidentes
                                de seguridad en sus comunidades, fomentando la colaboracion
                                vecinal y la comunicacion efectiva con las autoridades locales,
                                con el objetivo de reducir el 60% de percepcion de inseguridad
                                reportado por el INEGI.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-accent/20">
                        <CardContent className="p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                                <Eye className="h-6 w-6 text-accent" />
                            </div>
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                Vision
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                Ser la plataforma lider en seguridad comunitaria digital en
                                Mexico, donde cada colonia cuente con herramientas efectivas
                                para la prevencion del delito, la organizacion vecinal y la
                                generacion de datos que permitan a las autoridades tomar
                                decisiones informadas para crear entornos mas seguros para
                                todos.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Quality Policies */}
            <section id="politicas" className="mb-16 scroll-mt-20">
                <div className="mx-auto mb-8 max-w-2xl text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                        <Award className="h-6 w-6 text-success" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                        Politicas de Calidad
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Nuestro compromiso con la excelencia y la seguridad de la
                        comunidad.
                    </p>
                </div>

                <div className="mx-auto max-w-2xl">
                    <Card>
                        <CardContent className="p-6">
                            <ul className="space-y-4">
                                {policies.map((policy, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                                        <span className="text-sm leading-relaxed text-muted-foreground">
                                            {policy}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Team */}
            <section id="equipo" className="mb-16 scroll-mt-20">
                <div className="mx-auto mb-8 max-w-2xl text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                        Equipo de Desarrollo
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Integrantes del equipo responsable del desarrollo de la plataforma.
                    </p>
                </div>

                <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
                    {team.map((member) => (
                        <Card key={member.name} className="text-center">
                            <CardContent className="p-6">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <span className="text-xl font-bold text-primary">
                                        {member.initials}
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-foreground">
                                    {member.name}
                                </h3>
                                <Badge variant="secondary" className="mt-1.5">
                                    {member.role}
                                </Badge>
                                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                                    {member.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Location */}
            <section className="mb-8">
                <div className="mx-auto mb-8 max-w-2xl text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                        <MapPin className="h-6 w-6 text-warning" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                        Ubicacion
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Oficina administrativa del proyecto (simulada).
                    </p>
                </div>

                <Card className="mx-auto max-w-4xl overflow-hidden">
                    <div className="aspect-[21/9]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.1!2d-103.375!3d20.675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQwJzMwLjAiTiAxMDPCsDIyJzMwLjAiVw!5e0!3m2!1ses!2smx!4v1705350000000!5m2!1ses!2smx"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicacion de la oficina"
                        />
                    </div>
                    <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    Av. La Paz 2453, Col. Arcos Vallarta
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Guadalajara, Jalisco, Mexico - CP 44130
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
