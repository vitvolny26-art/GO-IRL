import { initializeTrustedAuth, getCurrentAuthSession, isTrustedAuthReady } from "./authSession";
import { supabase } from "./supabase";
import { getTelegramInitData } from "./telegram";
import type {
  Activity,
  CoachProfile,
  CoachRequest,
  CoachRequestStatus,
  CoachRequestType,
  SportCoachRole,
} from "./types";

type AuthLike = {
  user?: {
    userKey?: string;
  };
  userKey?: string;
};

export type CoachAssignment = {
  request: CoachRequest;
  coach: CoachProfile | null;
};

export const sportCoachRoleOptions: Array<{ id: SportCoachRole; label: string; description: string }> = [
  {
    id: "sport_coach",
    label: "Sport Coach",
    description: "Проведёт разминку, объяснит правила и поможет группе начать без хаоса.",
  },
  {
    id: "beginner_helper",
    label: "Beginner Helper",
    description: "Поможет новичкам не бояться уровня и спокойно включиться в игру.",
  },
  {
    id: "team_captain",
    label: "Team Captain",
    description: "Соберёт команды, удержит темп и поможет быстро стартовать.",
  },
];

const sportCoachRoleIds = new Set<SportCoachRole>(sportCoachRoleOptions.map((option) => option.id));

const readAuthUserKey = (identity: unknown) => {
  const auth = identity as AuthLike | null;
  return auth?.user?.userKey || auth?.userKey || null;
};

const demoUserKey = "telegram:999999";
const demoCoachStorageKey = "go-irl-demo-coach-requests-v1";
const demoCoachNow = "2026-07-08T00:00:00.000Z";

const demoCoachProfile: CoachProfile = {
  id: "demo-coach-alex-olomouc",
  userKey: "telegram:777001",
  displayName: "Alex",
  city: "Olomouc",
  bio: "Sport Coach для закрытой beta. Помогает новичкам, объясняет правила и проводит разминку.",
  sports: ["volleyball", "running", "fitness"],
  languages: ["ru", "en", "cs"],
  priceCurrency: "CZK",
  isVerified: false,
  isActive: true,
  ratingAvg: 4.8,
  ratingCount: 12,
  ratingWeighted: 4.7,
  createdAt: demoCoachNow,
  updatedAt: demoCoachNow,
};

const hasTelegramInitData = () => Boolean(getTelegramInitData());
const isBrowserDemoMode = () =>
  typeof window !== "undefined" &&
  !isTrustedAuthReady() &&
  !hasTelegramInitData();

export const isCoachDemoMode = () => isBrowserDemoMode();

const readDemoCoachRequests = () => {
  try {
    return JSON.parse(localStorage.getItem(demoCoachStorageKey) || "[]") as CoachRequest[];
  } catch {
    return [] as CoachRequest[];
  }
};

const writeDemoCoachRequests = (requests: CoachRequest[]) => {
  localStorage.setItem(demoCoachStorageKey, JSON.stringify(requests));
};

const normalizeSportCoachRole = (value: unknown): SportCoachRole => {
  if (typeof value === "string" && sportCoachRoleIds.has(value as SportCoachRole)) {
    return value as SportCoachRole;
  }

  return "sport_coach";
};

export const getSportCoachRoleLabel = (role?: SportCoachRole) =>
  sportCoachRoleOptions.find((option) => option.id === role)?.label || "Sport Coach";

export const getCoachStatusLabel = (status?: CoachRequestStatus) => {
  switch (status) {
    case "pending": return "⏳ Тренер запрошен";
    case "matched": return "✨ Тренер найден";
    case "confirmed": return "✅ Тренер подтверждён";
    case "completed": return "Завершено";
    case "rejected": return "Отклонено";
    case "cancelled": return "Отменено";
    default: return "В обработке";
  }
};

export const isConfirmedCoachStatus = (status?: CoachRequestStatus) => status === "confirmed";

