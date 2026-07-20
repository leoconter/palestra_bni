import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "elev_admin";

// O cookie guarda um hash da senha, nunca a senha em si.
export function tokenFor(password: string) {
  return createHash("sha256").update(`elev:${password}`).digest("hex");
}

export async function isAuthenticated() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(cookie) && cookie === tokenFor(password);
}
