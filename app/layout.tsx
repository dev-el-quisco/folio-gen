import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Generador de Folios",
  description:
    "Generador de folios para actas de entrega de ayudas asistenciales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
