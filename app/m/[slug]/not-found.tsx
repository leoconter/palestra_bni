import Image from "next/image";
import Link from "next/link";

// Slug não encontrado: página amigável, nunca um 404 cru.
// A busca por nome/empresa entra aqui na Fase 4.
export default function MemberNotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center px-6 py-10">
      <Image
        src="/brand/logo-horizontal-claro.png"
        alt="Elev"
        width={350}
        height={180}
        priority
        className="h-7 w-auto"
      />
      <h1 className="mt-8 text-3xl font-extrabold leading-tight tracking-tight">
        Esse link não encontrou a sua página.
      </h1>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
        Pode ter faltado um pedaço do endereço no caminho. Confere o QR code no
        seu cartão — ou volta pro início que a gente te encontra.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block w-fit rounded-full bg-yellow px-6 py-3.5 font-bold text-navy transition-opacity hover:opacity-90"
      >
        Buscar minha página
      </Link>
    </main>
  );
}
