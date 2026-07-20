import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Sem as variáveis, o erro precisa dizer o que fazer — e não virar um 500 mudo.
function required(name: string, value?: string) {
  if (!value) {
    throw new Error(
      `${name} não está configurada. Defina as variáveis de ambiente no projeto (local em .env.local, produção nas configurações da Vercel).`,
    );
  }
  return value;
}

// Leitura pública (bni_members, bni_segments) — usada em Server Components.
export function supabasePublic() {
  return createClient(
    required("NEXT_PUBLIC_SUPABASE_URL", url),
    required("NEXT_PUBLIC_SUPABASE_ANON_KEY", anonKey),
    { auth: { persistSession: false } },
  );
}

// Escrita em bni_submissions — usada apenas em route handlers (service key
// nunca chega ao browser).
export function supabaseService() {
  return createClient(
    required("NEXT_PUBLIC_SUPABASE_URL", url),
    required("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY),
    { auth: { persistSession: false } },
  );
}
