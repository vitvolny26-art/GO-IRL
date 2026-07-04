import { describe, expect, it } from "vitest";
import { activityOptions, categories } from "./data";
import { languageOptions } from "./i18n";

describe("activity taxonomy", () => {
  it("has unique category ids", () => {
    const ids = categories.map((category) => category.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has localized labels and activity options for every category", () => {
    for (const category of categories) {
      expect(category.icon).toBeTruthy();
      for (const language of languageOptions) {
        expect(category.name[language.id]).toBeTruthy();
      }
      expect(activityOptions[category.id]?.length).toBeGreaterThan(0);
      for (const option of activityOptions[category.id]) {
        for (const language of languageOptions) {
          expect(option.name[language.id]).toBeTruthy();
        }
      }
    }
  });

  it("includes inline skating as a real activity category", () => {
    const skating = categories.find((category) => category.id === "inline-skating");
    expect(skating).toMatchObject({
      icon: "🛼",
      name: { ru: "Ролики", uk: "Ролики", cs: "Inline bruslení", en: "Inline skating" },
    });
    expect(activityOptions["inline-skating"].some((option) => option.name.ru === "Ролики")).toBe(true);
    expect(activityOptions["inline-skating"].some((option) => option.name.en === "Inline skating")).toBe(true);
  });
});
