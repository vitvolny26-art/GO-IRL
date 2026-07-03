import { describe, expect, it } from "vitest";
import { activityOptions, categories } from "./data";

describe("activity taxonomy", () => {
  it("has unique category ids", () => {
    const ids = categories.map((category) => category.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has localized labels and activity options for every category", () => {
    for (const category of categories) {
      expect(category.icon).toBeTruthy();
      expect(category.name.ru).toBeTruthy();
      expect(category.name.cs).toBeTruthy();
      expect(activityOptions[category.id]?.length).toBeGreaterThan(0);
    }
  });
});
