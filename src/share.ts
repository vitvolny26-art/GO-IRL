import { cities, getCity } from "./config/cities";
import { localeByLanguage } from "./i18n";
import type { Activity, Language } from "./types";

type ShareTemplate = (data: ShareTemplateData) => string;

type ShareTemplateData = {
  activity: string;
  weekday: string;
  location: string;
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

const normalizePlace = (value: string) => value.trim().replace(/\s+/g, " ").replace(/^[,\s]+|[,\s]+$/g, "");

const knownCityNames = (language: Language) =>
  cities.flatMap((city) => Object.values(city.name).concat(city.name[language])).filter(Boolean);

const includesCityName = (value: string, cityName: string) =>
  value.toLocaleLowerCase().includes(cityName.toLocaleLowerCase());

const stripCityFromPlace = (place: string, cityName: string) =>
  normalizePlace(place
    .replace(new RegExp(`(^|[,\\s])${cityName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([,\\s]|$)`, "gi"), " ")
    .replace(/\s*,\s*,+/g, ","));

const locationLabel = (activity: Activity, language: Language) => {
  const city = getCity(activity.cityId).name[language];
  const place = normalizePlace(activity.address || "");
  if (!city && !place) return "";
  if (!place) return city;
  if (!city) return place;

  const otherCity = knownCityNames(language).find((name) => name !== city && includesCityName(place, name));
  if (otherCity) return place;

  const cleanedPlace = includesCityName(place, city) ? stripCityFromPlace(place, city) : place;
  if (!cleanedPlace) return city;
  if (cleanedPlace.toLocaleLowerCase() === city.toLocaleLowerCase()) return city;
  return `${city}, ${cleanedPlace}`;
};

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
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Привет!",
        "",
        `В ${weekday} играем в ${activity}.`,
        "",
        location && `📍 ${location}`,
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
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Привет!",
        "",
        `Собираемся в ${weekday} на ${activity}.`,
        location && `📍 ${location}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Приходи, если удобно!",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Привет!",
        "",
        `В ${weekday} собираемся на ${activity}.`,
        location && `📍 ${location}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Будем рады видеть тебя.",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
  ],
  uk: [
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Привіт!",
        "",
        `У ${weekday} граємо в ${activity}.`,
        "",
        location && `📍 ${location}`,
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
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Привіт!",
        "",
        `Збираємося у ${weekday} на ${activity}.`,
        location && `📍 ${location}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Приходь, якщо зручно!",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Привіт!",
        "",
        `У ${weekday} збираємося на ${activity}.`,
        location && `📍 ${location}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Будемо раді тебе бачити.",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
  ],
  cs: [
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Ahoj!",
        "",
        `V ${weekday} jdeme na ${activity}.`,
        "",
        location && `📍 ${location}`,
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
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Ahoj!",
        "",
        `Scházíme se v ${weekday} na ${activity}.`,
        location && `📍 ${location}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Přijď, jestli se ti to hodí!",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Ahoj!",
        "",
        `V ${weekday} se scházíme na ${activity}.`,
        location && `📍 ${location}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Rádi tě uvidíme.",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
  ],
  en: [
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Hey!",
        "",
        `On ${weekday}, we are doing ${activity}.`,
        "",
        location && `📍 ${location}`,
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
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Hey!",
        "",
        `We are meeting on ${weekday} for ${activity}.`,
        location && `📍 ${location}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Come by if it works for you!",
        "",
        joinText,
        "",
        "GO IRL",
        tagline,
      ].filter(Boolean).join("\n"),
    ({ activity, weekday, location, timeRange, priceLine, lowSpotsLine, joinText, tagline }) =>
      [
        "👋 Hey!",
        "",
        `On ${weekday}, we are meeting for ${activity}.`,
        location && `📍 ${location}`,
        `🕕 ${timeRange}`,
        priceLine,
        lowSpotsLine,
        "",
        "Would be nice to see you there.",
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
    location: locationLabel(activity, language),
    timeRange: timeRangeLabel(activity),
    priceLine: priceLine(activity, language),
    lowSpotsLine: lowSpotsLine(activity, language),
    joinText: joinLabel[language],
    tagline: shareTagline[language],
  };

  const index = templateIndex ?? Math.floor(Math.random() * templates[language].length);
  return templates[language][index % templates[language].length](data);
};
