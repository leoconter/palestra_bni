"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="mt-10">
      <label htmlFor="password" className="text-base font-semibold">
        Senha
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mt-3 w-full rounded-xl border border-navy-border bg-navy-soft px-4 py-3.5 text-base focus:border-yellow/60 focus:outline-none"
      />
      {error && <p className="mt-3 text-sm text-yellow">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-yellow py-4 font-bold text-navy hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
