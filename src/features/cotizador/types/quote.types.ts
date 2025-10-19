import { Product } from "@/features/productos/types/product.types";

export interface QuoteItem {
    product: Product;
    selectedPrice: 'precio_a' | 'precio_aa' | 'precio_aaa';
    quantity: number;
    totalPrice: number;
}

export interface Quote {
    items: QuoteItem[];
    totalAmount: number;
    createdAt: Date;
}

export type PriceType = 'precio_a' | 'precio_aa' | 'precio_aaa';

export const PRICE_LABELS: Record<PriceType, string> = {
    precio_a: 'Precio A',
    precio_aa: 'Precio AA',
    precio_aaa: 'Precio AAA',
};