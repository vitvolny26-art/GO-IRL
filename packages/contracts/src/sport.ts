// @go-irl/contracts — Sport module API contracts
import type { SportActivity, SportMeta } from "@go-irl/types"

export interface CreateSportActivityRequest {
  sport: SportMeta["sport"]
  date: string // YYYY-MM-DD
  time: string // HH:mm
  address: string
  maxParticipants: number
  cost: { amount: number; isFree: boolean }
  levelIdx: SportMeta["levelIdx"]
  description?: string
  needsGear: boolean
  urgent: boolean
}

export interface CreateSportActivityResponse {
  activity: SportActivity
}

export interface ListSportActivitiesQuery {
  city?: string // defaults to "Olomouc"
  sport?: SportMeta["sport"]
  dateFilter?: "today" | "tomorrow" | "weekend" | "all"
  search?: string
}

export interface ListSportActivitiesResponse {
  activities: SportActivity[]
  total: number
}

export interface JoinActivityRequest {
  activityId: string
}

export interface JoinActivityResponse {
  success: boolean
  status: "confirmed" | "waitlisted"
}
