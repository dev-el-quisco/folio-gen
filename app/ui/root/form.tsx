"use client";

import { useState } from "react";
import { generateFolio } from "../../libs/actions";
import { toast, Toaster } from "react-hot-toast";

export default function NewFolioForm() {
  const [code, setCode] = useState("");
  const [folio, setFolio] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code || code.length < 2) {
      toast.error("Por favor ingrese un código válido de 2 caracteres");
      return;
    }

    toast.promise(
      generateFolio(code).then((response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        setFolio(response.folio || "");
        return response;
      }),
      {
        loading: "Generando folio...",
        success: "Folio generado exitosamente",
        error: (err) =>
          `Error: ${err.message || "No se pudo generar el folio"}`,
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between overflow-hidden rounded-lg bg-slate-50 shadow-sm">
        <label
          htmlFor="code"
          className="h-full w-[40%] grow p-4 text-sm font-medium text-slate-600"
        >
          Código:
        </label>
        <input
          id="code"
          type="text"
          value={code}
          maxLength={2}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="w-[60%] bg-white p-4 text-right font-mono text-lg font-semibold text-slate-700 ring-slate-300 outline-none"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 shadow-sm">
        <span className="text-sm font-medium text-slate-600">
          Folio generado:
        </span>
        <span className="font-mono text-lg font-semibold text-slate-800">
          {folio || "---"}
        </span>
      </div>

      <button
        type="submit"
        className="mt-2 w-full cursor-pointer rounded-lg bg-slate-800 px-8 py-3.5 font-medium text-white transition-all hover:bg-slate-700 focus:outline-none active:scale-[0.98] active:transform"
      >
        Generar nuevo folio
      </button>
    </form>
  );
}
