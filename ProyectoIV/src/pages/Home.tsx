import { type FormEvent, useState } from "react"
import { HeroCarousel } from "@/components/hero-carousel"
import { StatsSection } from "@/components/stats-section"
import { CtaSection } from "@/components/cta-section"
import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

import { featureFlags } from "@/config/featureFlags"
import NosotrosPage from "./Nosotros"
import ReportesPage from "./Reportes"

const SITE_RATING_STORAGE_KEY = "site_rating_global"
const SITE_FEEDBACK_STORAGE_KEY = "site_feedback_global_v1"

type SiteFeedback = {
    id: string
    name: string
    comment: string
    rating: number
    createdAt: string
    source: "mock" | "user"
}

const MOCK_FEEDBACK: SiteFeedback[] = [
    {
        id: "mock-1",
        name: "Laura M.",
        comment: "La pagina es clara y pude reportar rapido.",
        rating: 5,
        createdAt: "2026-03-10T12:00:00.000Z",
        source: "mock",
    },
    {
        id: "mock-2",
        name: "Carlos R.",
        comment: "Me gusto el diseno, solo mejoraria los textos del formulario.",
        rating: 4,
        createdAt: "2026-03-11T15:30:00.000Z",
        source: "mock",
    },
    {
        id: "mock-3",
        name: "Ana P.",
        comment: "El flujo funciona bien en celular y escritorio.",
        rating: 5,
        createdAt: "2026-03-12T09:45:00.000Z",
        source: "mock",
    },
    {
        id: "mock-4",
        name: "Miguel T.",
        comment: "Buena idea para la comunidad, agregaria mas categorias.",
        rating: 4,
        createdAt: "2026-03-13T18:20:00.000Z",
        source: "mock",
    },
]

export default function Home() {
    const [siteRating, setSiteRating] = useState<number>(() => {
        if (typeof window === "undefined") {
            return 0
        }

        const storedValue = window.localStorage.getItem(SITE_RATING_STORAGE_KEY)
        const parsed = Number(storedValue)
        if (Number.isNaN(parsed) || parsed < 1 || parsed > 5) {
            return 0
        }
        return parsed
    })

    const handleRateSite = (rating: number) => {
        setSiteRating(rating)
        window.localStorage.setItem(SITE_RATING_STORAGE_KEY, String(rating))
    }

    const [feedbackList, setFeedbackList] = useState<SiteFeedback[]>(() => {
        if (typeof window === "undefined") {
            return []
        }

        const stored = window.localStorage.getItem(SITE_FEEDBACK_STORAGE_KEY)
        if (!stored) {
            return []
        }

        try {
            const parsed = JSON.parse(stored) as SiteFeedback[]
            if (!Array.isArray(parsed)) {
                return []
            }
            return parsed
                .filter(
                (item) =>
                    typeof item?.id === "string" &&
                    typeof item?.name === "string" &&
                    typeof item?.comment === "string" &&
                    typeof item?.rating === "number" &&
                    typeof item?.createdAt === "string",
            )
                .map((item) => ({
                    ...item,
                    source: "user" as const,
                }))
        } catch {
            return []
        }
    })
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [feedbackError, setFeedbackError] = useState("")

    const saveFeedback = (nextFeedback: SiteFeedback[]) => {
        setFeedbackList(nextFeedback)
        window.localStorage.setItem(
            SITE_FEEDBACK_STORAGE_KEY,
            JSON.stringify(nextFeedback),
        )
    }

    const handleSubmitFeedback = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setFeedbackError("")

        const cleanComment = comment.trim()
        const cleanName = name.trim()

        if (siteRating < 1 || siteRating > 5) {
            setFeedbackError("Primero selecciona una valoracion con estrellas.")
            return
        }

        if (!cleanComment) {
            setFeedbackError("Escribe un comentario antes de enviar.")
            return
        }

        const newFeedback: SiteFeedback = {
            id: `${Date.now()}`,
            name: cleanName || "Anonimo",
            comment: cleanComment,
            rating: siteRating,
            createdAt: new Date().toISOString(),
            source: "user",
        }

        const nextFeedback = [newFeedback, ...feedbackList].slice(0, 20)
        saveFeedback(nextFeedback)
        setComment("")
    }

    const mergedFeedback = [...feedbackList, ...MOCK_FEEDBACK]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .filter(
            (item, index, array) =>
                array.findIndex((candidate) => candidate.id === item.id) === index,
        )

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate)
        if (Number.isNaN(date.getTime())) {
            return "Fecha no disponible"
        }
        return date.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }

    return (
        <div className="flex flex-col">
            {/* NOTE: sliderImagenes feature flag is intentionally not wired yet. */}
            <HeroCarousel />

            <div className="bg-background">
                <StatsSection />
            </div>

            <CtaSection />

            {featureFlags.contenidoInstitucional.paginas && (
                <section id="nosotros" className="scroll-mt-16 py-12 bg-background border-b border-border">
                    <NosotrosPage />
                </section>
            )}

            <section id="reportes" className="scroll-mt-16 py-12 bg-muted/30">
                <ReportesPage />
            </section>

            {featureFlags.interaccion.valoracion && (
                <section className="border-t border-border bg-background py-10">
                    <div className="mx-auto max-w-3xl px-4 text-center lg:px-6">
                        <h2 className="font-serif text-2xl font-bold text-foreground">
                            Valora esta pagina
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Tu opinion nos ayuda a mejorar la experiencia del sitio.
                        </p>
                        <div className="mt-5 flex justify-center">
                            <StarRating
                                initialRating={siteRating}
                                onRate={handleRateSite}
                            />
                        </div>
                        {siteRating > 0 && (
                            <p className="mt-2 text-xs text-muted-foreground">
                                Tu valoracion guardada: {siteRating}/5
                            </p>
                        )}

                        <form
                            onSubmit={handleSubmitFeedback}
                            className="mt-6 space-y-3 text-left"
                        >
                            <div>
                                <label
                                    htmlFor="feedback-name"
                                    className="mb-1 block text-sm font-medium text-foreground"
                                >
                                    Nombre (opcional)
                                </label>
                                <input
                                    id="feedback-name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Tu nombre"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="feedback-comment"
                                    className="mb-1 block text-sm font-medium text-foreground"
                                >
                                    Comentario
                                </label>
                                <textarea
                                    id="feedback-comment"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                    placeholder="Escribe tu comentario..."
                                    rows={4}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            {feedbackError && (
                                <p className="text-sm text-destructive">{feedbackError}</p>
                            )}
                            <div className="flex justify-end">
                                <Button type="submit">Enviar comentario</Button>
                            </div>
                        </form>

                        {mergedFeedback.length > 0 && (
                            <div className="mt-8 text-left">
                                <h3 className="text-base font-semibold text-foreground">
                                    Opiniones de la comunidad
                                </h3>
                                <div className="mt-3 space-y-3">
                                    {mergedFeedback.map((feedback) => (
                                        <article
                                            key={feedback.id}
                                            className="rounded-xl border border-border bg-card p-4 shadow-sm"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                                        {feedback.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-foreground">
                                                            {feedback.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatDate(feedback.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                                {feedback.source === "mock" && (
                                                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                                        Referencia
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mt-3 flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={`${feedback.id}-${star}`}
                                                        className={`h-4 w-4 ${
                                                            star <= feedback.rating
                                                                ? "fill-warning text-warning"
                                                                : "text-muted-foreground/30"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="mt-1 text-sm text-foreground/90">
                                                {feedback.comment}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    )
}
