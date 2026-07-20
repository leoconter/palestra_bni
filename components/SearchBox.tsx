"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Result = { slug: string; person_name: string; company_name: string };

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/membros?q=${encodeURIComponent(term)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const showEmpty = query.trim().length >= 2 && !searching && !results.length;

  return (
    <div>
      <label htmlFor="busca" className="text-base font-semibold">
        Buscar minha página
      </label>
      <input
        id="busca"
        type="search"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Seu nome ou o da sua empresa"
        className="mt-3 w-full rounded-xl border border-navy-border bg-navy-soft px-4 py-3.5 text-base placeholder:text-muted/70 focus:border-yellow/60 focus:outline-none"
      />

      {results.length > 0 && (
        <ul className="mt-4 divide-y divide-navy-border rounded-xl border border-navy-border bg-navy-soft">
          {results.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/m/${r.slug}`}
                className="flex min-h-14 items-center justify-between gap-3 px-4 py-3 hover:text-yellow"
              >
                <span className="min-w-0">
                  <span className="block truncate font-semibold">
                    {r.company_name}
                  </span>
                  <span className="block truncate text-[13px] text-muted">
                    {r.person_name}
                  </span>
                </span>
                <span aria-hidden="true" className="shrink-0 text-yellow">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {showEmpty && (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Não achamos ninguém com esse nome. Tenta o nome da empresa — ou entra
          como convidado aqui embaixo.
        </p>
      )}
    </div>
  );
}
