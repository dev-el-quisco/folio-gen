export default function Home() {
  return (
    <div className="flex min-h-screen grid-rows-[20px_1fr_20px] items-center justify-center p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col gap-5">
        <span>
          <h1 className="text-5xl leading-[1] font-bold">
            Generador de Folios
          </h1>
          {/* <p className="text-lg leading-[1.5]">
            Generador de folios para actas de entrega de ayudas asistenciales
          </p> */}
        </span>
        <span className="grid grow grid-cols-2 gap-5">
          <button className="h-11 grow rounded-lg bg-slate-800 px-8">
            Generar
          </button>
          <p className="flex items-center rounded-lg border border-slate-700 px-3.5">
            4CB2C53D-25-DO
          </p>
        </span>
      </main>
    </div>
  );
}
