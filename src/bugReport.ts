import { getTelegramWebApp } from "./telegram";
import type { Activity, Language } from "./types";

const botUrl = "https://t.me/GOirl_bot";

export const bugReportUrl = (activity: Activity, language: Language) => {
  const text = [
    "GO IRL BUG REPORT",
    `activity: ${activity.id}`,
    `language: ${language}`,
    `title: ${activity.title?.[language] || activity.activity?.[language] || ""}`,
  ].join("\n");

  const url = new URL("https://t.me/share/url");
  url.searchParams.set("url", botUrl);
  url.searchParams.set("text", text);
  return url.toString();
};

export const openBugReport = (activity: Activity, language: Language) => {
  const url = bugReportUrl(activity, language);
  const webApp = getTelegramWebApp();

  if (webApp?.openTelegramLink) {
    webApp.openTelegramLink(url);
    return;
  }

  if (webApp?.openLink) {
    webApp.openLink(url, { try_instant_view: false });
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
};
