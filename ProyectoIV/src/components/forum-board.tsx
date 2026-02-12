"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ThumbsUp,
  MessageSquare,
  Send,
  Plus,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react"

interface Reply {
  id: number
  author: string
  initials: string
  content: string
  date: string
  likes: number
}

interface Post {
  id: number
  author: string
  initials: string
  role: string
  category: string
  title: string
  content: string
  date: string
  likes: number
  replies: Reply[]
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Maria Garcia",
    initials: "MG",
    role: "Vecina",
    category: "Alerta",
    title: "Robo en la calle Morelos",
    content:
      "Ayer a las 9pm presenciamos un asalto en la esquina de Morelos y Lopez Cotilla. Recomiendo extremar precauciones despues de las 8pm en esa zona. Ya levante reporte.",
    date: "Hace 2 horas",
    likes: 12,
    replies: [
      {
        id: 1,
        author: "Carlos Lopez",
        initials: "CL",
        content:
          "Gracias por el aviso Maria. Yo tambien he notado actividad sospechosa en esa zona por las noches.",
        date: "Hace 1 hora",
        likes: 5,
      },
      {
        id: 2,
        author: "Ana Rodriguez",
        initials: "AR",
        content:
          "Deberíamos organizar rondines vecinales. ¿Alguien se apunta?",
        date: "Hace 45 min",
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    author: "Roberto Hernandez",
    initials: "RH",
    role: "Coordinador Vecinal",
    category: "Organizacion",
    title: "Junta vecinal este sabado",
    content:
      "Se convoca a junta vecinal para este sabado 18 de enero a las 10am en el parque central. Temas: organizacion de rondines, instalacion de camaras comunitarias y comunicacion con la policia municipal.",
    date: "Hace 5 horas",
    likes: 24,
    replies: [
      {
        id: 3,
        author: "Laura Mendez",
        initials: "LM",
        content: "Ahi estare. Es urgente que nos organicemos como comunidad.",
        date: "Hace 3 horas",
        likes: 6,
      },
    ],
  },
  {
    id: 3,
    author: "Patricia Sanchez",
    initials: "PS",
    role: "Vecina",
    category: "Prevencion",
    title: "Tips de seguridad para el hogar",
    content:
      "Comparto algunos consejos basicos: 1) No abrir a desconocidos, 2) Mantener iluminacion exterior, 3) Revisar cerraduras frecuentemente, 4) Tener numeros de emergencia a la mano, 5) Conocer a sus vecinos.",
    date: "Hace 1 dia",
    likes: 31,
    replies: [],
  },
  {
    id: 4,
    author: "Fernando Torres",
    initials: "FT",
    role: "Vecino",
    category: "Denuncia",
    title: "Alumbrado publico en mal estado",
    content:
      "Llevamos mas de dos semanas con las luminarias apagadas en la calle Independencia entre Juarez y Reforma. Ya se reporto al municipio pero no han venido. ¿Alguien sabe si hay otra forma de presionar?",
    date: "Hace 2 dias",
    likes: 18,
    replies: [
      {
        id: 4,
        author: "Jorge Ramirez",
        initials: "JR",
        content:
          "Intenta por la app del municipio. A mi me funcionó la ultima vez.",
        date: "Hace 1 dia",
        likes: 3,
      },
    ],
  },
]

const categoryColors: Record<string, string> = {
  Alerta: "bg-destructive/10 text-destructive border-destructive/20",
  Organizacion: "bg-primary/10 text-primary border-primary/20",
  Prevencion: "bg-success/10 text-success border-success/20",
  Denuncia: "bg-warning/10 text-warning border-warning/20",
}

export function ForumBoard() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [showNewPost, setShowNewPost] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newCategory, setNewCategory] = useState("Alerta")
  const [expandedPost, setExpandedPost] = useState<number | null>(null)
  const [replyInputs, setReplyInputs] = useState<Record<number, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  const handleNewPost = () => {
    if (!newTitle.trim() || !newContent.trim()) return

    const post: Post = {
      id: posts.length + 1,
      author: "Tu",
      initials: "TU",
      role: "Vecino",
      category: newCategory,
      title: newTitle,
      content: newContent,
      date: "Ahora",
      likes: 0,
      replies: [],
    }
    setPosts([post, ...posts])
    setNewTitle("")
    setNewContent("")
    setShowNewPost(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleReply = (postId: number) => {
    const text = replyInputs[postId]
    if (!text?.trim()) return

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              replies: [
                ...p.replies,
                {
                  id: Date.now(),
                  author: "Tu",
                  initials: "TU",
                  content: text,
                  date: "Ahora",
                  likes: 0,
                },
              ],
            }
          : p
      )
    )
    setReplyInputs((prev) => ({ ...prev, [postId]: "" }))
  }

  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    )
  }

  return (
    <div className="space-y-6">
      {showSuccess && (
        <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 p-4 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <p className="text-sm font-medium text-success">
            Tu publicacion ha sido creada exitosamente.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {["Alerta", "Organizacion", "Prevencion", "Denuncia"].map((cat) => (
            <Badge
              key={cat}
              variant="outline"
              className={`cursor-default ${categoryColors[cat]}`}
            >
              {cat}
            </Badge>
          ))}
        </div>
        <Button onClick={() => setShowNewPost(!showNewPost)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Publicacion
        </Button>
      </div>

      {showNewPost && (
        <Card className="border-primary/30 animate-in fade-in slide-in-from-top-2">
          <CardHeader className="pb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Crear nueva publicacion
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Titulo de tu publicacion"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Textarea
              placeholder="Describe la situacion o tu mensaje para la comunidad..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {["Alerta", "Organizacion", "Prevencion", "Denuncia"].map(
                  (cat) => (
                    <Button
                      key={cat}
                      variant={newCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewCategory(cat)}
                    >
                      {cat}
                    </Button>
                  )
                )}
              </div>
              <Button onClick={handleNewPost}>Publicar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="transition-all hover:shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    {post.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {post.author}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      {post.role}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${categoryColors[post.category]}`}
                    >
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {post.content}
                  </p>

                  <div className="mt-3 flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {post.likes}
                    </button>
                    <button
                      onClick={() =>
                        setExpandedPost(
                          expandedPost === post.id ? null : post.id
                        )
                      }
                      className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      {post.replies.length} respuestas
                      {expandedPost === post.id ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </button>
                  </div>

                  {expandedPost === post.id && (
                    <div className="mt-4 space-y-3 border-l-2 border-border pl-4 animate-in fade-in slide-in-from-top-1">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-2">
                          <Avatar className="h-7 w-7 shrink-0">
                            <AvatarFallback className="bg-secondary text-[10px] font-semibold text-secondary-foreground">
                              {reply.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-foreground">
                                {reply.author}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                {reply.date}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Escribe una respuesta..."
                          value={replyInputs[post.id] || ""}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          className="text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleReply(post.id)
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleReply(post.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
