import { describe, expect, it } from "vitest";
import { getTranslation } from "./i18n";
import { MAX_EVENT_PRICE, validateEventPrice } from "./validation";

describe("event price validation", () => {
  const t = getTranslation("ru");

  it("rejects prices above the supported limit", () => {
    expect(validateEventPrice(MAX_EVENT_PRICE + 1, t)).toBe(t.priceTooHigh);
  });

  it("rejects negative prices", () => {
    expect(validateEventPrice(-1, t)).toBe(t.priceNegative);
  });

  it("allows free and maximum supported prices", () => {
    expect(validateEventPrice(0, t)).toBe("");
    expect(validateEventPrice(MAX_EVENT_PRICE, t)).toBe("");
  });
});
