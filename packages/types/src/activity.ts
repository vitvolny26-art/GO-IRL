// @go-irl/types — Activity model
// This is the SINGLE shared entity for all modules (Sport, Party, Nature, ...)
// Module-specific fields live in `meta`, never as separate entities.

export type ActivityType =
  | "sport"
  | "activities"
  | "party"
  | "nature"
  | "creative"
  | "learning"

export type ActivityStatus =
  | "draft"
  | "open"
  | "full"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "archived"

export interface LocalizedText {
  ru: string
  cs: string
}

export interface Activity<TMeta = Record<string, unknown>> {
  id: string
  type: ActivityType
  status: ActivityStatus

  title: LocalizedText
  description: LocalizedText | null

  organizerId: string

  city: string // fixed to "Olomouc" in Phase 1
  address: string
  startsAt: string // ISO 8601
  endsAt: string | null

  maxParticipants: number
  currentParticipants: number

  cost: {
    amount: number
    currency: "CZK"
    isFree: boolean
  }

  // Module-specific extension point
  meta: TMeta

  createdAt: string
  updatedAt: string
}

// ── Sport module meta ──────────────────────────────────────────────────────
export interface SportMeta {
  sport: "volleyball" | "gym"
  levelIdx: 0 | 1 | 2 | 3 // Любой / Новичок / Средний / Сильный
  needsGear: boolean
  urgent: boolean
}

export type SportActivity = Activity<SportMeta>
