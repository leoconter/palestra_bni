import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";

export const metadata: Metadata = {
  title: "Elev × BNI — encontre sua página",
  description:
    "Busque pelo seu nome ou o da sua empresa para abrir a página que a Elev preparou para você.",
};

// Fallback para quem escaneou o QR errado ou digitou o endereço na mão.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-6 pb-12 pt-5">
      <div className="flex items-center justify-between">
        <Image
          src="/brand/logo-horizontal-claro.png"
          alt="Elev"
          width={350}
          height={180}
          priority
          className="h-7 w-auto"
        />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
          Encontro BNI
        </span>
      </div>

      <div className="mt-16">
        <h1 className="text-[clamp(2.2rem,9.5vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
          Sua página
          <span className="text-yellow">*</span> está aqui
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-offwhite/85">
          Cada membro tem uma, feita só para a empresa dele.
        </p>

        <div className="mt-10">
          <SearchBox />
        </div>
      </div>

      <div className="mt-auto border-t border-navy-border pt-6">
        <p className="text-sm text-muted">Não é membro?</p>
        <Link
          href="/convidado"
          className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-yellow hover:underline"
        >
          Sou convidado <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
