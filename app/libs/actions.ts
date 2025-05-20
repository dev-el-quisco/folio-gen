"use server";

import { revalidatePath } from "next/cache";
import { pool } from "./db";

export async function generateFolio(
  code: string,
): Promise<{ success: boolean; folio?: string; message?: string }> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await client.query(
      "SELECT generate_unique_folio($1) AS folio",
      [code],
    );

    const folio = result.rows[0]?.folio;
    if (!folio) {
      throw new Error("No se generó el folio");
    }

    await client.query(
      "INSERT INTO folios (folio, fecha) VALUES ($1, now() at time zone 'UTC')",
      [folio],
    );

    await client.query("COMMIT");
    revalidatePath("/");
    return { success: true, folio };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al generar el folio:", error);
    return { success: false, message: "Error al generar e insertar el folio" };
  } finally {
    client.release();
  }
}
