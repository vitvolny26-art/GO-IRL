// @go-irl/shared — Platform-wide constants

export const PHASE_1_CITY = "Olomouc" as const

export const SUPPORTED_LOCALES = ["ru", "cs"] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "ru"
