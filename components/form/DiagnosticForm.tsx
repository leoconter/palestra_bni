"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AI_USAGE_DETAIL_TRIGGERS,
  AI_USAGE_OPTIONS,
  AUTOMATION_HISTORY_OPTIONS,
  DIAGNOSIS_PROMISE,
  FREQUENCY_OPTIONS,
  OUTCOME_OPTIONS,
  PAIN_OTHER,
  TIME_OPTIONS,
} from "@/lib/constants";
import ChipGroup from "./ChipGroup";
import StepIndicator from "./StepIndicator";

// Escolher a dor abre uma tela dedicada: a página sai de cena e sobra só o
// formulário. Sem persistência ainda — o INSERT/UPDATE entra com a API.

type Props = {
  painTitles: string[];
  firstName: string;
};

export default function DiagnosticForm({ painTitles, firstName }: Props) {
  const [painChoice, setPainChoice] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [step, setStep] = useState<2 | 3>(2);
  const [done, setDone] = useState(false);

  const [painDescription, setPainDescription] = useState("");
  const [frequency, setFrequency] = useState<string | null>(null);
  const [timePer, setTimePer] = useState<string | null>(null);
  const [aiUsage, setAiUsage] = useState<string | null>(null);
  const [aiUsageDetail, setAiUsageDetail] = useState("");
  const [automationHistory, setAutomationHistory] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);

  const scrollerRef = useRef<HTMLDivElement>(null);

  const openWith = (pain: string) => {
    setPainChoice(pain);
    setStep(2);
    setDone(false);
    setFocused(true);
  };

  // CTA dos cards entra direto na tela dedicada com a dor já escolhida.
  useEffect(() => {
    const onSelect = (e: Event) => openWith((e as CustomEvent<string>).detail);
    window.addEventListener("elev:select-pain", onSelect);
    return () => window.removeEventListener("elev:select-pain", onSelect);
  }, []);

  // Trava a rolagem da página atrás da tela dedicada.
  useEffect(() => {
    if (!focused) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [focused]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 });
  }, [step, done]);

  const close = () => {
    setFocused(false);
    requestAnimationFrame(() =>
      document
        .getElementById("diagnostico")
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const painOptions = [...painTitles, PAIN_OTHER];

  const successCard = (
    <div className="step-in rounded-2xl border border-navy-border bg-navy-soft p-8">
      <span aria-hidden="true" className="block text-5xl leading-none text-yellow">
        *
      </span>
      <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight">
        Recebido, {firstName}.
      </h2>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-offwhite/85">
        A Elev vai estudar o que você contou. {DIAGNOSIS_PROMISE}
      </p>
    </div>
  );

  return (
    <>
      {/* Bloco na página: só a escolha da dor */}
      <section id="diagnostico" className="scroll-mt-6 px-6 py-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
          Diagnóstico
        </p>
        {done ? (
          <div className="mt-6">{successCard}</div>
        ) : (
          <>
            <h2 className="mt-3 max-w-md text-3xl font-extrabold leading-tight tracking-tight">
              Conta onde dói. A Elev estuda e devolve o caminho.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Começa escolhendo uma. São 3 passos curtos, quase tudo em toques.
            </p>

            <fieldset className="mt-8">
              <legend className="text-base font-semibold">
                Qual dessas dói mais?
              </legend>
              <div className="mt-4 space-y-3">
                {painOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => openWith(option)}
                    className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-navy-border bg-navy-soft px-4 py-3.5 text-left text-[15px] hover:border-yellow/60 active:border-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow"
                  >
                    {option}
                    <span aria-hidden="true" className="text-yellow">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          </>
        )}
      </section>

      {/* Tela dedicada */}
      {focused && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Diagnóstico da Elev"
          className="screen-in fixed inset-0 z-50 flex flex-col bg-navy"
        >
          <header className="safe-top shrink-0 border-b border-navy-border px-6 pb-4">
            <div className="flex items-center justify-between">
              <Image
                src="/brand/logo-horizontal-claro.png"
                alt="Elev"
                width={350}
                height={180}
                className="h-6 w-auto"
              />
              <button
                type="button"
                onClick={close}
                className="-mr-2 flex h-11 w-11 items-center justify-center text-muted hover:text-offwhite"
                aria-label="Fechar diagnóstico"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            {!done && (
              <div className="mt-4">
                <StepIndicator current={step} />
              </div>
            )}
          </header>

          <div ref={scrollerRef} className="flex-1 overflow-y-auto">
            <div
              className={`safe-bottom px-6 pt-6 ${done ? "flex min-h-full flex-col justify-center" : ""}`}
            >
              {done ? (
                successCard
              ) : (
                <>
                  <div className="rounded-xl border border-navy-border bg-navy-soft px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                        Sua dor
                      </span>
                      <button
                        type="button"
                        onClick={close}
                        className="text-[13px] text-muted underline underline-offset-4 hover:text-offwhite"
                      >
                        trocar
                      </button>
                    </div>
                    <p className="mt-1 text-sm font-semibold leading-snug">
                      {painChoice}
                    </p>
                  </div>

                  {step === 2 && (
                    <div key="step2" className="step-in mt-8 space-y-8">
                      <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
                        Como isso funciona hoje?
                      </h2>

                      <div>
                        <label
                          htmlFor="pain-description"
                          className="text-base font-semibold"
                        >
                          Conta com suas palavras como acontece hoje
                        </label>
                        <textarea
                          id="pain-description"
                          rows={4}
                          value={painDescription}
                          onChange={(e) => setPainDescription(e.target.value)}
                          placeholder="Ex.: o cliente manda os dados no WhatsApp, a secretária copia pra planilha e monta o documento no Word."
                          className="mt-3 w-full rounded-xl border border-navy-border bg-navy-soft px-4 py-3.5 text-base leading-relaxed placeholder:text-muted/70 focus:border-yellow/60 focus:outline-none"
                        />
                      </div>

                      <ChipGroup
                        label="Com que frequência isso acontece?"
                        options={FREQUENCY_OPTIONS}
                        value={frequency}
                        onChange={(v) => setFrequency(v as string)}
                      />
                      <ChipGroup
                        label="Quanto tempo consome por vez?"
                        options={TIME_OPTIONS}
                        value={timePer}
                        onChange={(v) => setTimePer(v as string)}
                      />

                      <div className="space-y-4 pt-1">
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="w-full rounded-full bg-yellow py-4 font-bold text-navy hover:opacity-90"
                        >
                          Continuar
                        </button>
                        <button
                          type="button"
                          onClick={() => setDone(true)}
                          className="mx-auto block min-h-11 text-sm text-muted underline underline-offset-4 hover:text-offwhite"
                        >
                          Enviar só isso por agora
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div key="step3" className="step-in mt-8 space-y-8">
                      <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
                        Só mais um pouco de contexto.
                      </h2>
                      <div className="space-y-3">
                        <ChipGroup
                          label="Sua empresa já usa IA hoje?"
                          options={AI_USAGE_OPTIONS}
                          value={aiUsage}
                          onChange={(v) => setAiUsage(v as string)}
                        />
                        {aiUsage && AI_USAGE_DETAIL_TRIGGERS.includes(aiUsage) && (
                          <div className="step-in">
                            <label htmlFor="ai-usage-detail" className="sr-only">
                              Em quê?
                            </label>
                            <input
                              id="ai-usage-detail"
                              type="text"
                              value={aiUsageDetail}
                              onChange={(e) => setAiUsageDetail(e.target.value)}
                              placeholder="Em quê? (opcional)"
                              className="w-full rounded-xl border border-navy-border bg-navy-soft px-4 py-3 text-base placeholder:text-muted/70 focus:border-yellow/60 focus:outline-none"
                            />
                          </div>
                        )}
                      </div>
                      <ChipGroup
                        label="Já tentaram automatizar algo antes?"
                        options={AUTOMATION_HISTORY_OPTIONS}
                        value={automationHistory}
                        onChange={(v) => setAutomationHistory(v as string)}
                      />
                      <ChipGroup
                        label="Se a gente resolvesse isso, o que mudaria?"
                        options={OUTCOME_OPTIONS}
                        value={outcome}
                        onChange={(v) => setOutcome(v as string)}
                      />

                      <div className="space-y-4 pt-1">
                        <div>
                          <button
                            type="button"
                            onClick={() => setDone(true)}
                            className="w-full rounded-full bg-yellow py-4 font-bold text-navy hover:opacity-90"
                          >
                            Enviar e receber meu diagnóstico
                          </button>
                          <p className="mt-3 text-center text-[13px] leading-snug text-muted">
                            {DIAGNOSIS_PROMISE}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="mx-auto block min-h-11 text-sm text-muted underline underline-offset-4 hover:text-offwhite"
                        >
                          Voltar
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {done && (
                <button
                  type="button"
                  onClick={close}
                  className="mx-auto mt-8 block min-h-11 text-sm text-muted underline underline-offset-4 hover:text-offwhite"
                >
                  Fechar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
