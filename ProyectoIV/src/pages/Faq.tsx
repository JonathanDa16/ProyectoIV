import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

const faqs = [
    {
        question: "¿Como puedo reportar un incidente de seguridad?",
        answer:
            "Dirigete a la seccion de Reportes desde el menu principal. Completa el formulario con la informacion del incidente incluyendo tipo, ubicacion, fecha, hora y una descripcion detallada. Si cuentas con evidencia fotografica o en video, puedes adjuntarla al reporte. Tu informacion sera revisada por un coordinador vecinal.",
    },
    {
        question: "¿Que tipo de incidentes puedo reportar?",
        answer:
            "Puedes reportar cualquier situacion que afecte la seguridad de tu colonia: robos, vandalismo, actividad sospechosa, accidentes viales, falta de alumbrado publico, entre otros. Recuerda que si se trata de una emergencia activa, debes llamar primero al 911.",
    },
    {
        question: "¿Es anonimo mi reporte?",
        answer:
            "Tu informacion personal (nombre y correo) es utilizada unicamente para dar seguimiento a tu reporte. Los datos se manejan de forma confidencial y no se comparten publicamente en el mapa ni en el foro. Solo los coordinadores vecinales tienen acceso a tu informacion de contacto.",
    },
    {
        question: "¿Como funciona el mapa de incidentes?",
        answer:
            "El mapa interactivo muestra los incidentes reportados como puntos de colores segun su severidad: rojo para alta, amarillo para media y azul para baja. Puedes hacer clic en cualquier punto para ver los detalles del incidente. Los filtros te permiten ver solo los incidentes de cierta severidad.",
    },
    {
        question: "¿Puedo participar en el foro comunitario?",
        answer:
            "Si, el foro esta abierto para todos los vecinos. Puedes crear publicaciones nuevas en categorias como Alerta, Organizacion, Prevencion y Denuncia. Tambien puedes responder a publicaciones existentes y dar like a las que te parezcan utiles.",
    },
    {
        question: "¿La tienda realiza cobros reales?",
        answer:
            "No, la tienda de seguridad es un prototipo funcional con propositos demostrativos. Puedes agregar productos al carrito y simular un pedido, pero no se realizan transacciones reales ni se procesan pagos. Es una demostracion del catalogo de articulos de seguridad.",
    },
    {
        question: "¿Como puedo contactar a las autoridades?",
        answer:
            "En caso de emergencia, llama al 911. Para reportes no urgentes, puedes usar nuestra seccion de Contacto para comunicarte con el equipo de coordinacion vecinal. Tambien puedes acudir a la oficina en Av. La Paz 2453, Col. Arcos Vallarta, Guadalajara.",
    },
    {
        question: "¿Que hago si veo un error en el mapa?",
        answer:
            "Si detectas informacion incorrecta en el mapa de incidentes, por favor reportalo a traves de la seccion de Contacto seleccionando el asunto 'Problema con un reporte'. Nuestro equipo revisara y corregira la informacion lo antes posible.",
    },
]

export default function FaqPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-6">
            <div className="mb-8 text-center animate-fade-up">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 animate-float-soft">
                    <HelpCircle className="h-7 w-7 text-primary" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Preguntas Frecuentes
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Encuentra respuestas a las dudas mas comunes sobre la plataforma y
                    como reportar incidentes de seguridad.
                </p>
            </div>

            <Card className="animate-pop-in hover-lift">
                <CardContent className="p-2 md:p-4">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger className="px-4 text-left text-sm font-medium">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-4 text-sm leading-relaxed text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
