import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import type { DiagnosticAnswers } from "@/lib/types";

// O cliente manda sempre o mesmo id ao longo das etapas, então aqui é upsert:
// a primeira chamada cria a linha e as seguintes enriquecem a mesma.
//
// Nunca devolve erro ao visitante: numa reunião, um problema de banco não pode
// virar tela vermelha na mão de quem acabou de nos dar o contato.

type Payload = {
  id: string;
  memberSlug?: string | null;
  step: 1 | 2 | 3;
  answers: DiagnosticAnswers;
};

export async function POST(request: Request) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("SUPABASE_SERVICE_ROLE_KEY ausente: submissão não gravada.");
    return NextResponse.json({ stored: false });
  }

  try {
    const { id, memberSlug, step, answers } = (await request.json()) as Payload;
    if (!id) return NextResponse.json({ stored: false });

    const db = supabaseService();

    let memberId: string | null = null;
    if (memberSlug) {
      const { data } = await db
        .from("bni_members")
        .select("id")
        .eq("slug", memberSlug)
        .maybeSingle();
      memberId = data?.id ?? null;
    }

    await db.from("bni_submissions").upsert({
      id,
      member_id: memberId,
      step_reached: step,
      pain_choice: answers.painChoice,
      pain_description: answers.painDescription || null,
      frequency: answers.frequency,
      time_per_occurrence: answers.timePer,
      ai_usage: answers.aiUsage,
      ai_usage_detail: answers.aiUsageDetail || null,
      automation_history: answers.automationHistory,
      expected_outcome: answers.outcome,
      visitor_name: answers.visitorName || null,
      visitor_company: answers.visitorCompany || null,
      visitor_whatsapp: answers.visitorWhatsapp || null,
    });

    return NextResponse.json({ id, stored: true });
  } catch (error) {
    console.error("Falha ao gravar submissão:", error);
    return NextResponse.json({ stored: false });
  }
}
