import type { Translation } from "./i18n";

export const MAX_EVENT_PRICE = 100_000;

export const validateEventPrice = (price: number, t: Translation) => {
  if (!Number.isFinite(price)) return t.priceInvalid;
  if (price < 0) return t.priceNegative;
  if (price > MAX_EVENT_PRICE) return t.priceTooHigh;
  return "";
};
