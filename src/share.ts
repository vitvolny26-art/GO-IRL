import { getCity } from "./config/cities";
import { localeByLanguage } from "./i18n";
import type { Activity, Language } from "./types";

type ShareTemplate = (data: ShareTemplateData) => string;

type ShareTemplateData = {
  activity: string;
  weekday: string;
  city: string;
  place: string;
  timeRange: string;
  priceLine: string;
  lowSpotsLine: string;
  joinText: string;
  tagline: string;
};

const addMinutes = (time: string, minutes: number) => {
  const [hours, mins] = time.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(mins)) return "";
  const date = new Date(2026, 0, 1, hours, mins);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toTimeString().slice(0, 5);
};

const activityDuration = (activity: Activity) => activity.metadata?.sport?.durationMinutes || 90;

const weekdayForms: Record<Language, string[]> = {
  ru: ["воскресенье", "понедельник", "вторник", "среду", "четверг", "пятницу", "субботу"],
  uk: ["неділю", "понеділок", "вівторок", "середу", "четвер", "п'ятницю", "суботу"],
  cs: ["neděli", "pondělí", "úterý", "středu", "čtvrtek", "pátek", "sobotu"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

const weekdayLabel = (activity: Activity, language: Language) => {
  const date = new Date(`${activity.date}T12:00:00`);
  return weekdayForms[language][date.getDay()] || new Intl.DateTimeFormat(localeByLanguage[language], { weekday: "long" }).format(date);
};

const timeRangeLabel = (activity: Activity) => {
  const end = addMinutes(activity.time, activityDuration(activity));
  return end ? `${activity.time}-${end}` : activity.time;
};

const activityName = (activity: Activity, language: Language) =>
  activity.activity[language].replace(/^[^\p{L}\p{N}]+/u, "").trim() || activity.title[language];

const priceLine = (activity: Activity, language: Language) => {
  if (activity.price <= 0) return "";
  const labels: Record<Language, string> = {
    ru: `💰 ${activity.price} Kč`,
    uk: `💰 ${activity.price} Kč`,
    cs: `💰 ${activity.price} Kč`,
    en: `💰 ${activity.price} Kč`,
  };
  return labels[language];
};

const lowSpotsLine = (activity: Activity, language: Language) => {
  const free = Math.max(activity.capacity - activity.participants, 0);
  if (free > 3) return "";
  const labels: Record<Language, string> = {
    ru: `👥 Осталось мест: ${free}`,
    uk: `👥 Залишилось місць: ${free}`,
    cs: `👥 Zbývá míst: ${free}`,
    en: `👥 Spots left: ${free}`,
  };
  return labels[language];
};

const joinLabel: Record<Language, string> = {
  ru: "👉 Присоединиться",
  uk: "👉 Приєднатися",
  cs: "👉 Připojit se",
  en: "👉 Join",
};

const shareTagline: Record<Language, string> = {
  ru: "Меньше скролла. Больше жизни.",
  uk: "Менше скролу. Більше життя.",
  cs: "Méně scrollování. Více života.",
  en: "Less scrolling. More life.",
};

const templates: Record<Language, ShareTemplate[]> = {
  ru: [
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Привет!",
        "",
        `В ${weekday} играем в ${activity}.`,
        "",
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Будем рады, если присоединишься!",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Привет!",
        "",
        `Собираемся в ${weekday} на ${activity}.`,
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Если хочешь выбраться в реальную жизнь, заходи:",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Есть план!",
        "",
        `${weekday}: ${activity}`,
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Будет живо, без бесконечного скролла.",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
  ],
  uk: [
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Привіт!",
        "",
        `У ${weekday} граємо в ${activity}.`,
        "",
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Будемо раді, якщо приєднаєшся!",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Привіт!",
        "",
        `Збираємося у ${weekday} на ${activity}.`,
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Якщо хочеш вибратися в реальне життя, заходь:",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Є план!",
        "",
        `${weekday}: ${activity}`,
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Буде живо, без нескінченного скролу.",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
  ],
  cs: [
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Ahoj!",
        "",
        `V ${weekday} jdeme na ${activity}.`,
        "",
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Budeme rádi, když se připojíš!",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Ahoj!",
        "",
        `Scházíme se v ${weekday} na ${activity}.`,
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Jestli chceš ven do reálného života, přidej se:",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Máme plán!",
        "",
        `${weekday}: ${activity}`,
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Bude to živé, žádné nekonečné scrollování.",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
  ],
  en: [
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Hey!",
        "",
        `On ${weekday}, we are doing ${activity}.`,
        "",
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Would be happy if you joined!",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Hey!",
        "",
        `We are meeting on ${weekday} for ${activity}.`,
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "If you want to get into real life, jump in:",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, city, place, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Plan unlocked!",
        "",
        `${weekday}: ${activity}`,
        `📍 ${city}, ${place}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Real life, less endless scrolling.",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
  ],
};

export const buildActivityShareText = (activity: Activity, language: Language, templateIndex?: number) => {
  const data: ShareTemplateData = {
    activity: activityName(activity, language),
    weekday: weekdayLabel(activity, language),
    city: getCity(activity.cityId).name[language],
    place: activity.address,
    timeRange: timeRangeLabel(activity),
    priceLine: priceLine(activity, language),
    lowSpotsLine: lowSpotsLine(activity, language),
    joinText: joinLabel[language],
    tagline: shareTagline[language],
  };

  const index = templateIndex ?? Math.floor(Math.random() * templates[language].length);
  return templates[language][index % templates[language].length](data);
};
