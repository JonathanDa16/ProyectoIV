import { Shield, MapPin, Users, AlertTriangle } from "lucide-react"

const stats = [
  {
    icon: AlertTriangle,
    value: "60%",
    label: "Percepcion de inseguridad segun INEGI",
    color: "text-destructive",
  },
  {
    icon: MapPin,
    value: "147",
    label: "Puntos criticos mapeados",
    color: "text-primary",
  },
  {
    icon: Users,
    value: "2,340",
    label: "Vecinos participando activamente",
    color: "text-accent",
  },
  {
    icon: Shield,
    value: "89%",
    label: "Incidentes resueltos en comunidad",
    color: "text-success",
  },
]

export function StatsSection() {
  return (
    <section className="border-b border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="font-serif text-3xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm leading-snug text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
