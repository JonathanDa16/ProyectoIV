"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, BookOpen } from "lucide-react";
import { StarRating } from "@/components/star-rating";

const videos = [
  {
    id: 1,
    title: "Como reportar un incidente correctamente",
    description:
      "Tutorial paso a paso para crear un reporte efectivo con toda la informacion necesaria.",
    embedUrl: "https://www.youtube.com/embed/Z9HJ7ZGxcwg",
    duration: "5:32",
    category: "Tutorial",
  },
  {
    id: 2,
    title: "Medidas de prevencion para tu hogar",
    description:
      "Consejos practicos de seguridad para proteger tu casa y tu familia.",
    embedUrl: "https://www.youtube.com/embed/XyloZTeCv7I",
    duration: "8:15",
    category: "Prevencion",
  },
  {
    id: 3,
    title: "Organizacion vecinal efectiva",
    description:
      "Aprende a organizar rondines y crear una red de comunicacion entre vecinos.",
    embedUrl: "https://www.youtube.com/embed/BxuYm99Mee8",
    duration: "12:40",
    category: "Organizacion",
  },
];

export function VideoSection() {
  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Contenido Educativo
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <div className="relative aspect-video bg-foreground/5">
              <iframe
                src={video.embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
                  {video.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Play className="h-3 w-3" />
                  {video.duration}
                </span>
              </div>
              <CardTitle className="text-sm">{video.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {video.description}
              </p>
              <div className="flex items-center justify-between">
                <StarRating size="sm" />
                <span className="text-[10px] text-muted-foreground">
                  Valora este video
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
