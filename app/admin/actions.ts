"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, tokenFor } from "@/lib/adminAuth";

export async function login(_: string | null, formData: FormData) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return "ADMIN_PASSWORD não está configurada no servidor.";

  const attempt = String(formData.get("password") ?? "");
  if (attempt !== password) return "Senha incorreta.";

  (await cookies()).set(ADMIN_COOKIE, tokenFor(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
    path: "/",
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin");
}
