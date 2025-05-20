"use client";
import { Folio } from "@/app/libs/data";
import { formatDate, formatTime } from "@/app/libs/format";
import { toast } from "sonner";

export default function FoliosTable({ folios }: { folios: Folio[] }) {
  const handleClick = (folio: string) => {
    if (!folio) return;
    navigator.clipboard.writeText(folio);
    toast.success(`Folio ${folio} copiado`);
  };

  return (
    <div className="">
      <div className="px-2 py-3">
        <h2 className="text-xl font-bold text-slate-700">
          Últimos Folios Generados
        </h2>
      </div>

      {folios.length === 0 ? (
        <div className="p-6 text-center text-slate-500">
          No hay folios generados aún
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200/70 shadow-md shadow-slate-200/60">
          <table className="w-full border-collapse">
            <thead className="bg-slate-50">
              <tr className="grid grid-cols-2 border-b border-slate-200/70">
                <th className="px-4 py-2 text-left text-sm font-medium text-slate-600">
                  Folio
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-slate-600">
                  Fecha creación
                </th>
              </tr>
            </thead>
            <tbody>
              {folios.map((folio, index) => (
                <tr
                  key={index}
                  onClick={() => handleClick(folio.folio)}
                  className={`grid w-full cursor-pointer grid-cols-2 border-slate-100 not-last:border-b hover:bg-slate-100 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
                >
                  <td className="flex items-center px-4 py-3 text-xs text-slate-800">
                    {folio.folio}
                  </td>
                  <td className="flex items-center justify-end gap-1.5 px-4 py-3 text-xs text-slate-600 tabular-nums">
                    {formatDate(folio.fecha)},
                    <p className="rounded-lg bg-slate-200 px-1.5 py-0.5">
                      {formatTime(folio.fecha)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
