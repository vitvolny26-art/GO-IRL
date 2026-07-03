import { describe, expect, it } from "vitest";
import { getTranslation, languageOptions, localeByLanguage } from "./i18n";

describe("i18n", () => {
  it("defines Russian and Czech language options", () => {
    expect(languageOptions.map((option) => option.id)).toEqual(["ru", "cs"]);
  });

  it("returns localized copy for every supported language", () => {
    for (const option of languageOptions) {
      const translation = getTranslation(option.id);
      expect(translation.create).toBeTruthy();
      expect(translation.join).toBeTruthy();
      expect(localeByLanguage[option.id]).toBeTruthy();
    }
  });

  it("keeps header labels localized", () => {
    expect(getTranslation("ru").selectCity).toContain("город");
    expect(getTranslation("cs").selectLanguage).toContain("jazyk");
  });
});
