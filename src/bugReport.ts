import { getTelegramWebApp } from "./telegram";
import type { Activity, Language } from "./types";

const defaultSupportUrl = "https://t.me/go_irl_support";

const safeSupportUrl = () => {
  const raw = String(import.meta.env.VITE_GO_IRL_SUPPORT_URL || defaultSupportUrl).trim();
  return raw.startsWith("https://t.me/") ? raw : defaultSupportUrl;
};

export const bugReportUrl = (activity: Activity, language: Language) => {
  const baseUrl = safeSupportUrl();

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("start", `bug_${activity.id}_${language}`);
    return url.toString();
  } catch {
    return defaultSupportUrl;
  }
};

export const openBugReport = (activity: Activity, language: Language) => {
  const url = bugReportUrl(activity, language);
  const webApp = getTelegramWebApp();

  if (url.startsWith("https://t.me/") && webApp?.openTelegramLink) {
    webApp.openTelegramLink(url);
    return;
  }

  if (webApp?.openLink) {
    webApp.openLink(url, { try_instant_view: false });
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
};
