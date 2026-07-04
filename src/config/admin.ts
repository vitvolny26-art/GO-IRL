import { getTelegramWebApp } from "../telegram";
import type { UserRole } from "../types";

const configuredAdminKeys = (import.meta.env.VITE_GO_IRL_ADMIN_KEYS || "")
  .split(",")
  .map((item: string) => item.trim())
  .filter(Boolean);

// Sprint 1 temporary allowlist. Production admin permissions must move to Supabase Auth/RLS.
export const sprintOneAdminAllowlist = new Set<string>(configuredAdminKeys);

export function getCurrentUserRole(userKey: string): UserRole {
  const telegramUser = getTelegramWebApp()?.initDataUnsafe?.user;
  const candidateKeys = [
    userKey,
    telegramUser?.id ? `telegram:${telegramUser.id}` : "",
    telegramUser?.username ? `telegram_username:${telegramUser.username.toLowerCase()}` : "",
  ].filter(Boolean);

  return candidateKeys.some((key) => sprintOneAdminAllowlist.has(key)) ? "admin" : "user";
}

export function isCurrentUserAdmin(userKey: string) {
  return getCurrentUserRole(userKey) === "admin";
}
