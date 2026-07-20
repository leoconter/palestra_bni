import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_URL, shareMetadata } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Elev — 3 tarefas que a IA pode assumir na sua empresa";
const description =
  "Página feita pela Elev com 3 oportunidades reais de automação com IA, mapeadas para a sua empresa.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...shareMetadata(title, description, "/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
