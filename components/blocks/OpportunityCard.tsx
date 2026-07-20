import type { Opportunity } from "@/lib/types";
import PainCTA from "./PainCTA";

// Estrutura de extrato: Hoje / Com IA / Ganho como linhas de um balanço de tempo.
export default function OpportunityCard({
  opportunity,
}: {
  opportunity: Opportunity;
}) {
  return (
    <article className="rounded-2xl border border-navy-border bg-navy-soft p-6 transition-colors hover:border-yellow/40">
      <h3 className="text-xl font-bold leading-tight">{opportunity.title}</h3>

      <dl className="mt-5 space-y-4">
        <div className="grid grid-cols-[3.75rem_1fr] gap-3">
          <dt className="pt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Hoje
          </dt>
          <dd className="text-sm leading-relaxed text-offwhite/75">
            {opportunity.today}
          </dd>
        </div>
        <div className="grid grid-cols-[3.75rem_1fr] gap-3">
          <dt className="pt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-yellow">
            Com IA
          </dt>
          <dd className="text-sm leading-relaxed">{opportunity.with_ai}</dd>
        </div>
        <div className="grid grid-cols-[3.75rem_1fr] items-baseline gap-3 border-t border-navy-border pt-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Ganho
          </dt>
          <dd className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-bold text-yellow">
              {opportunity.gain}
            </span>
            <span className="rounded-full border border-navy-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
              estimativa
            </span>
          </dd>
        </div>
      </dl>

      <PainCTA title={opportunity.title} />
    </article>
  );
}
