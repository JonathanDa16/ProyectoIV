"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/components/auth-provider"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  LogOut,
  Loader2,
  Shield,
  Calendar,
} from "lucide-react"
import { toast } from "sonner"

interface UserReport {
  id: string
  title: string
  type: string
  date: string
  status: "pendiente" | "en-revision" | "resuelto" | "rechazado"
}

const MOCK_USER_REPORTS: UserReport[] = [
  {
    id: "R001",
    title: "Alumbrado público averiado",
    type: "Infraestructura",
    date: "2026-02-11",
    status: "pendiente",
  },
  {
    id: "R002",
    title: "Bache en la calle",
    type: "Vialidad",
    date: "2026-02-09",
    status: "en-revision",
  },
  {
    id: "R003",
    title: "Ruido excesivo por obras",
    type: "Molestia",
    date: "2026-02-05",
    status: "resuelto",
  },
]

export function UserProfile() {
  const { user, isVecino, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [reports] = useState<UserReport[]>(MOCK_USER_REPORTS)

  useEffect(() => {
    if (!isVecino) {
      toast.error("Acceso denegado. Debes iniciar sesión como vecino.")
      navigate("/login")
      return
    }
    // Simulate loading
    setTimeout(() => setLoading(false), 500)
  }, [isVecino, navigate])

  const handleLogout = () => {
    logout()
    toast.success("Sesión cerrada exitosamente")
    navigate("/")
  }

  const getStatusBadge = (status: UserReport["status"]) => {
    const variants = {
      pendiente: { variant: "outline" as const, label: "Pendiente", color: "text-warning" },
      "en-revision": { variant: "outline" as const, label: "En Revisión", color: "text-primary" },
      resuelto: { variant: "outline" as const, label: "Resuelto", color: "text-success" },
      rechazado: { variant: "destructive" as const, label: "Rechazado", color: "" },
    }
    return variants[status]
  }

  if (!isVecino || !user) {
    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-balance font-serif text-3xl font-bold tracking-tight">
          Mi Perfil
        </h1>
        <p className="mt-2 text-pretty text-muted-foreground">
          Gestiona tu información personal y revisa tus reportes
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Information Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Tus datos de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Nombre</p>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Correo</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
              )}

              {user.address && (
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dirección</p>
                    <p className="text-sm text-muted-foreground">{user.address}</p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="default"
                className="w-full justify-start"
                onClick={() => navigate("/reportes")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Nuevo Reporte
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/mapa")}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Ver Mapa
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/foro")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Ir al Foro
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Mis Reportes</CardTitle>
              <CardDescription>
                Historial de reportes que has realizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 font-semibold">No hay reportes</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Aún no has realizado ningún reporte
                    </p>
                    <Button onClick={() => navigate("/reportes")}>
                      Crear Primer Reporte
                    </Button>
                  </div>
                ) : (
                  reports.map((report) => (
                    <Card key={report.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {report.title}
                            </CardTitle>
                            <CardDescription className="mt-1 flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {report.date}
                            </CardDescription>
                          </div>
                          <Badge
                            variant={getStatusBadge(report.status).variant}
                            className={getStatusBadge(report.status).color}
                          >
                            {getStatusBadge(report.status).label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary">{report.type}</Badge>
                          <span>•</span>
                          <span>ID: {report.id}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Reportes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reports.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reports.filter((r) => r.status === "pendiente").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resueltos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reports.filter((r) => r.status === "resuelto").length}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
