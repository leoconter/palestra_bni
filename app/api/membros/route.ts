import { NextResponse } from "next/server";
import { getAllMembers } from "@/lib/queries";

// A busca acontece aqui e não no navegador: assim a lista completa de membros
// nunca é enviada para uma página pública.
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export async function GET(request: Request) {
  const q = normalize(
    new URL(request.url).searchParams.get("q")?.trim() ?? "",
  );
  if (q.length < 2) return NextResponse.json({ results: [] });

  const members = await getAllMembers();
  const results = members
    .filter((m) => normalize(`${m.company_name} ${m.person_name}`).includes(q))
    .slice(0, 8)
    .map((m) => ({
      slug: m.slug,
      person_name: m.person_name,
      company_name: m.company_name,
    }));

  return NextResponse.json({ results });
}
