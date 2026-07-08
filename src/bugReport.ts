import { getTelegramWebApp } from "./telegram";


const botUsername = "GOirl_bot";
const webBugReportUrl = `https://t.me/${botUsername}?start=bug_report`;
const telegramBugReportUrl = `tg://resolve?domain=${botUsername}&start=bug_report`;

export const bugReportUrl = () => webBugReportUrl;

export const openBugReport = () => {
  const webApp = getTelegramWebApp();

  if (webApp?.openTelegramLink) {
    webApp.openTelegramLink(telegramBugReportUrl);
    return;
  }

  if (webApp?.openLink) {
    webApp.openLink(webBugReportUrl, { try_instant_view: false });
    return;
  }

  window.open(webBugReportUrl, "_blank", "noopener,noreferrer");
};
