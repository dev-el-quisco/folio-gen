import { getLatestFolios } from "@/app/libs/data";

export default async function FoliosTable() {
  const folios = await getLatestFolios();

  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 shadow">
      <div className="bg-slate-50 px-4 py-3">
        <h2 className="text-lg font-semibold text-slate-700">
          Últimos Folios Generados
        </h2>
      </div>

      {folios.length === 0 ? (
        <div className="p-6 text-center text-slate-500">
          No hay folios generados aún
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="border-b border-slate-200 px-4 py-2 text-left text-sm font-medium text-slate-600">
                Folio
              </th>
              <th className="border-b border-slate-200 px-4 py-2 text-left text-sm font-medium text-slate-600">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {folios.map((folio, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                <td className="border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-800">
                  {folio.folio}
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-600">
                  {new Date(folio.fecha).toLocaleString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
