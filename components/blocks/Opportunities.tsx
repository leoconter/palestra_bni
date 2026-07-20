import type { Opportunity } from "@/lib/types";
import OpportunityCard from "./OpportunityCard";

export default function Opportunities({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  return (
    <section aria-label="As 3 oportunidades" className="px-6 py-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
        As 3 oportunidades
      </p>
      <h2 className="mt-3 max-w-md text-3xl font-extrabold leading-tight tracking-tight">
        O que a IA assume primeiro.
      </h2>
      <div className="mt-8 space-y-5">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.title} opportunity={opportunity} />
        ))}
      </div>
    </section>
  );
}
