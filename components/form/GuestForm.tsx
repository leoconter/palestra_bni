"use client";

import { useEffect, useRef, useState } from "react";
import { DIAGNOSIS_PROMISE } from "@/lib/constants";
import { emptyAnswers, type DiagnosticAnswers } from "@/lib/types";
import { useSubmission } from "@/lib/useSubmission";
import { ContextFields, HowItWorksFields, inputClass } from "./fields";
import StepIndicator from "./StepIndicator";
import SuccessCard from "./SuccessCard";

// Convidado não chega por slug, então se identifica na primeira etapa —
// é o que permite a Elev devolver o diagnóstico depois.
const STEPS = ["Você", "Como funciona", "Contexto"];

export default function GuestForm() {
  const [answers, setAnswers] = useState<DiagnosticAnswers>(emptyAnswers);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [done, setDone] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const save = useSubmission();

  const update = (patch: Partial<DiagnosticAnswers>) =>
    setAnswers((a) => ({ ...a, ...patch }));

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, done]);

  const canContinue =
    answers.visitorName.trim().length > 1 &&
    answers.visitorCompany.trim().length > 1 &&
    answers.visitorWhatsapp.trim().length > 7 &&
    answers.painChoice.trim().length > 2;

  const finish = (reached: 1 | 2 | 3) => {
    save(reached, answers);
    setDone(true);
  };

  const firstName = answers.visitorName.trim().split(" ")[0];

  if (done) {
    return (
      <div className="px-6 py-16">
        <SuccessCard firstName={firstName || undefined} />
      </div>
    );
  }

  return (
    <div className="px-6 pb-16">
      <div ref={topRef} className="scroll-mt-4" />
      <StepIndicator current={step} steps={STEPS} />

      {step === 1 && (
        <div key="s1" className="step-in mt-8 space-y-7">
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
            Primeiro, quem é você.
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="text-base font-semibold">
                Seu nome
              </label>
              <input
                id="nome"
                type="text"
                autoComplete="name"
                value={answers.visitorName}
                onChange={(e) => update({ visitorName: e.target.value })}
                placeholder="Como podemos te chamar"
                className={`mt-3 ${inputClass}`}
              />
            </div>
            <div>
              <label htmlFor="empresa" className="text-base font-semibold">
                Sua empresa
              </label>
              <input
                id="empresa"
                type="text"
                autoComplete="organization"
                value={answers.visitorCompany}
                onChange={(e) => update({ visitorCompany: e.target.value })}
                placeholder="Nome da empresa e o que ela faz"
                className={`mt-3 ${inputClass}`}
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="text-base font-semibold">
                Seu WhatsApp
              </label>
              <input
                id="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={answers.visitorWhatsapp}
                onChange={(e) => update({ visitorWhatsapp: e.target.value })}
                placeholder="(51) 9 9999-9999"
                className={`mt-3 ${inputClass}`}
              />
              <p className="mt-2 text-[13px] text-muted">
                É por aqui que o diagnóstico chega. Nada de lista de e-mail.
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="tarefa" className="text-base font-semibold">
              Qual tarefa mais consome tempo aí dentro?
            </label>
            <input
              id="tarefa"
              type="text"
              value={answers.painChoice}
              onChange={(e) => update({ painChoice: e.target.value })}
              placeholder="Ex.: montar orçamento para cada cliente"
              className={`mt-3 ${inputClass}`}
            />
          </div>

          <button
            type="button"
            disabled={!canContinue}
            onClick={() => {
              save(1, answers);
              setStep(2);
            }}
            className="w-full rounded-full bg-yellow py-4 font-bold text-navy hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
          >
            Continuar
          </button>
        </div>
      )}

      {step === 2 && (
        <div key="s2" className="step-in mt-8 space-y-8">
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
            Como isso funciona hoje?
          </h2>
          <HowItWorksFields answers={answers} update={update} />

          <div className="space-y-4 pt-1">
            <button
              type="button"
              onClick={() => {
                save(2, answers);
                setStep(3);
              }}
              className="w-full rounded-full bg-yellow py-4 font-bold text-navy hover:opacity-90"
            >
              Continuar
            </button>
            <button
              type="button"
              onClick={() => finish(2)}
              className="mx-auto block min-h-11 text-sm text-muted underline underline-offset-4 hover:text-offwhite"
            >
              Enviar só isso por agora
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div key="s3" className="step-in mt-8 space-y-8">
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
            Só mais um pouco de contexto.
          </h2>
          <ContextFields answers={answers} update={update} />

          <div className="space-y-4 pt-1">
            <div>
              <button
                type="button"
                onClick={() => finish(3)}
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
    </div>
  );
}
