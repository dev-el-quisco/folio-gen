"use client";

import { useState } from "react";
import { generateFolio } from "../../libs/actions";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

export default function NewFolioForm() {
  const [code, setCode] = useState("");
  const [folio, setFolio] = useState("");
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code || code.length < 2) {
      toast.error("Por favor ingrese un código válido de 2 caracteres");
      return;
    }

    const toastId = toast.loading("Generando folio...");

    try {
      const response = await generateFolio(code);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success("Folio generado exitosamente", { id: toastId });
      setFolio(response.folio || "");
      route.refresh();
    } catch (error) {
      toast.error(
        `Error: ${(error as Error).message || "No se pudo generar el folio"}`,
        { id: toastId },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      <Toaster position="top-center" />
      <div className="flex h-11 items-center justify-between overflow-hidden rounded-md border border-slate-100 bg-slate-50">
        <label
          htmlFor="code"
          className="w-[25%] grow px-4 text-sm font-medium text-slate-600"
        >
          Código:
        </label>
        <input
          id="code"
          type="text"
          value={code}
          maxLength={2}
          placeholder="TA"
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="h-full w-[75%] bg-white px-4 text-right font-mono font-semibold text-slate-700 ring-slate-300 outline-none"
        />
      </div>

      <div className="flex h-11 items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4">
        <span className="text-sm font-medium text-slate-600">
          Folio generado:
        </span>
        <span className="font-mono font-semibold text-slate-800">
          {folio || "---"}
        </span>
      </div>

      <button
        type="submit"
        className="mt-1 h-11 w-full cursor-pointer rounded-md bg-slate-800 text-sm text-white transition-all hover:bg-slate-700 focus:outline-none active:scale-[0.98] active:transform"
      >
        Generar nuevo folio
      </button>
    </form>
  );
}
