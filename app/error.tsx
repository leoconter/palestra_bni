"use client";

import { useEffect } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

// Se algo falhar no servidor, o membro vê isto — nunca a tela crua do
// navegador. Numa reunião, a saída pelo WhatsApp vale mais que um "recarregue".
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro na página:", error);
  }, [error]);

  const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Oi! Tentei abrir minha página do BNI e deu erro.",
      )}`
    : null;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center px-6 py-10">
      <p className="text-lg font-extrabold tracking-tight">
        ELEV<span className="text-yellow">*</span>
      </p>
      <h1 className="mt-8 text-3xl font-extrabold leading-tight tracking-tight">
        A página não carregou.
      </h1>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
        O problema é do nosso lado, não do seu link. Tenta de novo em um
        instante — se insistir, a gente resolve pelo WhatsApp.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="min-h-12 rounded-full bg-yellow px-6 font-bold text-navy hover:opacity-90"
        >
          Tentar de novo
        </button>
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center rounded-full border border-navy-border px-6 font-semibold hover:border-yellow/50"
          >
            Falar no WhatsApp
          </a>
        )}
      </div>
    </main>
  );
}
