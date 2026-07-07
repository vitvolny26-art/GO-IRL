import { getTelegramWebApp } from "./telegram";
import type { Activity, Language } from "./types";

const defaultSupportUrl = "https://t.me/go_irl_support";

export const bugReportUrl = (activity: Activity, language: Language) => {
  const baseUrl = String(import.meta.env.VITE_GO_IRL_SUPPORT_URL || defaultSupportUrl);
  const url = new URL(baseUrl);
  url.searchParams.set("start", `bug_${activity.id}_${language}`);
  return url.toString();
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
