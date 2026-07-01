// @go-irl/types — User, RLI, Trust Score, Community Score

export interface User {
  id: string
  telegramId: string
  username: string | null
  firstName: string
  lastName: string | null
  photoUrl: string | null

  city: string // fixed to "Olomouc" in Phase 1

  rli: number // Real Life Index — visible to user
  trustScore: number // hidden, used for moderation/matching
  communityScore: number // visible, community contribution

  createdAt: string
  updatedAt: string
}

export interface UserStats {
  gamesPlayed: number
  attendanceRate: number // 0-100
  cancellations: number
  rating: number // 0-5
}

export interface Participant {
  id: string
  activityId: string
  userId: string
  role: "organizer" | "participant"
  status: "invited" | "confirmed" | "declined" | "waitlisted" | "attended" | "no_show"
  joinedAt: string
}

export interface Invitation {
  id: string
  activityId: string
  userId: string
  status: "pending" | "accepted" | "declined" | "later"
  sentAt: string
  respondedAt: string | null
}
