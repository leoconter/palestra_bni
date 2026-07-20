"use client";

// O clique rola até o formulário (âncora nativa + scroll suave do CSS)
// e avisa o DiagnosticForm para pré-selecionar esta dor.
export default function PainCTA({ title }: { title: string }) {
  return (
    <a
      href="#diagnostico"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("elev:select-pain", { detail: title }),
        )
      }
      className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full border border-yellow/60 py-3 text-center font-semibold text-yellow transition-colors hover:bg-yellow hover:text-navy"
    >
      Essa é a minha dor →
    </a>
  );
}
