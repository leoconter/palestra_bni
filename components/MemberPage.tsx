import type { Opportunity } from "@/lib/types";
import Hero from "./blocks/Hero";
import Reading from "./blocks/Reading";
import Opportunities from "./blocks/Opportunities";
import DiagnosticForm from "./form/DiagnosticForm";
import Footer from "./blocks/Footer";

// Estrutura compartilhada entre /m/[slug] e /convidado (Fase 4):
// os 5 blocos do briefing, nesta ordem, sem nada além deles.
export type PageContent = {
  greeting: string;
  firstName: string;
  headline: string;
  footnote: string;
  reading: string;
  opportunities: Opportunity[];
};

export default function MemberPage({ content }: { content: PageContent }) {
  return (
    <main className="mx-auto w-full max-w-lg">
      <Hero
        greeting={content.greeting}
        headline={content.headline}
        footnote={content.footnote}
      />
      <Reading text={content.reading} />
      <Opportunities opportunities={content.opportunities} />
      <DiagnosticForm
        painTitles={content.opportunities.map((o) => o.title)}
        firstName={content.firstName}
      />
      <Footer />
    </main>
  );
}
