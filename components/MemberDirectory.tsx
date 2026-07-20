"use client";

import { useMemo, useState } from "react";

type Row = {
  id: string;
  slug: string;
  person_name: string;
  company_name: string;
};

// Páginas de exemplo da fundação — ficam marcadas para não virarem QR code.
const SAMPLE_SLUGS = ["prisma-arquitetura", "solaris-contabilidade"];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function MemberDirectory({ members }: { members: Row[] }) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return members;
    return members.filter((m) =>
      normalize(`${m.company_name} ${m.person_name} ${m.slug}`).includes(q),
    );
  }, [members, query]);

  const copy = async (slug: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}/m/${slug}`);
    setCopied(slug);
    setTimeout(() => setCopied((c) => (c === slug ? null : c)), 1600);
  };

  return (
    <>
      <div className="sticky top-0 z-10 -mx-6 border-b border-navy-border bg-navy/95 px-6 pb-4 pt-2 backdrop-blur">
        <label htmlFor="busca" className="sr-only">
          Buscar membro ou empresa
        </label>
        <input
          id="busca"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome, empresa ou slug"
          className="w-full rounded-xl border border-navy-border bg-navy-soft px-4 py-3 text-base placeholder:text-muted/70 focus:border-yellow/60 focus:outline-none"
        />
        <p className="mt-2 text-[13px] text-muted">
          {filtered.length}{" "}
          {filtered.length === 1 ? "página" : "páginas"}
          {query && ` de ${members.length}`}
        </p>
      </div>

      <ul className="mt-2 divide-y divide-navy-border">
        {filtered.map((m) => {
          const isSample = SAMPLE_SLUGS.includes(m.slug);
          return (
            <li
              key={m.id}
              className="flex items-center gap-3 py-3.5"
            >
              <div className="min-w-0 flex-1">
                <a
                  href={`/m/${m.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline gap-2 font-semibold hover:text-yellow"
                >
                  <span className="truncate">{m.company_name}</span>
                  {isSample && (
                    <span className="shrink-0 rounded-full border border-navy-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
                      exemplo
                    </span>
                  )}
                </a>
                <p className="text-[13px] leading-snug text-muted">
                  {m.person_name} · /m/{m.slug}
                </p>
              </div>

              <button
                type="button"
                onClick={() => copy(m.slug)}
                className="h-11 shrink-0 rounded-full border border-navy-border px-3.5 text-[13px] text-muted hover:border-yellow/50 hover:text-offwhite"
              >
                {copied === m.slug ? "copiado" : "copiar"}
              </button>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted">
          Nenhuma página encontrada para “{query}”.
        </p>
      )}
    </>
  );
}
