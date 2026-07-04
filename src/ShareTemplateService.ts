import { cities, getCity } from "./config/cities";
import { localeByLanguage } from "./i18n";
import type { Activity, Language } from "./types";

type ActivityShareKind =
  | "volleyball"
  | "inline-skating"
  | "coffee"
  | "hiking"
  | "cycling"
  | "board-games"
  | "tennis"
  | "running"
  | "generic";

type ShareTemplateData = {
  kind: ActivityShareKind;
  activity: string;
  weekday: string;
  location: string;
  timeRange: string;
  priceLine: string;
  lowSpotsLine: string;
  joinText: string;
  url?: string;
  includeUrl?: boolean;
};

type ShareBuildOptions = {
  templateIndex?: number;
  url?: string;
  includePlainTextUrl?: boolean;
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
  return end ? `${activity.time}–${end}` : activity.time;
};

const activityName = (activity: Activity, language: Language) =>
  activity.activity[language].replace(/^[^\p{L}\p{N}]+/u, "").trim() || activity.title[language];

const normalizeText = (value: string) => value.toLocaleLowerCase().trim();

const normalizePlace = (value: string) => value.trim().replace(/\s+/g, " ").replace(/^[,\s]+|[,\s]+$/g, "");

const knownCityNames = (language: Language) =>
  cities.flatMap((city) => Object.values(city.name).concat(city.name[language])).filter(Boolean);

const includesCityName = (value: string, cityName: string) => normalizeText(value).includes(normalizeText(cityName));

const stripCityFromPlace = (place: string, cityName: string) =>
  normalizePlace(
    place
      .replace(new RegExp(`(^|[,\\s])${cityName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([,\\s]|$)`, "gi"), " ")
      .replace(/\s*,\s*,+/g, ","),
  );

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
  if (normalizeText(cleanedPlace) === normalizeText(city)) return city;
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

const activityKindTerms: Record<Exclude<ActivityShareKind, "generic">, string[]> = {
  volleyball: ["волейбол", "volejbal", "volleyball", "🏐"],
  "inline-skating": ["ролик", "inline", "brusl", "skating", "🛼"],
  coffee: ["кофе", "кава", "káva", "coffee", "☕"],
  hiking: ["поход", "похід", "výlet", "hike", "hiking", "🥾"],
  cycling: ["велосипед", "велосипед", "kolo", "cycling", "bike", "🚴"],
  "board-games": ["настол", "настіль", "deskov", "board", "🎲"],
  tennis: ["теннис", "теніс", "tenis", "tennis", "🎾"],
  running: ["бег", "біг", "běh", "running", "run", "🏃"],
};

const detectActivityKind = (activity: Activity, language: Language): ActivityShareKind => {
  const sportType = activity.metadata?.sport?.sportType || "";
  const text = normalizeText(
    [
      activity.activity[language],
      activity.title[language],
      activity.description[language],
      activity.activity.ru,
      activity.activity.uk,
      activity.activity.cs,
      activity.activity.en,
      sportType,
    ].join(" "),
  );

  for (const [kind, terms] of Object.entries(activityKindTerms) as [Exclude<ActivityShareKind, "generic">, string[]][]) {
    if (terms.some((term) => text.includes(normalizeText(term)))) return kind;
  }

  return "generic";
};

const lowerFirst = (value: string) => value.charAt(0).toLocaleLowerCase() + value.slice(1);

