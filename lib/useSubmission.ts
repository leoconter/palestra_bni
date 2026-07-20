"use client";

import { useRef } from "react";
import type { DiagnosticAnswers } from "./types";

// Salva em segundo plano e guarda o id devolvido, para as etapas seguintes
// atualizarem a mesma linha. A interface nunca espera pela rede.
export function useSubmission(memberSlug?: string) {
  const idRef = useRef<string | null>(null);

  return (step: 1 | 2 | 3, answers: DiagnosticAnswers) => {
    fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: idRef.current,
        memberSlug: memberSlug ?? null,
        step,
        answers,
      }),
      keepalive: true,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.id) idRef.current = data.id;
      })
      .catch(() => {
        // Silencioso de propósito: o visitante já viu a confirmação.
      });
  };
}
