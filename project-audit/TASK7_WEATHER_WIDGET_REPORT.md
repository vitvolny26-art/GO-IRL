# Task 7 Weather Widget Report

Generated: 2026-07-08

Status: **implemented / runtime verification needed**.

## Goal

Weather widget requirements:

- Open-Meteo API without keys;
- if event is further than 7 days: show `Прогноз будет за 7 дней` / localized equivalent;
- if event is within 7 days: hourly forecast for event start;
- show icon, temperature, condition;
- bottom sheet/details:
  - temperature graph;
  - wind;
  - rain probability.

## Current implementation findings

| Requirement | Status | Evidence |
|---|---|---|
| Open-Meteo without keys | Implemented | `src/services/weather.ts` fetches `https://api.open-meteo.com/v1/forecast`. |
| Geocoding | Implemented | Uses Nominatim for address/city coordinates. |
| 7-day guard | Implemented | `getEventWeather()` returns null outside 0..7 days; Sport sheet shows `t.weatherAvailableSoon` for events further than 7 days. |
| Hourly event forecast | Implemented | Weather service targets `date + time` and falls back to nearest forecast hour. |
| Icon + temperature + rain + wind text | Implemented | `text` includes weather icon, °C, rain %, wind km/h. |
| Weather details card | Implemented | Sport sheet renders bars with temperature, rain max, wind max. |

## Current code path

- UI: `src/verticals/SportVertical.tsx`
- Service: `src/services/weather.ts`

## Current behavior

For sport event details:

1. If event date is more than 7 days away, UI shows the localized `weatherAvailableSoon` text.
2. If event is within 7 days, weather is loaded by event `date`, `time`, `address`, and city.
3. Weather details expand into a card with temperature bars, rain probability, and wind.

## Scope intentionally not changed

No weather code was changed in this step because the current implementation already matches the MVP requirement.

No API keys or secrets were added.

## Manual verification

1. Open a sport event within 7 days.
2. Confirm weather text appears after loading.
3. Expand weather details.
4. Confirm temperature bars are visible.
5. Confirm rain and wind values are visible.
6. Open/create a sport event more than 7 days ahead.
7. Confirm forecast-available-later message appears.

## Risks

- Nominatim geocoding can fail or rate-limit.
- Weather result depends on address quality.
- Non-sport generic event sheet does not currently show Weather; current implementation is sport-sheet focused.
