import FoliosTableContext from "./ui/root/FoliosTableContext";
import NewFolioForm from "./ui/root/NewFolioForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gradient-to-b from-slate-50 to-slate-100 p-8 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="mb-3 text-3xl font-bold text-slate-800">
          Generador de Folios
        </h1>
        <p className="text-sm text-slate-500">
          Generador de folios para actas de entrega de ayudas asistenciales
        </p>
        <NewFolioForm />
      </div>
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
        <FoliosTableContext />
      </div>
    </main>
  );
}
