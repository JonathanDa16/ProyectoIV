"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Camara de Seguridad HD",
    description:
      "Camara IP WiFi con vision nocturna, deteccion de movimiento y audio bidireccional. Resolucion 1080p.",
    price: 1299,
    image: "/images/product-camera.jpg",
    category: "Camaras",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Sistema de Alarma Inteligente",
    description:
      "Panel de alarma con sensores de puerta/ventana, sirena y control remoto via app movil.",
    price: 2499,
    image: "/images/product-alarm.jpg",
    category: "Alarmas",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 3,
    name: "Sensor de Movimiento",
    description:
      "Sensor PIR con alcance de 12 metros, notificaciones al celular y compatible con alarmas.",
    price: 449,
    image: "/images/product-sensor.jpg",
    category: "Sensores",
    rating: 4.3,
    reviews: 67,
  },
  {
    id: 4,
    name: "Cerradura Inteligente",
    description:
      "Cerradura digital con huella, codigo y llave. Registro de accesos y control remoto.",
    price: 3299,
    image: "/images/product-lock.jpg",
    category: "Cerraduras",
    rating: 4.8,
    reviews: 54,
  },
  {
    id: 5,
    name: "Kit de Seguridad Hogar",
    description:
      "Kit completo: 2 camaras, central, 3 sensores de movimiento y sirena. Instalacion sencilla.",
    price: 5999,
    image: "/images/product-kit.jpg",
    category: "Kits",
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 6,
    name: "Reflector LED con Sensor",
    description:
      "Reflector de 50W con sensor de movimiento, resistente a lluvia. Ideal para exteriores.",
    price: 699,
    image: "/images/product-light.jpg",
    category: "Iluminacion",
    rating: 4.4,
    reviews: 156,
  },
];

export function ProductCatalog() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        toast.success(`"${product.name}" agregado al carrito`, {
          description: `Cantidad en carrito: ${existing.quantity + 1}`,
        });
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      toast.success(`"${product.name}" agregado al carrito`, {
        description: "Cantidad en carrito: 1",
      });
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {[...new Set(products.map((p) => p.category))].map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative hover-lift">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Carrito
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-96 flex-col">
            <SheetHeader>
              <SheetTitle>Tu Carrito ({itemCount} articulos)</SheetTitle>
            </SheetHeader>

            {orderPlaced && (
              <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 p-3 animate-in fade-in">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <p className="text-sm font-medium text-success">
                  El pedido se ha realizado exitosamente
                </p>
              </div>
            )}

            {cart.length === 0 && !orderPlaced ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Tu carrito esta vacio
                </p>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-3 overflow-y-auto py-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.product.name}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="rounded p-1 text-muted-foreground hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="rounded p-1 text-muted-foreground hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-1 rounded p-1 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Total
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    ${total.toLocaleString()} MXN
                  </span>
                </div>
                <Button className="w-full" size="lg" onClick={handleOrder}>
                  Simular Pedido
                </Button>
                <p className="text-center text-[10px] text-muted-foreground">
                  Prototipo - no se realizan cobros reales
                </p>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group hover-lift animate-pop-in overflow-hidden transition-all hover:shadow-md"
            style={{ animationDelay: `${product.id * 70}ms` }}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge className="absolute left-3 top-3 bg-card/90 text-foreground backdrop-blur-sm">
                {product.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground">
                {product.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {product.description}
              </p>

              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? "fill-warning text-warning"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
                <span className="ml-1 text-[10px] text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">
                  ${product.price.toLocaleString()}
                </span>
                <Button size="sm" onClick={() => addToCart(product)}>
                  <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                  Agregar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
