'use client';

import { QuoteItem, PRICE_LABELS, PriceType } from "../types/quote.types";

interface QuoteCartProps {
    items: QuoteItem[];
    totalAmount: number;
    onUpdateQuantity: (productId: string, selectedPrice: PriceType, quantity: number) => void;
    onRemoveItem: (productId: string, selectedPrice: PriceType) => void;
    onClearQuote: () => void;
}

export default function QuoteCart({ items, totalAmount, onUpdateQuantity, onRemoveItem, onClearQuote }: QuoteCartProps) {
    if (items.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Cotización</h3>
                <p className="text-gray-500 text-center py-8">
                    No hay productos en la cotización
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Cotización</h3>
                <button
                    onClick={onClearQuote}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                    Limpiar Todo
                </button>
            </div>

            <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {items.map((item, index) => (
                    <div key={`${item.product.id}-${item.selectedPrice}`} className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-800">{item.product.nombre}</h4>
                                <p className="text-sm text-gray-600">
                                    {PRICE_LABELS[item.selectedPrice]} - Bs. {item.product[item.selectedPrice].toFixed(2)}
                                </p>
                            </div>
                            <button
                                onClick={() => onRemoveItem(item.product.id, item.selectedPrice)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">Cantidad:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => onUpdateQuantity(
                                        item.product.id,
                                        item.selectedPrice,
                                        Math.max(1, parseInt(e.target.value) || 1)
                                    )}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                                />
                            </div>
                            <span className="font-semibold text-gray-800">
                                $ {item.totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">$ {totalAmount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}