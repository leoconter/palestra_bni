"use client";

import { useRef } from "react";
import type { DiagnosticAnswers } from "./types";

// O id nasce no cliente e não no servidor. Se dependesse da resposta da
// primeira gravação, alguém avançando antes dela voltar criaria uma segunda
// linha — o que acontece com facilidade em rede de celular.
//
// As chamadas também são encadeadas: garante que a etapa 3 nunca chegue ao
// banco antes da 2 e sobrescreva com dados mais pobres.
export function useSubmission(memberSlug?: string) {
  const idRef = useRef<string | null>(null);
  const fila = useRef<Promise<unknown>>(Promise.resolve());

  return (step: 1 | 2 | 3, answers: DiagnosticAnswers) => {
    idRef.current ??= crypto.randomUUID();
    const id = idRef.current;

    fila.current = fila.current
      .then(() =>
        fetch("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            memberSlug: memberSlug ?? null,
            step,
            answers,
          }),
          keepalive: true,
        }),
      )
      .catch(() => {
        // Silencioso de propósito: o visitante já viu a confirmação.
      });
  };
}
