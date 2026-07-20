import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MemberPage from "@/components/MemberPage";
import { getMemberBySlug } from "@/lib/queries";
import { shareMetadata } from "@/lib/site";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) return {};

  // O preview no WhatsApp precisa dizer o nome da empresa: é o que faz o sócio
  // abrir o link que um colega mandou.
  return shareMetadata(
    `${member.company_name} — 3 tarefas para a IA assumir | Elev`,
    `Página feita pela Elev só para ${member.company_name}: 3 oportunidades reais de automação com IA, mapeadas para o seu negócio.`,
    `/m/${member.slug}`,
  );
}

export default async function MemberRoute({ params }: Props) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) notFound();

  const firstName = member.person_name.split(" ")[0];
  // Quem não tem empresa cadastrada usa o próprio nome no título — aí a
  // saudação não repete o nome logo acima dele.
  const personalBrand = member.company_name === member.person_name;

  return (
    <MemberPage
      content={{
        greeting: personalBrand
          ? "Esta página é sua."
          : `${firstName}, esta página é sua.`,
        firstName,
        headline: member.company_name,
        footnote: `Feita pela Elev só para ${member.company_name}. Nada aqui é modelo pronto.`,
        reading: member.reading,
        opportunities: member.opportunities,
        slug: member.slug,
      }}
    />
  );
}