const activitySentence: Record<Language, Record<ActivityShareKind, (data: ShareTemplateData) => string>> = {
  ru: {
    volleyball: ({ weekday }) => `В ${weekday} собираемся поиграть в волейбол.`,
    "inline-skating": ({ weekday }) => `В ${weekday} едем кататься на роликах.`,
    coffee: ({ weekday }) => `В ${weekday} собираемся выпить кофе.`,
    hiking: ({ weekday }) => `В ${weekday} идём в небольшой поход.`,
    cycling: ({ weekday }) => `В ${weekday} едем кататься на велосипедах.`,
    "board-games": ({ weekday }) => `В ${weekday} собираемся поиграть в настольные игры.`,
    tennis: ({ weekday }) => `В ${weekday} играем в теннис.`,
    running: ({ weekday }) => `В ${weekday} идём на совместную пробежку.`,
    generic: ({ weekday, activity }) => `В ${weekday} собираемся поиграть в ${lowerFirst(activity)}.`,
  },
  uk: {
    volleyball: ({ weekday }) => `У ${weekday} збираємося пограти у волейбол.`,
    "inline-skating": ({ weekday }) => `У ${weekday} їдемо кататися на роликах.`,
    coffee: ({ weekday }) => `У ${weekday} збираємося випити кави.`,
    hiking: ({ weekday }) => `У ${weekday} йдемо в невеликий похід.`,
    cycling: ({ weekday }) => `У ${weekday} їдемо кататися на велосипедах.`,
    "board-games": ({ weekday }) => `У ${weekday} збираємося пограти в настільні ігри.`,
    tennis: ({ weekday }) => `У ${weekday} граємо в теніс.`,
    running: ({ weekday }) => `У ${weekday} йдемо на спільну пробіжку.`,
    generic: ({ weekday, activity }) => `У ${weekday} збираємося на ${lowerFirst(activity)}.`,
  },
  cs: {
    volleyball: ({ weekday }) => `V ${weekday} si jdeme zahrát volejbal.`,
    "inline-skating": ({ weekday }) => `V ${weekday} jdeme jezdit na inline bruslích.`,
    coffee: ({ weekday }) => `V ${weekday} jdeme na kávu.`,
    hiking: ({ weekday }) => `V ${weekday} jdeme na menší výlet.`,
    cycling: ({ weekday }) => `V ${weekday} jedeme se projet na kole.`,
    "board-games": ({ weekday }) => `V ${weekday} si jdeme zahrát deskové hry.`,
    tennis: ({ weekday }) => `V ${weekday} hrajeme tenis.`,
    running: ({ weekday }) => `V ${weekday} si jdeme společně zaběhat.`,
    generic: ({ weekday, activity }) => `V ${weekday} se scházíme na ${lowerFirst(activity)}.`,
  },
  en: {
    volleyball: ({ weekday }) => `On ${weekday}, we're getting together for volleyball.`,
    "inline-skating": ({ weekday }) => `On ${weekday}, we're going inline skating.`,
    coffee: ({ weekday }) => `On ${weekday}, we're getting coffee.`,
    hiking: ({ weekday }) => `On ${weekday}, we're going on a short hike.`,
    cycling: ({ weekday }) => `On ${weekday}, we're going cycling.`,
    "board-games": ({ weekday }) => `On ${weekday}, we're playing board games.`,
    tennis: ({ weekday }) => `On ${weekday}, we're playing tennis.`,
    running: ({ weekday }) => `On ${weekday}, we're going for a run together.`,
    generic: ({ weekday, activity }) => `On ${weekday}, we're getting together for ${lowerFirst(activity)}.`,
  },
};

const closingLines: Record<Language, string[]> = {
  ru: [
    "Присоединяйся! Будем рады познакомиться 😊",
    "Если хочешь, присоединяйся. Будем рады видеть тебя 😊",
    "Приходи, если получится. Будет приятно познакомиться 😊",
  ],
  uk: [
    "Приєднуйся! Будемо раді познайомитися 😊",
    "Якщо хочеш, приєднуйся. Будемо раді тебе бачити 😊",
    "Приходь, якщо вийде. Буде приємно познайомитися 😊",
  ],
  cs: [
    "Přidej se! Rádi tě poznáme 😊",
    "Jestli chceš, připoj se. Rádi tě uvidíme 😊",
    "Doraz, pokud ti to vyjde. Rádi tě poznáme 😊",
  ],
  en: [
    "Join us! We'd be happy to meet you 😊",
    "If you'd like, join us. We'd be happy to see you 😊",
    "Come by if you can. It would be nice to meet you 😊",
  ],
};

const buildShareTemplateData = (activity: Activity, language: Language, options: ShareBuildOptions = {}): ShareTemplateData => {
  const kind = detectActivityKind(activity, language);
  return {
    kind,
    activity: activityName(activity, language),
    weekday: weekdayLabel(activity, language),
    location: locationLabel(activity, language),
    timeRange: timeRangeLabel(activity),
    priceLine: priceLine(activity, language),
    lowSpotsLine: lowSpotsLine(activity, language),
    joinText: joinLabel[language],
    url: options.url,
    includeUrl: options.includePlainTextUrl,
  };
};

const greetingByLanguage: Record<Language, string> = {
  ru: "👋 Привет!",
  uk: "👋 Привіт!",
  cs: "👋 Ahoj!",
  en: "👋 Hey!",
};

const renderShareText = (data: ShareTemplateData, language: Language, closingLine: string) =>
  [
    greetingByLanguage[language],
    "",
    activitySentence[language][data.kind](data),
    "",
    data.location && `📍 ${data.location}`,
    `🕕 ${data.timeRange}`,
    data.priceLine,
    data.lowSpotsLine,
    "",
    closingLine,
    "",
    data.includeUrl && data.url ? `${data.joinText}:` : data.joinText,
    data.includeUrl && data.url,
    "",
    "GO IRL",
  ].filter(Boolean).join("\n");

export const ShareTemplateService = {
  build(activity: Activity, language: Language, options: ShareBuildOptions = {}) {
    const data = buildShareTemplateData(activity, language, options);
    const variants = closingLines[language];
    const index = options.templateIndex ?? Math.floor(Math.random() * variants.length);
    return renderShareText(data, language, variants[index % variants.length]);
  },
  buildPlainText(activity: Activity, language: Language, url: string, templateIndex?: number) {
    return this.build(activity, language, { templateIndex, url, includePlainTextUrl: true });
  },
};

export const buildActivityShareText = (activity: Activity, language: Language, templateIndex?: number) =>
  ShareTemplateService.build(activity, language, { templateIndex });
