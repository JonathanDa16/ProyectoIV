import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  LogIn,
  Shield,
  Menu,
  X,
  User,
  LogOut,
  FileText,
  Home,
  Map,
  MessageSquare,
  Camera,
  ShoppingBag,
  HelpCircle,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"

const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/reportes", label: "Reportes", icon: FileText },
  { to: "/foro", label: "Foro", icon: MessageSquare },
  { to: "/galeria", label: "Galeria", icon: Camera },
  { to: "/tienda", label: "Tienda", icon: ShoppingBag },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/contacto", label: "Contacto", icon: Phone },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight tracking-tight text-foreground">
              Vigilancia Vecinal
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              UDGVIRTUAL
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/nosotros" className="hidden lg:block">
            <Button variant="outline" size="sm">
              Nosotros
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden lg:flex">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin ? (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <Shield className="mr-2 h-4 w-4" />
                    Panel de Admin
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => navigate("/perfil")}>
                    <User className="mr-2 h-4 w-4" />
                    Mi Perfil
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate("/reportes")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Mis Reportes
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="hidden lg:block">
              <Button size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Iniciar Sesión
              </Button>
            </Link>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2.5 border-b border-border p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Shield className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold leading-tight text-foreground">
                      Vigilancia Vecinal
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      UDGVIRTUAL
                    </span>
                  </div>
                </div>
                <nav className="flex flex-1 flex-col gap-1 p-4">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    )
                  })}
                  <Link
                    to="/nosotros"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <FileText className="h-4 w-4" />
                    Nosotros
                  </Link>
                </nav>
                <div className="border-t border-border p-4">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="mb-3 rounded-lg bg-secondary/50 px-3 py-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          Conectado como
                        </p>
                        <p className="text-sm font-semibold">{user?.name}</p>
                      </div>
                      {isAdmin ? (
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            setOpen(false)
                            navigate("/admin")
                          }}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Panel de Admin
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            setOpen(false)
                            navigate("/perfil")
                          }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Mi Perfil
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        className="w-full justify-start"
                        onClick={() => {
                          setOpen(false)
                          logout()
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full justify-start"
                      onClick={() => {
                        setOpen(false)
                        navigate("/login")
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Iniciar Sesión
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
