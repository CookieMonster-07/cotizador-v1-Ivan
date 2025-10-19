import { db } from "@/shared/utils/db";
import type { Product } from "../types/product.types";

/**
 * Obtiene todos los productos de la base de datos.
 * @returns Una promesa con un arreglo de productos.
 */
export async function getProducts() {
  try {
    const query =
      "select productos.id, productos.nombre, productos.precio_a, productos.precio_aa, productos.precio_aaa, categorias.nombre as categoria from productos inner join categorias on productos.categoria_id = categorias.id;";
    const result = await db.execute(query);
    return result.rows.map(row => ({
      id: row.id as string,
      nombre: row.nombre as string,
      precio_a: row.precio_a as number,
      precio_aa: row.precio_aa as number,
      precio_aaa: row.precio_aaa as number,
      categoria: row.categoria as string,
    })) as Product[];
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }
}