const mapCoachRequest = (row: Record<string, unknown>): CoachRequest => {
  const role = normalizeSportCoachRole(row.sport_type);
  const goal = typeof row.goal === "string" ? row.goal : undefined;

  return {
    id: String(row.id),
    activityId: String(row.activity_id),
    requesterUserKey: String(row.requester_user_key),
    coachProfileId: typeof row.coach_profile_id === "string" ? row.coach_profile_id : undefined,
    requestType: row.request_type as CoachRequestType,
    sportType: typeof row.sport_type === "string" ? row.sport_type : undefined,
    coachRole: role,
    goal,
    message: goal,
    level: typeof row.level === "string" ? row.level : undefined,
    budgetMin: typeof row.budget_min === "number" ? row.budget_min : undefined,
    budgetMax: typeof row.budget_max === "number" ? row.budget_max : undefined,
    paymentMode: row.payment_mode === "organizer" || row.payment_mode === "free" || row.payment_mode === "unknown" ? row.payment_mode : "split",
    status: row.status as CoachRequestStatus,
    adminNote: typeof row.admin_note === "string" ? row.admin_note : undefined,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
};

const mapCoachProfile = (row: Record<string, unknown>): CoachProfile => ({
  id: String(row.id),
  userKey: String(row.user_key),
  displayName: String(row.display_name || "Sport Coach"),
  avatarUrl: typeof row.avatar_url === "string" ? row.avatar_url : undefined,
  city: typeof row.city === "string" ? row.city : undefined,
  bio: typeof row.bio === "string" ? row.bio : undefined,
  sports: Array.isArray(row.sports) ? row.sports.map(String) : [],
  languages: Array.isArray(row.languages) ? row.languages.map(String) : [],
  priceFrom: typeof row.price_from === "number" ? row.price_from : undefined,
  priceCurrency: typeof row.price_currency === "string" ? row.price_currency : "CZK",
  isVerified: row.is_verified === true,
  isActive: row.is_active !== false,
  ratingAvg: typeof row.rating_avg === "number" ? row.rating_avg : Number(row.rating_avg || 0),
  ratingCount: typeof row.rating_count === "number" ? row.rating_count : Number(row.rating_count || 0),
  ratingWeighted: typeof row.rating_weighted === "number" ? row.rating_weighted : Number(row.rating_weighted || 0),
  createdAt: String(row.created_at || ""),
  updatedAt: String(row.updated_at || ""),
});

export async function getCurrentCoachUserKey() {
  if (isBrowserDemoMode()) return demoUserKey;

  const existing = getCurrentAuthSession();
  const existingKey = readAuthUserKey(existing);
  if (existingKey) return existingKey;

  const identity = await initializeTrustedAuth();
  return readAuthUserKey(identity);
}

export async function loadCoachRequestsForActivity(activityId: string) {
  if (isBrowserDemoMode()) {
    return readDemoCoachRequests().filter((request) => request.activityId === activityId);
  }

  const { data, error } = await supabase
    .from("coach_requests")
    .select("*")
    .eq("activity_id", activityId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((row) => mapCoachRequest(row as Record<string, unknown>));
}

export async function loadConfirmedCoachForActivity(activityId: string): Promise<CoachAssignment | null> {
  if (isBrowserDemoMode()) {
    const request = readDemoCoachRequests().find(
      (coachRequest) =>
        coachRequest.activityId === activityId &&
        coachRequest.requestType === "organizer_request" &&
        isConfirmedCoachStatus(coachRequest.status),
    );

    return request ? { request, coach: demoCoachProfile } : null;
  }

  const requests = await loadCoachRequestsForActivity(activityId);
  const request = requests.find(
    (coachRequest) =>
      coachRequest.requestType === "organizer_request" &&
      isConfirmedCoachStatus(coachRequest.status),
  );

  if (!request) return null;
  if (!request.coachProfileId) return { request, coach: null };

  const { data, error } = await supabase
    .from("coach_profiles")
    .select("*")
    .eq("id", request.coachProfileId)
    .maybeSingle();

  if (error) throw error;

  return {
    request,
    coach: data ? mapCoachProfile(data as Record<string, unknown>) : null,
  };
}

export async function requestCoachForActivity(
  activity: Activity,
  requestType: CoachRequestType,
  coachRole: SportCoachRole = "sport_coach",
  message = "",
) {
  const userKey = await getCurrentCoachUserKey();
  const normalizedRole = normalizeSportCoachRole(coachRole);
  const trimmedMessage = message.trim();

  if (!userKey) {
    throw new Error("auth_required");
  }

  if (isBrowserDemoMode()) {
    const requests = readDemoCoachRequests();
    const now = new Date().toISOString();
    const id = `demo-coach-${activity.id}-${userKey}-${requestType}`;
    const previous = requests.find((request) => request.id === id);
    const next: CoachRequest = {
      id,
      activityId: activity.id,
      requesterUserKey: userKey,
      coachProfileId: requestType === "organizer_request" ? demoCoachProfile.id : undefined,
      requestType,
      sportType: normalizedRole,
      coachRole: normalizedRole,
      goal: trimmedMessage || undefined,
      message: trimmedMessage || undefined,
      level: undefined,
      paymentMode: "split",
      status: requestType === "organizer_request" ? "confirmed" : "pending",
      createdAt: previous?.createdAt || now,
      updatedAt: now,
    };

    writeDemoCoachRequests([
      next,
      ...requests.filter((request) => request.id !== id),
    ]);
    return;
  }

  const { error } = await supabase
    .from("coach_requests")
    .upsert({
      activity_id: activity.id,
      requester_user_key: userKey,
      request_type: requestType,
      sport_type: normalizedRole,
      goal: trimmedMessage || null,
      level: null,
      payment_mode: "split",
      status: "pending",
    }, {
      onConflict: "activity_id,requester_user_key,request_type",
      ignoreDuplicates: false,
    });

  if (error) throw error;
}

export async function cancelCoachRequest(requestId: string) {
  if (isBrowserDemoMode()) {
    const requests = readDemoCoachRequests();
    writeDemoCoachRequests(requests.map((request) =>
      request.id === requestId ? { ...request, status: "cancelled", updatedAt: new Date().toISOString() } : request,
    ));
    return;
  }

  const { error } = await supabase
    .from("coach_requests")
    .update({ status: "cancelled", updated_at: new Date().toISOString() })
    .eq("id", requestId);

  if (error) throw error;
}
