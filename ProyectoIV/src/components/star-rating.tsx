"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  onRate?: (rating: number) => void
  initialRating?: number
  size?: "sm" | "md"
}

export function StarRating({
  onRate,
  initialRating = 0,
  size = "md",
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)
  const [hasRated, setHasRated] = useState(false)

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5"

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => {
            setRating(star)
            setHasRated(true)
            onRate?.(star)
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
          aria-label={`${star} estrellas`}
        >
          <Star
            className={`${iconSize} ${
              star <= (hover || rating)
                ? "fill-warning text-warning"
                : "text-muted-foreground/40"
            } transition-colors`}
          />
        </button>
      ))}
      {hasRated && (
        <span className="ml-1 animate-in fade-in text-xs text-muted-foreground">
          Gracias
        </span>
      )}
    </div>
  )
}
