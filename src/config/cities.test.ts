import { describe, expect, it } from "vitest";
import { cities, defaultCityId, getCity } from "./cities";

describe("cities configuration", () => {
  it("keeps the default city available", () => {
    expect(cities.some((city) => city.id === defaultCityId)).toBe(true);
  });

  it("returns the requested city when it exists", () => {
    expect(getCity("olomouc").id).toBe("olomouc");
  });

  it("falls back to the first configured city for unknown ids", () => {
    expect(getCity("unknown-city")).toEqual(cities[0]);
  });

  it("keeps every city localized for supported languages", () => {
    for (const city of cities) {
      expect(city.name.ru).toBeTruthy();
      expect(city.name.cs).toBeTruthy();
      expect(city.timezone).toBeTruthy();
    }
  });
});
