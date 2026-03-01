"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth, UserRole } from "@/components/auth-provider";
import { Shield, Users, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function LoginTabs() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [vecinoEmail, setVecinoEmail] = useState("");
  const [vecinoPassword, setVecinoPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (
    role: UserRole,
    email: string,
    password: string,
  ) => {
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const success = await login(email, password, role);
      if (success) {
        toast.success(
          `¡Bienvenido! Has iniciado sesión como ${role === "admin" ? "administrador" : "vecino"}`,
        );
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/perfil");
        }
      } else {
        setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
        toast.error("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Ocurrió un error. Por favor, intenta de nuevo.");
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-balance font-serif text-3xl font-bold tracking-tight">
          Iniciar Sesión
        </h1>
        <p className="mt-2 text-pretty text-muted-foreground">
          Accede a tu cuenta para reportar incidentes o gestionar la plataforma
        </p>
      </div>

      <Tabs defaultValue="vecino" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vecino" className="gap-2">
            <Users className="h-4 w-4" />
            Vecino
          </TabsTrigger>
          <TabsTrigger value="admin" className="gap-2">
            <Shield className="h-4 w-4" />
            Administrador
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vecino">
          <Card>
            <CardHeader>
              <CardTitle>Acceso de Vecino</CardTitle>
              <CardDescription>
                Ingresa tus credenciales para acceder a tu perfil y reportar
                incidentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="vecino-email">Correo Electrónico</Label>
                <Input
                  id="vecino-email"
                  type="email"
                  placeholder="vecino@ejemplo.mx"
                  value={vecinoEmail}
                  onChange={(e) => setVecinoEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vecino-password">Contraseña</Label>
                <Input
                  id="vecino-password"
                  type="password"
                  placeholder="••••••••"
                  value={vecinoPassword}
                  onChange={(e) => setVecinoPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button
                className="w-full"
                onClick={() =>
                  handleLogin("vecino", vecinoEmail, vecinoPassword)
                }
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>

              <div className="rounded-lg border border-accent/20 bg-accent/10 p-3">
                <p className="text-xs font-medium">Credenciales de prueba:</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Email: vecino@ejemplo.mx
                </p>
                <p className="text-xs text-muted-foreground">
                  Contraseña: vecino123
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Acceso de Administrador</CardTitle>
              <CardDescription>
                Panel de control para gestionar reportes e incidentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="admin-email">Correo Electrónico</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@udgvirtual.mx"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Contraseña</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button
                className="w-full"
                onClick={() => handleLogin("admin", adminEmail, adminPassword)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>

              <div className="rounded-lg border border-warning/20 bg-warning/10 p-3">
                <p className="text-xs font-medium text-warning-foreground">
                  Credenciales de prueba:
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Email: admin@udgvirtual.mx
                </p>
                <p className="text-xs text-muted-foreground">
                  Contraseña: admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
