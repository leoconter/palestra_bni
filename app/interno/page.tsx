import type { Metadata } from "next";
import Image from "next/image";
import MemberDirectory from "@/components/MemberDirectory";
import { getAllMembers } from "@/lib/queries";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Páginas dos membros | Elev × BNI",
  robots: { index: false, follow: false },
};

export default async function InternalRoute() {
  const members = await getAllMembers();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 pb-16 pt-6">
      <div className="flex items-center justify-between">
        <Image
          src="/brand/logo-horizontal-claro.png"
          alt="Elev"
          width={350}
          height={180}
          priority
          className="h-6 w-auto"
        />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
          Uso interno
        </span>
      </div>

      <h1 className="mt-8 text-3xl font-extrabold leading-tight tracking-tight">
        Páginas dos membros
        <span className="text-yellow">*</span>
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Uma página por membro. Toque no nome para abrir, ou copie o link para
        gerar o QR code.
      </p>

      <div className="mt-8">
        <MemberDirectory members={members} />
      </div>
    </main>
  );
}
