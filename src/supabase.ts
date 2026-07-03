import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error("Supabase environment variables are missing");
}

function resolveUserKey() {
  const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
  if (telegramId) return `telegram:${telegramId}`;

  const storageKey = "go-irl-guest-id";
  const saved = localStorage.getItem(storageKey);
  if (saved) return saved;

  const generated = `guest:${crypto.randomUUID()}`;
  localStorage.setItem(storageKey, generated);
  return generated;
}

const userKey = resolveUserKey();
const invitedActivityId = window.Telegram?.WebApp?.initDataUnsafe?.start_param;

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
