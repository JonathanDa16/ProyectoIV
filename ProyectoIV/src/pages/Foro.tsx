import { ForumBoard } from "@/components/forum-board"

export default function ForoPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-8 animate-fade-up">
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Foro Comunitario
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Espacio para que los vecinos compartan alertas, experiencias y
                    coordinen acciones de seguridad en su colonia.
                </p>
            </div>
            <ForumBoard />
        </div>
    )
}
