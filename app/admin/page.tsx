import type { Metadata } from "next";
import Image from "next/image";
import { isAuthenticated } from "@/lib/adminAuth";
import { supabaseService } from "@/lib/supabase";
import type { Submission } from "@/lib/types";
import { logout } from "./actions";
import LoginForm from "./LoginForm";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Submissões | Elev × BNI",
  robots: { index: false, follow: false },
};

type Row = Submission & { bni_members: { company_name: string } | null };

async function getSubmissions(): Promise<{ rows: Row[]; error?: string }> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { rows: [], error: "SUPABASE_SERVICE_ROLE_KEY não configurada." };
  }
  const { data, error } = await supabaseService()
    .from("bni_submissions")
    .select("*, bni_members(company_name)")
    .order("created_at", { ascending: false });

  if (error) return { rows: [], error: error.message };
  return { rows: (data ?? []) as Row[] };
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 py-1.5">
      <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed">{value}</dd>
    </div>
  );
}

export default async function AdminRoute() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return (
      <main className="mx-auto w-full max-w-sm px-6 py-16">
        <Image
          src="/brand/logo-horizontal-claro.png"
          alt="Elev"
          width={350}
          height={180}
          priority
          className="h-7 w-auto"
        />
        <h1 className="mt-12 text-2xl font-extrabold tracking-tight">
          Submissões
        </h1>
        <p className="mt-2 text-sm text-muted">Área restrita da Elev.</p>
        <LoginForm />
      </main>
    );
  }

  const { rows, error } = await getSubmissions();
  const complete = rows.filter((r) => r.step_reached === 3).length;

  return (
    <main className="mx-auto w-full max-w-2xl px-6 pb-16 pt-6">
      <div className="flex items-center justify-between">
        <Image
          src="/brand/logo-horizontal-claro.png"
          alt="Elev"
          width={350}
          height={180}
          priority
          className="h-6 w-auto"
        />
        <form action={logout}>
          <button
            type="submit"
            className="min-h-11 text-[13px] text-muted underline underline-offset-4 hover:text-offwhite"
          >
            sair
          </button>
        </form>
      </div>

      <h1 className="mt-8 text-3xl font-extrabold leading-tight tracking-tight">
        Submissões
        <span className="text-yellow">*</span>
      </h1>
      <p className="mt-2 text-sm text-muted">
        {rows.length} no total · {complete} completas até a etapa 3
      </p>

      {error && (
        <p className="mt-8 rounded-xl border border-navy-border bg-navy-soft p-4 text-sm leading-relaxed text-yellow">
          {error}
        </p>
      )}

      {!error && rows.length === 0 && (
        <p className="mt-8 rounded-xl border border-navy-border bg-navy-soft p-6 text-sm leading-relaxed text-muted">
          Nenhuma submissão ainda. Elas aparecem aqui assim que alguém enviar o
          formulário.
        </p>
      )}

      <div className="mt-8 space-y-4">
        {rows.map((row) => {
          const who =
            row.bni_members?.company_name ??
            row.visitor_company ??
            "Convidado sem empresa";
          return (
            <article
              key={row.id}
              className="rounded-2xl border border-navy-border bg-navy-soft p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h2 className="text-lg font-bold leading-tight">{who}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-muted">
                  etapa {row.step_reached}/3 ·{" "}
                  {new Date(row.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {!row.bni_members && (
                <span className="mt-2 inline-block rounded-full border border-navy-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
                  convidado
                </span>
              )}

              <dl className="mt-4 divide-y divide-navy-border/60">
                <Field label="Dor" value={row.pain_choice} />
                <Field label="Hoje" value={row.pain_description} />
                <Field label="Frequência" value={row.frequency} />
                <Field label="Tempo" value={row.time_per_occurrence} />
                <Field label="Usa IA" value={row.ai_usage} />
                <Field label="Em quê" value={row.ai_usage_detail} />
                <Field label="Já tentou" value={row.automation_history} />
                <Field label="Mudaria" value={row.expected_outcome} />
                <Field label="Contato" value={row.visitor_name} />
                <Field label="WhatsApp" value={row.visitor_whatsapp} />
              </dl>
            </article>
          );
        })}
      </div>
    </main>
  );
}
