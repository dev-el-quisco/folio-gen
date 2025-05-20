"use server";

import { pool } from "./db";

export interface Folio {
  folio: string;
  fecha: Date;
}

// Devuelve los últimos 5 folios en orden descendente
export async function getLatestFolios(): Promise<Folio[]> {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT folio, fecha AT TIME ZONE 'UTC' as fecha FROM folios ORDER BY fecha DESC LIMIT 5",
    );

    // Convert the PostgreSQL timestamp to JavaScript Date objects
    const folios = result.rows.map((row) => ({
      folio: row.folio,
      fecha: new Date(row.fecha),
    }));

    return folios;
  } catch (error) {
    console.error("Error al obtener los últimos folios:", error);
    return [];
  } finally {
    client.release();
  }
}
