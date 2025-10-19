'use client';

import { useState } from "react";
import { Product } from "@/features/productos/types/product.types";
import { PriceType, PRICE_LABELS } from "../types/quote.types";

interface ProductCardProps {
    product: Product;
    onAddToQuote: (product: Product, selectedPrice: PriceType, quantity: number) => void;
}

export default function ProductCard({ product, onAddToQuote }: ProductCardProps) {
    const [selectedPrice, setSelectedPrice] = useState<PriceType>('precio_a');
    const [quantity, setQuantity] = useState(1);

    const handleAddToQuote = () => {
        onAddToQuote(product, selectedPrice, quantity);
        setQuantity(1);
    }

    const currentPrice = product[selectedPrice];

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.nombre}</h3>
            <p className="text-sm text-gray-600 mb-4">{product.categoria}</p>

            {/* Selector de Precio */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Precio:
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {(['precio_a', 'precio_aa', 'precio_aaa'] as PriceType[]).map((priceType) => (
                        <button
                            key={priceType}
                            onClick={() => setSelectedPrice(priceType)}
                            className={`px-3 py-2 text-sm rounded-md font-medium transition-colors ${selectedPrice === priceType
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {PRICE_LABELS[priceType]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Precio Actual */}
            <div className="mb-4">
                <span className="text-2xl font-bold text-green-600">
                    $ {currentPrice.toFixed(2)}
                </span>
            </div>

            {/* Cantidad y Botón */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Cantidad:</label>
                    <input
                        type="text"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                </div>
                <button
                    onClick={handleAddToQuote}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                >
                    Agregar a Cotización
                </button>
            </div>

        </div>
    )

}
