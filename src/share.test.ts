import { describe, expect, it } from "vitest";
import { buildActivityShareText } from "./share";
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
    expect(text).toContain("играем в Волейбол");
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

    expect(text).toContain("We are meeting on");
    expect(text).toContain("Volleyball");
    expect(text).toContain("📍 Olomouc, Beach Arena");
    expect(text).toContain("👉 Join");
    expect(text).toContain("Less scrolling. More life.");
  });
});
