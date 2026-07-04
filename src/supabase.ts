import { createClient } from "@supabase/supabase-js";
import { resolveDemoIdentity, type DemoIdentityResolution, type DemoIdentitySource } from "./securityIdentity";
import { getTelegramWebApp } from "./telegram";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error("Supabase environment variables are missing");
}

export type UserKeyResolutionSource = DemoIdentitySource;

export type UserKeyResolution = DemoIdentityResolution;

export function resolveUserIdentity(): UserKeyResolution {
  return resolveDemoIdentity({
    telegramId: getTelegramWebApp()?.initDataUnsafe?.user?.id,
    storage: localStorage,
    randomUUID: () => crypto.randomUUID(),
  });
}

const resolvedIdentity = resolveUserIdentity();
const userKey = resolvedIdentity.userKey;
const invitedActivityId = getTelegramWebApp()?.initDataUnsafe?.start_param;

export const supabase = createClient(url, publishableKey, {
  auth: { persistSession: false },
  global: {
    headers: {
      "x-go-irl-user-key": userKey,
      ...(invitedActivityId ? { "x-go-irl-invite-activity": invitedActivityId } : {}),
    },
  },
});

export function getUserKey() {
  return userKey;
}

export function getUserKeyResolution() {
  return resolvedIdentity;
}
