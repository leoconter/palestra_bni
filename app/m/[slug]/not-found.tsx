import Image from "next/image";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";

// Slug não encontrado: página amigável com a busca, nunca um 404 cru.
export default function MemberNotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-6 pb-12 pt-5">
      <Image
        src="/brand/logo-horizontal-claro.png"
        alt="Elev"
        width={350}
        height={180}
        priority
        className="h-7 w-auto"
      />

      <div className="mt-16">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
          Esse link não encontrou a sua página.
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
          Pode ter faltado um pedaço do endereço no caminho. Busca aqui pelo seu
          nome ou o da sua empresa que a gente te leva até ela.
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
