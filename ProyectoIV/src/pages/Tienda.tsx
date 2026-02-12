import { ProductCatalog } from "@/components/product-catalog"

export default function TiendaPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Tienda de Seguridad
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Catalogo de articulos de seguridad para proteger tu hogar y tu
                    familia. Agrega productos al carrito y revisa tu pedido.{" "}
                    <span className="text-xs italic">
                        (Prototipo - no se realizan transacciones reales)
                    </span>
                </p>
            </div>
            <ProductCatalog />
        </div>
    )
}
