"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, MapPin, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Incident {
  id: number;
  lat: number;
  lng: number;
  type: string;
  description: string;
  date: string;
  severity: "alta" | "media" | "baja";
  color: string;
}

const incidents: Incident[] = [
  {
    id: 1,
    lat: 20.6767,
    lng: -103.3475,
    type: "Robo a transeúnte",
    description: "Reportan asalto a mano armada cerca de la plaza principal.",
    date: "2026-01-15 18:30",
    severity: "alta",
    color: "#ef4444",
  },
  {
    id: 2,
    lat: 20.6597,
    lng: -103.3496,
    type: "Vandalismo",
    description: "Grafiti y daño a mobiliario urbano en parque del barrio.",
    date: "2026-01-14 22:00",
    severity: "media",
    color: "#f59e0b",
  },
  {
    id: 3,
    lat: 20.6837,
    lng: -103.3315,
    type: "Robo de vehiculo",
    description: "Vehiculo sustraido del estacionamiento del centro comercial.",
    date: "2026-01-14 14:15",
    severity: "alta",
    color: "#ef4444",
  },
  {
    id: 4,
    lat: 20.6717,
    lng: -103.3685,
    type: "Actividad sospechosa",
    description: "Personas merodeando en zona residencial durante la noche.",
    date: "2026-01-13 23:45",
    severity: "baja",
    color: "#3b82f6",
  },
  {
    id: 5,
    lat: 20.6667,
    lng: -103.3575,
    type: "Robo a casa habitacion",
    description: "Intento de robo a domicilio en la colonia Americana.",
    date: "2026-01-13 03:20",
    severity: "alta",
    color: "#ef4444",
  },
  {
    id: 6,
    lat: 20.6877,
    lng: -103.3515,
    type: "Falta de alumbrado",
    description: "Luminarias apagadas en tres cuadras consecutivas.",
    date: "2026-01-12 20:00",
    severity: "media",
    color: "#f59e0b",
  },
  {
    id: 7,
    lat: 20.6627,
    lng: -103.3395,
    type: "Accidente vial",
    description: "Colision entre dos vehiculos en cruce peligroso.",
    date: "2026-01-12 08:30",
    severity: "media",
    color: "#f59e0b",
  },
  {
    id: 8,
    lat: 20.6747,
    lng: -103.3235,
    type: "Asalto en transporte",
    description: "Pasajeros reportan asalto en ruta de camion.",
    date: "2026-01-11 19:00",
    severity: "alta",
    color: "#ef4444",
  },
];

const severityColors = {
  alta: "bg-destructive text-destructive-foreground",
  media: "bg-warning text-warning-foreground",
  baja: "bg-primary text-primary-foreground",
};

export function IncidentMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null,
  );
  const [filter, setFilter] = useState<string>("todos");
  const [mapReady, setMapReady] = useState(false);

  const filtered =
    filter === "todos"
      ? incidents
      : incidents.filter((i) => i.severity === filter);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const loadMap = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      const map = L.map(mapRef.current!, {
        center: [20.6767, -103.3475],
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      incidents.forEach((incident) => {
        const icon = L.divIcon({
          html: `<div style="background:${incident.color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
          iconSize: [14, 14],
          className: "",
        });

        L.marker([incident.lat, incident.lng], { icon })
          .addTo(map)
          .on("click", () => {
            setSelectedIncident(incident);
          });
      });

      mapInstanceRef.current = map;
      setMapReady(true);
    };

    loadMap();

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Filtrar:
          </span>
          {["todos", "alta", "media", "baja"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>

        <div
          ref={mapRef}
          className="h-[28rem] w-full overflow-hidden rounded-xl border border-border lg:h-[36rem]"
        />

        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive" />
            Alta
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-warning" />
            Media
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-primary" />
            Baja
          </div>
        </div>
      </div>

      <div className="w-full space-y-3 lg:w-80">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          Incidentes Recientes ({filtered.length})
        </h3>

        <div className="max-h-[36rem] space-y-2 overflow-y-auto pr-1">
          {filtered.map((incident) => (
            <Card
              key={incident.id}
              className={`cursor-pointer transition-all hover:border-primary/30 hover:shadow-sm ${
                selectedIncident?.id === incident.id
                  ? "border-primary shadow-sm"
                  : ""
              }`}
              onClick={() => setSelectedIncident(incident)}
            >
              <CardHeader className="p-3 pb-1">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm leading-snug">
                    {incident.type}
                  </CardTitle>
                  <Badge
                    className={`shrink-0 text-[10px] ${severityColors[incident.severity]}`}
                  >
                    {incident.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {incident.description}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {incident.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {incident.lat.toFixed(4)}, {incident.lng.toFixed(4)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
