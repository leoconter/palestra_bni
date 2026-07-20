import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/blocks/Footer";
import GuestForm from "@/components/form/GuestForm";
import { shareMetadata } from "@/lib/site";

const title = "Convidado — diagnóstico da Elev";
const description =
  "Conta pra Elev qual tarefa mais consome tempo na sua empresa e receba um diagnóstico de automação com IA em até 48h.";

export const metadata: Metadata = shareMetadata(title, description, "/convidado");

export default function GuestRoute() {
  return (
    <main className="mx-auto w-full max-w-lg">
      <header className="px-6 pb-2 pt-5">
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
            Convidado
          </span>
        </div>

        <h1 className="mt-10 text-[clamp(2.1rem,9vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
          Vale para você
          <span className="text-yellow">*</span> também
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          Você não é membro, mas a dor é a mesma.{" "}
          <span className="font-bold text-yellow">
            Conta a sua em 3 passos curtos
          </span>{" "}
          e a Elev devolve o caminho.
        </p>
        <p className="mt-4 max-w-sm text-[13px] leading-snug text-muted">
          <span className="text-yellow">*</span> O mesmo diagnóstico que os
          membros receberam, feito a partir do que você contar aqui.
        </p>
      </header>

      <div className="mt-10">
        <GuestForm />
      </div>

      <Footer />
    </main>
  );
}
