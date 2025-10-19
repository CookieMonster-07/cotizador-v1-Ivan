"use client";

import { useState, useCallback } from "react";
import type { QuoteItem, PriceType } from "../types/quote.types";
import { Product } from "@/features/productos/types/product.types";

export function useQuote() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  const addToQuote = useCallback(
    (product: Product, selectedPrice: PriceType, quantity: number = 1) => {
      setQuoteItems((prev) => {
        const existingItemIndex = prev.findIndex(item => item.product.id === product.id && item.selectedPrice === selectedPrice);
        if (existingItemIndex >= 0) {
          // Si ya existe, actualizar cantidad
          const updatedItems = [...prev];
          updatedItems[existingItemIndex].quantity += quantity;
          updatedItems[existingItemIndex].totalPrice = updatedItems[existingItemIndex].product[selectedPrice] * updatedItems[existingItemIndex].quantity;
          return updatedItems;
        } else {
          // Si no existe, agregar nuevo item
          const newItem: QuoteItem = {
            product,
            selectedPrice,
            quantity,
            totalPrice: product[selectedPrice] * quantity
          };
          return [...prev, newItem];
        }
      });
    }, []);

  const removeFromQuote = useCallback((productId: string, selectedPrice: PriceType) => {
    setQuoteItems((prev) => {
      return prev.filter(item => !(item.product.id === productId && item.selectedPrice === selectedPrice));
    });
  }, []);

  const updateQuantity = useCallback((productId: string, selectedPrice: PriceType, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuote(productId, selectedPrice);
      return;
    }

    setQuoteItems((prev) =>
      prev.map(item =>
        item.product.id === productId && item.selectedPrice === selectedPrice ? {
          ...item,
          quantity,
          totalPrice: item.product[selectedPrice] * quantity
        } : item
      )
    )
  }, [removeFromQuote])

  const clearQuote = useCallback(() => {
    setQuoteItems([]);
  }, [])

  const totalAmount = quoteItems.reduce((sum, item) => sum + item.totalPrice, 0)

  return {
    quoteItems,
    totalAmount,
    addToQuote,
    removeFromQuote,
    updateQuantity,
    clearQuote,
  };
}
