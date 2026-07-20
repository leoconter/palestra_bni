import { cache } from "react";
import { supabasePublic } from "./supabase";
import type { Member, Segment } from "./types";

// cache() deduplica a chamada entre generateMetadata e a página.
export const getMemberBySlug = cache(async (slug: string) => {
  const { data } = await supabasePublic()
    .from("bni_members")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data as Member | null;
});

export const getAllMembers = cache(async () => {
  const { data } = await supabasePublic()
    .from("bni_members")
    .select("id, slug, person_name, company_name")
    .order("company_name");
  return (data ?? []) as Pick<
    Member,
    "id" | "slug" | "person_name" | "company_name"
  >[];
});

export const getSegments = cache(async () => {
  const { data } = await supabasePublic()
    .from("bni_segments")
    .select("*")
    .order("sort_order");
  return (data ?? []) as Segment[];
});
