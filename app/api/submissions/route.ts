import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import type { DiagnosticAnswers } from "@/lib/types";

// Grava ao fim da etapa 1 e atualiza nas seguintes. Nunca devolve erro ao
// visitante: numa reunião, um problema de banco não pode virar tela vermelha
// na mão de quem acabou de nos dar o contato.

type Payload = {
  id?: string | null;
  memberSlug?: string | null;
  step: 1 | 2 | 3;
  answers: DiagnosticAnswers;
};

function toRow(answers: DiagnosticAnswers, step: number) {
  return {
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
  };
}

export async function POST(request: Request) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("SUPABASE_SERVICE_ROLE_KEY ausente: submissão não gravada.");
    return NextResponse.json({ stored: false });
  }

  try {
    const { id, memberSlug, step, answers } = (await request.json()) as Payload;
    const db = supabaseService();
    const row = toRow(answers, step);

    if (id) {
      await db.from("bni_submissions").update(row).eq("id", id);
      return NextResponse.json({ id, stored: true });
    }

    let memberId: string | null = null;
    if (memberSlug) {
      const { data } = await db
        .from("bni_members")
        .select("id")
        .eq("slug", memberSlug)
        .maybeSingle();
      memberId = data?.id ?? null;
    }

    const { data } = await db
      .from("bni_submissions")
      .insert({ ...row, member_id: memberId })
      .select("id")
      .single();

    return NextResponse.json({ id: data?.id ?? null, stored: true });
  } catch (error) {
    console.error("Falha ao gravar submissão:", error);
    return NextResponse.json({ stored: false });
  }
}
