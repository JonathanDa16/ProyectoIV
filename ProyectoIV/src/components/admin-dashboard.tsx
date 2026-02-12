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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  FileText,
  Users,
  TrendingUp,
  Shield,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

interface Report {
  id: string
  title: string
  type: string
  description: string
  location: string
  date: string
  status: "pendiente" | "en-revision" | "resuelto" | "rechazado"
  reportedBy: string
  priority: "baja" | "media" | "alta" | "critica"
}

const MOCK_REPORTS: Report[] = [
  {
    id: "R001",
    title: "Robo a casa habitación",
    type: "Robo",
    description: "Intento de robo en vivienda durante la madrugada",
    location: "Calle Juárez #123",
    date: "2026-02-10",
    status: "pendiente",
    reportedBy: "Juan Pérez",
    priority: "alta",
  },
  {
    id: "R002",
    title: "Alumbrado público averiado",
    type: "Infraestructura",
    description: "Farolas sin funcionar en toda la cuadra",
    location: "Av. Revolución entre Hidalgo y Morelos",
    date: "2026-02-09",
    status: "en-revision",
    reportedBy: "María González",
    priority: "media",
  },
  {
    id: "R003",
    title: "Vehículo sospechoso",
    type: "Actividad Sospechosa",
    description: "Auto estacionado por más de 3 días sin movimiento",
    location: "Calle Independencia #45",
    date: "2026-02-08",
    status: "resuelto",
    reportedBy: "Carlos Ramírez",
    priority: "media",
  },
  {
    id: "R004",
    title: "Vandalismo en parque",
    type: "Vandalismo",
    description: "Grafiti en bancas y juegos infantiles",
    location: "Parque Central",
    date: "2026-02-07",
    status: "resuelto",
    reportedBy: "Ana López",
    priority: "baja",
  },
  {
    id: "R005",
    title: "Altercado violento",
    type: "Violencia",
    description: "Riña entre vecinos con agresiones físicas",
    location: "Calle Aldama #78",
    date: "2026-02-11",
    status: "pendiente",
    reportedBy: "Luis Martínez",
    priority: "critica",
  },
]

export function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("todos")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAdmin) {
      toast.error("Acceso denegado. Debes ser administrador.")
      navigate("/login")
      return
    }
    // Simulate loading
    setTimeout(() => setLoading(false), 500)
  }, [isAdmin, navigate])

  const handleStatusChange = (reportId: string, newStatus: Report["status"]) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    )
    toast.success("Estado del reporte actualizado")
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      filterStatus === "todos" || report.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: reports.length,
    pendientes: reports.filter((r) => r.status === "pendiente").length,
    enRevision: reports.filter((r) => r.status === "en-revision").length,
    resueltos: reports.filter((r) => r.status === "resuelto").length,
  }

  const getStatusBadge = (status: Report["status"]) => {
    const variants = {
      pendiente: { variant: "outline" as const, color: "text-warning" },
      "en-revision": { variant: "outline" as const, color: "text-primary" },
      resuelto: { variant: "outline" as const, color: "text-success" },
      rechazado: { variant: "destructive" as const, color: "" },
    }
    return variants[status]
  }

  const getPriorityBadge = (priority: Report["priority"]) => {
    const variants = {
      baja: { variant: "secondary" as const, label: "Baja" },
      media: { variant: "outline" as const, label: "Media" },
      alta: { variant: "default" as const, label: "Alta" },
      critica: { variant: "destructive" as const, label: "Crítica" },
    }
    return variants[priority]
  }

  if (!isAdmin) {
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-balance font-serif text-3xl font-bold tracking-tight">
            Panel de Administración
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            Bienvenido, {user?.name}. Gestiona los reportes de la comunidad
          </p>
        </div>
        <Button variant="outline" onClick={logout}>
          Cerrar Sesión
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reportes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Todos los reportes registrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendientes}</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
            <AlertTriangle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enRevision}</div>
            <p className="text-xs text-muted-foreground">Siendo procesados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resueltos</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resueltos}</div>
            <p className="text-xs text-muted-foreground">Casos completados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gestión de Reportes</CardTitle>
          <CardDescription>
            Filtra, busca y administra todos los reportes de incidentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, ubicación o tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="en-revision">En Revisión</SelectItem>
                <SelectItem value="resuelto">Resueltos</SelectItem>
                <SelectItem value="rechazado">Rechazados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No se encontraron reportes
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <p className="truncate font-medium">{report.title}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          por {report.reportedBy}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {report.location}
                    </TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityBadge(report.priority).variant}>
                        {getPriorityBadge(report.priority).label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadge(report.status).variant}
                        className={getStatusBadge(report.status).color}
                      >
                        {report.status.charAt(0).toUpperCase() +
                          report.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={report.status}
                        onValueChange={(value) =>
                          handleStatusChange(report.id, value as Report["status"])
                        }
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendiente">Pendiente</SelectItem>
                          <SelectItem value="en-revision">
                            En Revisión
                          </SelectItem>
                          <SelectItem value="resuelto">Resuelto</SelectItem>
                          <SelectItem value="rechazado">Rechazado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
