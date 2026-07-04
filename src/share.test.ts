import { describe, expect, it } from "vitest";
import { ShareTemplateService, buildActivityShareText } from "./share";
import type { Activity } from "./types";

const activity: Activity = {
  id: "share-1",
  type: "sport",
  categoryId: "sport",
  activity: { ru: "🏐 Волейбол", uk: "🏐 Волейбол", cs: "🏐 Volejbal", en: "🏐 Volleyball" },
  title: { ru: "Пляжный волейбол", uk: "Пляжний волейбол", cs: "Beach volejbal", en: "Beach volleyball" },
  description: { ru: "Играем вечером", uk: "Граємо ввечері", cs: "Hrajeme večer", en: "Evening game" },
  date: "2026-07-08",
  time: "18:00",
  cityId: "olomouc",
  address: "Beach Arena",
  price: 120,
  capacity: 8,
  participants: 6,
  members: [],
  organizer: "Vit",
  organizerKey: "owner",
  visibility: "public",
  metadata: {
    sport: {
      durationMinutes: 90,
    },
  },
};

describe("buildActivityShareText", () => {
  it("creates a friendly localized invitation with event facts and CTA", () => {
    const text = buildActivityShareText(activity, "ru", 0);

    expect(text).toContain("👋 Привет!");
    expect(text).toContain("В среду собираемся поиграть в волейбол.");
    expect(text).toContain("📍 Оломоуц, Beach Arena");
    expect(text).toContain("🕕 18:00-19:30");
    expect(text).toContain("💰 120 Kč");
    expect(text).toContain("👥 Осталось мест: 2");
    expect(text).toContain("👉 Присоединиться");
    expect(text).not.toContain("https://t.me/GOirl_bot?startapp=share-1");
    expect(text).toContain("GO IRL");
    expect(text).toContain("Меньше скролла. Больше жизни.");
  });

  it("supports English templates through the same architecture", () => {
    const text = buildActivityShareText(activity, "en", 1);

    expect(text).toContain("On Wednesday, we're getting together for volleyball.");
    expect(text).toContain("📍 Olomouc, Beach Arena");
    expect(text).toContain("👉 Join");
    expect(text).toContain("Less scrolling. More life.");
  });

  it("uses activity-specific human phrasing instead of one generic template", () => {
    const variants: Array<[Activity["activity"], string]> = [
      [{ ru: "🛼 Ролики", uk: "🛼 Ролики", cs: "🛼 Inline bruslení", en: "🛼 Inline skating" }, "едем кататься на роликах"],
      [{ ru: "☕ Кофе", uk: "☕ Кава", cs: "☕ Káva", en: "☕ Coffee" }, "собираемся выпить кофе"],
      [{ ru: "🥾 Поход", uk: "🥾 Похід", cs: "🥾 Výlet", en: "🥾 Hiking" }, "идём в небольшой поход"],
      [{ ru: "🚴 Велосипед", uk: "🚴 Велосипед", cs: "🚴 Kolo", en: "🚴 Cycling" }, "едем кататься на велосипедах"],
      [{ ru: "🎲 Настолки", uk: "🎲 Настільні ігри", cs: "🎲 Deskové hry", en: "🎲 Board games" }, "собираемся поиграть в настольные игры"],
      [{ ru: "🎾 Теннис", uk: "🎾 Теніс", cs: "🎾 Tenis", en: "🎾 Tennis" }, "играем в теннис"],
      [{ ru: "🏃 Бег", uk: "🏃 Біг", cs: "🏃 Běh", en: "🏃 Running" }, "идём на совместную пробежку"],
    ];

    for (const [activityName, expected] of variants) {
      expect(
        buildActivityShareText(
          {
            ...activity,
            activity: activityName,
            title: activityName,
            description: { ru: "Описание", uk: "Опис", cs: "Popis", en: "Description" },
          },
          "ru",
          0,
        ),
      ).toContain(expected);
    }
  });

  it("does not combine two different cities in the location line", () => {
    const text = buildActivityShareText({ ...activity, cityId: "olomouc", address: "Прага" }, "ru", 0);

    expect(text).toContain("📍 Прага");
    expect(text).not.toContain("Оломоуц, Прага");
  });

  it("combines city and place only when they belong together", () => {
    const text = buildActivityShareText({ ...activity, cityId: "praha", address: "парк Летна" }, "ru", 0);

    expect(text).toContain("📍 Прага, парк Летна");
  });

  it("uses only the city when the place is empty or duplicates the city", () => {
    const emptyPlace = buildActivityShareText({ ...activity, cityId: "praha", address: "" }, "ru", 0);
    const cityAsPlace = buildActivityShareText({ ...activity, cityId: "praha", address: "Прага" }, "ru", 0);

    expect(emptyPlace).toContain("📍 Прага");
    expect(cityAsPlace).toContain("📍 Прага");
    expect(cityAsPlace).not.toContain("Прага, Прага");
  });

  it("keeps all template variants human and non-promotional", () => {
    const forbidden = [
      "Будет живо",
      "без бесконечного скролла",
      "Не пропусти",
      "Лучшее событие",
      "Самое крутое",
      "Уникальная возможность",
      "Зарядись эмоциями",
      "Незабываемый вечер",
      "endless scrolling",
      "Plan unlocked",
    ];
    const texts = (["ru", "uk", "cs", "en"] as const).flatMap((language) =>
      [0, 1, 2].map((index) => buildActivityShareText(activity, language, index)),
    );

    for (const text of texts) {
      for (const phrase of forbidden) {
        expect(text).not.toContain(phrase);
      }
    }
  });

  it("can append a fallback URL only after the GO IRL signature", () => {
    const url = "https://t.me/GOirl_bot?startapp=share-1";
    const text = ShareTemplateService.build(activity, "ru", { templateIndex: 0, url, includeUrl: true });
    const lines = text.split("\n");

    expect(lines.at(-3)).toBe("GO IRL");
    expect(lines.at(-2)).toBe("Меньше скролла. Больше жизни.");
    expect(lines.at(-1)).toBe(url);
  });
});
