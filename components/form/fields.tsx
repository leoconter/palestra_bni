"use client";

import {
  AI_USAGE_DETAIL_TRIGGERS,
  AI_USAGE_OPTIONS,
  AUTOMATION_HISTORY_OPTIONS,
  FREQUENCY_OPTIONS,
  OUTCOME_OPTIONS,
  TIME_OPTIONS,
} from "@/lib/constants";
import type { DiagnosticAnswers } from "@/lib/types";
import ChipGroup from "./ChipGroup";

// Etapas 2 e 3 são idênticas para membro e convidado.
type FieldsProps = {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
};

export const inputClass =
  "w-full rounded-xl border border-navy-border bg-navy-soft px-4 py-3.5 text-base placeholder:text-muted/70 focus:border-yellow/60 focus:outline-none";

export function HowItWorksFields({ answers, update }: FieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="pain-description" className="text-base font-semibold">
          Conta com suas palavras como acontece hoje
        </label>
        <textarea
          id="pain-description"
          rows={4}
          value={answers.painDescription}
          onChange={(e) => update({ painDescription: e.target.value })}
          placeholder="Ex.: o cliente manda os dados no WhatsApp, a secretária copia pra planilha e monta o documento no Word."
          className={`mt-3 leading-relaxed ${inputClass}`}
        />
      </div>

      <ChipGroup
        label="Com que frequência isso acontece?"
        options={FREQUENCY_OPTIONS}
        value={answers.frequency}
        onChange={(v) => update({ frequency: v as string })}
      />
      <ChipGroup
        label="Quanto tempo consome por vez?"
        options={TIME_OPTIONS}
        value={answers.timePer}
        onChange={(v) => update({ timePer: v as string })}
      />
    </>
  );
}

export function ContextFields({ answers, update }: FieldsProps) {
  return (
    <>
      <div className="space-y-3">
        <ChipGroup
          label="Sua empresa já usa IA hoje?"
          options={AI_USAGE_OPTIONS}
          value={answers.aiUsage}
          onChange={(v) => update({ aiUsage: v as string })}
        />
        {answers.aiUsage &&
          AI_USAGE_DETAIL_TRIGGERS.includes(answers.aiUsage) && (
            <div className="step-in">
              <label htmlFor="ai-usage-detail" className="sr-only">
                Em quê?
              </label>
              <input
                id="ai-usage-detail"
                type="text"
                value={answers.aiUsageDetail}
                onChange={(e) => update({ aiUsageDetail: e.target.value })}
                placeholder="Em quê? (opcional)"
                className={inputClass}
              />
            </div>
          )}
      </div>
      <ChipGroup
        label="Já tentaram automatizar algo antes?"
        options={AUTOMATION_HISTORY_OPTIONS}
        value={answers.automationHistory}
        onChange={(v) => update({ automationHistory: v as string })}
      />
      <ChipGroup
        label="Se a gente resolvesse isso, o que mudaria?"
        options={OUTCOME_OPTIONS}
        value={answers.outcome}
        onChange={(v) => update({ outcome: v as string })}
      />
    </>
  );
}
