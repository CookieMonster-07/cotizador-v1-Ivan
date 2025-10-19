'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/features/productos/types/product.types';
import { useQuote } from '../hooks/useQuote';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import QuoteCart from '../components/QuoteCart';

interface QuoteManagerProps {
    initialProducts: Product[];
}

export default function QuoteManager({ initialProducts }: QuoteManagerProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { quoteItems, totalAmount, addToQuote, updateQuantity, removeFromQuote, clearQuote } = useQuote();

    // Obtener categorías únicas
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(initialProducts.map(p => p.categoria))];
        return uniqueCategories.sort();
    }, [initialProducts]);

    // Filtrar productos por categoría
    const filteredProducts = useMemo(() => {
        if (!selectedCategory) return initialProducts;
        return initialProducts.filter(product => product.categoria === selectedCategory);
    }, [initialProducts, selectedCategory]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Cotizador de Productos</h1>
                    <p className="text-gray-600">Selecciona productos y sus precios para crear tu cotización</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna de Productos */}
                    <div className="lg:col-span-2">
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToQuote={addToQuote}
                                />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    No se encontraron productos en esta categoría
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Columna del Carrito */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <QuoteCart
                                items={quoteItems}
                                totalAmount={totalAmount}
                                onUpdateQuantity={updateQuantity}
                                onRemoveItem={removeFromQuote}
                                onClearQuote={clearQuote}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}