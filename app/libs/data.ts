"use server";

import { pool } from "./db";

export interface Folio {
  folio: string;
  fecha: Date;
}

/**
 * Obtiene los últimos 5 folios creados ordenados por fecha de creación descendente
 * @returns Promise con un array de los últimos 5 folios
 */
export async function getLatestFolios(): Promise<Folio[]> {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT folio, fecha FROM folios ORDER BY fecha DESC LIMIT 5",
    );

    return result.rows;
  } catch (error) {
    console.error("Error al obtener los últimos folios:", error);
    return [];
  } finally {
    client.release();
  }
}
