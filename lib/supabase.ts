import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Leitura pública (bni_members, bni_segments) — usada em Server Components.
export function supabasePublic() {
  return createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });
}

// Escrita em bni_submissions — usada apenas em route handlers (service key
// nunca chega ao browser).
export function supabaseService() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
