import { getProducts } from "@/features/productos/services/productService"
import QuoteManager from "@/features/cotizador/components/QuoteManager"

export default async function CotizadorPage() {
    const products = await getProducts()
    return <QuoteManager initialProducts={products} />
}
