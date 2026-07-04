import { create } from "zustand";
import { categories } from "./data";
import { supabase, getUserKey } from "./supabase";
import {
  getCurrentDisplayName,
  getCurrentStartParam,
  getCurrentUserRole as getTrustedUserRole,
  initializeTrustedAuth,
  isTrustedAuthReady,
} from "./authSession";
import { getCurrentUserRole, isCurrentUserAdmin } from "./config/admin";
import { cities, defaultCityId } from "./config/cities";
import { getTranslation } from "./i18n";
import type { Activity, ActivityMetadata, ActivityType, AppView, Language, NewActivity, UserRole } from "./types";

type JoinResult = "joined" | "pending" | "left" | "full" | "private";

type DbActivity = {
  id: string;
  category_id: string;
  activity_ru: string;
  activity_cs: string;
  title_ru: string;
  title_cs: string;
  description_ru: string;
  description_cs: string;
  event_date: string;
  event_time: string;
  city_id?: string | null;
  address: string;
  location_url: string | null;
  participant_note?: string | null;
  activity_type?: ActivityType | null;
  metadata?: ActivityMetadata | null;
  price: number;
  capacity: number;
  organizer: string;
  organizer_key: string;
  visibility: Activity["visibility"];
  urgent: boolean;
  popular: boolean;
};

type DbMember = {
  activity_id: string;
  user_key: string;
  display_name: string;
  status: "joined" | "waiting" | "pending";
};

type AppState = {
  language: Language;
  selectedCityId: string;
  view: AppView;
  activities: Activity[];
  joinedIds: string[];
  waitingIds: string[];
  pendingIds: string[];
  selectedCategory: string | null;
  loading: boolean;
  syncError: string | null;
  userRole: UserRole;
  initialize: () => Promise<void>;
  disposeRealtime: () => void;
  setLanguage: (language: Language) => void;
  setSelectedCity: (cityId: string) => void;
  setView: (view: AppView) => void;
  setCategory: (id: string | null) => void;
  toggleJoin: (id: string) => Promise<JoinResult>;
  createActivity: (activity: NewActivity) => Promise<string>;
  updateActivity: (id: string, activity: NewActivity) => Promise<string>;
  deleteActivity: (id: string) => Promise<void>;
  reviewRequest: (activityId: string, memberKey: string, approved: boolean) => Promise<void>;
};

let realtimeChannel: ReturnType<typeof supabase.channel> | null = null;

class AuthNotReadyError extends Error {
  constructor() {
    super("Authentication is not ready yet");
    this.name = "AuthNotReadyError";
  }
}

const ensureTrustedAuthForWrite = async () => {
  if (isTrustedAuthReady()) return;

  const session = await initializeTrustedAuth();

  if (!session || !("source" in session) || session.source !== "trusted-telegram") {
    throw new AuthNotReadyError();
  }
};

const localizedDbText = (ru: string, cs: string) => ({
  ru,
  uk: ru,
  cs,
  en: ru,
});

const normalizeCategoryId = (categoryId: string) => {
  if (categoryId === "inline-skating") return "activities";
  return categories.some((category) => category.id === categoryId) ? categoryId : "activities";
};

const inferActivityType = (categoryId: string, explicitType?: ActivityType | null): ActivityType =>
  explicitType || (normalizeCategoryId(categoryId) === "sport" ? "sport" : "custom");

const mapActivity = (row: DbActivity, members: DbMember[]): Activity => ({
  id: row.id,
  type: activityOverride(row.id).type || inferActivityType(row.category_id, row.activity_type),
  categoryId: normalizeCategoryId(row.category_id),
  activity: localizedDbText(row.activity_ru, row.activity_cs),
  title: localizedDbText(row.title_ru, row.title_cs),
  description: localizedDbText(row.description_ru, row.description_cs),
  date: row.event_date,
  time: row.event_time.slice(0, 5),
  cityId: activityCityId(row),
  address: row.address,
  locationUrl: row.location_url || undefined,
  participantNote: row.participant_note || activityOverride(row.id).participantNote || undefined,
  price: row.price,
  capacity: row.capacity,
  participants: members.filter((member) => member.activity_id === row.id && member.status === "joined").length,
  members: members
    .filter((member) => member.activity_id === row.id)
    .map((member) => ({ userKey: member.user_key, name: member.display_name, status: member.status })),
  organizer: row.organizer,
  organizerKey: row.organizer_key,
  visibility: row.visibility,
  urgent: row.urgent,
  popular: row.popular,
  metadata: row.metadata || activityOverride(row.id).metadata || undefined,
});

const isMissingOptionalColumnError = (error: { message?: string } | null) =>
  Boolean(error?.message?.includes("city_id") || error?.message?.includes("participant_note") || error?.message?.includes("activity_type") || error?.message?.includes("metadata"));

const optionalActivityColumns = ["city_id", "participant_note", "activity_type", "metadata"] as const;
type OptionalActivityColumn = (typeof optionalActivityColumns)[number];

const deletedActivityMarker = "__go_irl_deleted__";
const missingActivityColumns = new Set<OptionalActivityColumn>();
const activityOverrideStorageKey = "go-irl-activity-overrides";
const legacyCityOverrideStorageKey = "go-irl-activity-city-overrides";

type ActivityOverride = {
  cityId?: string;
  participantNote?: string;
  type?: ActivityType;
  metadata?: ActivityMetadata;
};

const readActivityOverrides = (): Record<string, ActivityOverride> => {
  try {
    return JSON.parse(localStorage.getItem(activityOverrideStorageKey) || "{}") as Record<string, ActivityOverride>;
  } catch {
    return {};
  }
};

const readLegacyCityOverrides = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(legacyCityOverrideStorageKey) || "{}") as Record<string, string>;
  } catch {
    return {};
  }
};

const writeActivityOverride = (activityId: string, override: ActivityOverride) => {
  const overrides = readActivityOverrides();
  overrides[activityId] = { ...overrides[activityId], ...override };
  localStorage.setItem(activityOverrideStorageKey, JSON.stringify(overrides));
};

const removeActivityOverride = (activityId: string) => {
  const overrides = readActivityOverrides();
  delete overrides[activityId];
  localStorage.setItem(activityOverrideStorageKey, JSON.stringify(overrides));
};

const activityOverride = (activityId: string) => readActivityOverrides()[activityId] || {};
const activityCityId = (row: DbActivity) => row.city_id || activityOverride(row.id).cityId || readLegacyCityOverrides()[row.id] || defaultCityId;
const isDeletedActivityRow = (row: DbActivity) => row.title_ru === deletedActivityMarker || row.title_cs === deletedActivityMarker;

const withoutMissingOptionalColumn = <T extends Partial<Record<OptionalActivityColumn, unknown>>>(row: T, error: { message?: string } | null) => {
  const message = error?.message || "";
  const nextRow = { ...row };
  const missingColumns = optionalActivityColumns.filter((column) => message.includes(column));
  const columnsToRemove = missingColumns.length ? missingColumns : optionalActivityColumns;

  for (const column of columnsToRemove) {
    missingActivityColumns.add(column);
    delete nextRow[column];
  }

  return nextRow;
};

const optionalOverrideFromInput = (input: NewActivity): ActivityOverride => {
  const override: ActivityOverride = {};
  if (missingActivityColumns.has("city_id")) override.cityId = input.cityId;
  if (missingActivityColumns.has("participant_note")) override.participantNote = input.participantNote;
  if (missingActivityColumns.has("activity_type")) override.type = input.type || inferActivityType(input.categoryId);
  if (missingActivityColumns.has("metadata")) override.metadata = input.metadata;
  return override;
};

const hasActivityOverride = (override: ActivityOverride) => Object.values(override).some((value) => value !== undefined);

const activityFromInput = (id: string, input: NewActivity, current: Activity): Activity => {
  const localizedText = {
    ru: input.activityText,
    uk: input.activityText,
    cs: input.activityText,
    en: input.activityText,
  };
  const localizedTitle = {
    ru: input.titleText,
    uk: input.titleText,
    cs: input.titleText,
    en: input.titleText,
  };
  const localizedDescription = {
    ru: input.descriptionText,
    uk: input.descriptionText,
    cs: input.descriptionText,
    en: input.descriptionText,
  };

  return {
    ...current,
    id,
    type: input.type || inferActivityType(input.categoryId),
    categoryId: normalizeCategoryId(input.categoryId),
    activity: localizedText,
    title: localizedTitle,
    description: localizedDescription,
    date: input.date,
    time: input.time,
    cityId: input.cityId,
    address: input.address,
    locationUrl: input.locationUrl,
    participantNote: input.participantNote,
    price: input.price,
    capacity: input.capacity,
    visibility: input.visibility,
    metadata: input.metadata,
  };
};

export const useAppStore = create<AppState>((set, get) => {
  const reload = async () => {
    if (typeof document !== "undefined" && document.hidden) return;
    const userKey = getUserKey();
    const [activitiesResult, membersResult] = await Promise.all([
      supabase.from("activities").select("*").order("event_date").order("event_time"),
      supabase.from("activity_members").select("activity_id,user_key,display_name,status"),
    ]);

    const error = activitiesResult.error || membersResult.error;
    if (error) throw error;

    const rows = ((activitiesResult.data || []) as DbActivity[]).filter((row) => !isDeletedActivityRow(row));
    const members = (membersResult.data || []) as DbMember[];
    const invitedActivityId = getCurrentStartParam();
    const visibleRows = rows.filter((row) => row.visibility === "public" || row.organizer_key === userKey || row.id === invitedActivityId);
    const visibleActivityIds = new Set(visibleRows.map((row) => row.id));
    const visibleMembers = members.filter((member) => visibleActivityIds.has(member.activity_id));

    set({
      activities: visibleRows.map((row) => mapActivity(row, visibleMembers)),
      joinedIds: members.filter((member) => member.user_key === userKey && member.status === "joined").map((member) => member.activity_id),
      waitingIds: members.filter((member) => member.user_key === userKey && member.status === "waiting").map((member) => member.activity_id),
      pendingIds: members.filter((member) => member.user_key === userKey && member.status === "pending").map((member) => member.activity_id),
      syncError: null,
    });
  };

  return {
    language: ["ru", "uk", "cs", "en"].includes(localStorage.getItem("go-irl-language") || "")
      ? localStorage.getItem("go-irl-language") as Language
      : "ru",
    selectedCityId: cities.some((city) => city.id === localStorage.getItem("go-irl-city"))
      ? localStorage.getItem("go-irl-city")!
      : defaultCityId,
    view: "home",
    activities: [],
    joinedIds: [],
    waitingIds: [],
    pendingIds: [],
    selectedCategory: null,
    loading: true,
    syncError: null,
    userRole: getTrustedUserRole() === "user" ? getCurrentUserRole(getUserKey()) : getTrustedUserRole(),

    initialize: async () => {
      set({ loading: true });
      try {
        set({ userRole: getTrustedUserRole() === "user" ? getCurrentUserRole(getUserKey()) : getTrustedUserRole() });
        await reload();
        if (!realtimeChannel && !(typeof document !== "undefined" && document.hidden)) {
          realtimeChannel = supabase
            .channel("go-irl-live")
            .on("postgres_changes", { event: "*", schema: "public", table: "activities" }, () => {
              if (!(typeof document !== "undefined" && document.hidden)) void reload();
            })
            .on("postgres_changes", { event: "*", schema: "public", table: "activity_members" }, () => {
              if (!(typeof document !== "undefined" && document.hidden)) void reload();
            })
            .subscribe();
        }
      } catch (error) {
        console.error(error);
        set({ syncError: "database_unavailable" });
      } finally {
        set({ loading: false });
      }
    },

    disposeRealtime: () => {
      if (realtimeChannel) {
        void supabase.removeChannel(realtimeChannel);
        realtimeChannel = null;
      }
    },

    setLanguage: (language) => {
      localStorage.setItem("go-irl-language", language);
      set({ language });
    },
    setSelectedCity: (selectedCityId) => {
      if (!cities.some((city) => city.id === selectedCityId)) return;
      localStorage.setItem("go-irl-city", selectedCityId);
      set({ selectedCityId });
    },
    setView: (view) => set({ view }),
    setCategory: (selectedCategory) => set({ selectedCategory, view: "explore" }),

    toggleJoin: async (id) => {
      await ensureTrustedAuthForWrite();
      const userKey = getUserKey();
      const { joinedIds, waitingIds, pendingIds, activities } = get();

      if (joinedIds.includes(id) || waitingIds.includes(id) || pendingIds.includes(id)) {
        const { error } = await supabase.from("activity_members").delete().eq("activity_id", id).eq("user_key", userKey);
        if (error) throw error;
        await reload();
        return "left";
      }

      const activity = activities.find((item) => item.id === id);
      if (!activity) throw new Error("Activity not found");
      if (activity.visibility === "private") return "private";
      if (activity.participants >= activity.capacity) return "full";

      const status: DbMember["status"] = activity.visibility === "invite" ? "pending" : "joined";
      const displayName = getCurrentDisplayName(getTranslation(get().language).guestName);
      const { error } = await supabase.from("activity_members").insert({
        activity_id: id,
        user_key: userKey,
        display_name: displayName,
        status,
      });
      if (error) throw error;
      await reload();
      return status;
    },

    createActivity: async (input) => {
      await ensureTrustedAuthForWrite();
      const userKey = getUserKey();
      const organizer = getCurrentDisplayName(getTranslation(get().language).guestName);
      const row = {
        category_id: input.categoryId,
        activity_ru: input.activityText,
        activity_cs: input.activityText,
        title_ru: input.titleText,
        title_cs: input.titleText,
        description_ru: input.descriptionText,
        description_cs: input.descriptionText,
        event_date: input.date,
        event_time: input.time,
        city_id: input.cityId,
        address: input.address,
        location_url: input.locationUrl || null,
        participant_note: input.participantNote || null,
        activity_type: input.type || inferActivityType(input.categoryId),
        metadata: input.metadata || null,
        price: input.price,
        capacity: input.capacity,
        organizer,
        organizer_key: userKey,
        visibility: input.visibility,
      };

      let insertRow = row;
      let data = null as { id: string } | null;
      let error = null as { message?: string } | null;
      for (let attempt = 0; attempt <= optionalActivityColumns.length; attempt += 1) {
        const result = await supabase.from("activities").insert(insertRow).select("id").single();
        data = result.data;
        error = result.error;
        if (!isMissingOptionalColumnError(error)) break;
        insertRow = withoutMissingOptionalColumn(insertRow, error);
      }
      if (error) throw error;
      if (!data) throw new Error("Activity was not created");
      const override = optionalOverrideFromInput(input);
      if (hasActivityOverride(override)) {
        writeActivityOverride(data.id, override);
      } else {
        removeActivityOverride(data.id);
      }

      const { error: memberError } = await supabase.from("activity_members").insert({
        activity_id: data.id,
        user_key: userKey,
        display_name: organizer,
        status: "joined",
      });
      if (memberError) throw memberError;

      await reload();
      set({ view: "home" });
      return data.id as string;
    },

    updateActivity: async (id, input) => {
      await ensureTrustedAuthForWrite();
      const userKey = getUserKey();
      const current = get().activities.find((item) => item.id === id);
      if (!current || current.organizerKey !== userKey) throw new Error("Only organizer can edit activity");

      const row = {
        category_id: input.categoryId,
        activity_ru: input.activityText,
        activity_cs: input.activityText,
        title_ru: input.titleText,
        title_cs: input.titleText,
        description_ru: input.descriptionText,
        description_cs: input.descriptionText,
        event_date: input.date,
        event_time: input.time,
        city_id: input.cityId,
        address: input.address,
        location_url: input.locationUrl || null,
        participant_note: input.participantNote || null,
        activity_type: input.type || inferActivityType(input.categoryId),
        metadata: input.metadata || null,
        price: input.price,
        capacity: input.capacity,
        visibility: input.visibility,
      };

      let updateRow = row;
      let error = null as { message?: string } | null;
      let count = 0;
      for (let attempt = 0; attempt <= optionalActivityColumns.length; attempt += 1) {
        const result = await supabase.from("activities").update(updateRow, { count: "exact" }).eq("id", id);
        error = result.error;
        count = result.count ?? 0;
        if (!isMissingOptionalColumnError(error)) break;
        updateRow = withoutMissingOptionalColumn(updateRow, error);
      }
      if (error) throw error;
      if (count === 0) throw new Error("Activity was not updated");
      const override = optionalOverrideFromInput(input);
      if (hasActivityOverride(override)) {
        writeActivityOverride(id, override);
      } else {
        removeActivityOverride(id);
      }
      set((state) => ({
        activities: state.activities.map((activity) => (activity.id === id ? activityFromInput(id, input, current) : activity)),
      }));
      await reload();
      set({ view: "home" });
      return id;
    },

    deleteActivity: async (id) => {
      await ensureTrustedAuthForWrite();
      const userKey = getUserKey();
      const current = get().activities.find((item) => item.id === id);
      const isAdmin = getTrustedUserRole() === "admin" || isCurrentUserAdmin(userKey);
      if (!current || (current.organizerKey !== userKey && !isAdmin)) {
        throw new Error("Only organizer or admin can delete activity");
      }

      const membersResult = await supabase.from("activity_members").delete().eq("activity_id", id);
      if (membersResult.error) throw membersResult.error;

      const { error, count } = await supabase.from("activities").delete({ count: "exact" }).eq("id", id);
      if (error) throw error;
      if (count === 0) {
        const fallback = await supabase
          .from("activities")
          .update({
            activity_ru: deletedActivityMarker,
            activity_cs: deletedActivityMarker,
            title_ru: deletedActivityMarker,
            title_cs: deletedActivityMarker,
            description_ru: deletedActivityMarker,
            description_cs: deletedActivityMarker,
            visibility: "private",
          }, { count: "exact" })
          .eq("id", id);
        if (fallback.error) throw fallback.error;
        if ((fallback.count ?? 0) === 0) throw new Error("Activity was not deleted");
      }
      removeActivityOverride(id);
      set((state) => ({
        activities: state.activities.filter((activity) => activity.id !== id),
        joinedIds: state.joinedIds.filter((activityId) => activityId !== id),
        waitingIds: state.waitingIds.filter((activityId) => activityId !== id),
        pendingIds: state.pendingIds.filter((activityId) => activityId !== id),
      }));
      await reload();
      set({ view: "home" });
    },

    reviewRequest: async (activityId, memberKey, approved) => {
      await ensureTrustedAuthForWrite();
      const activity = get().activities.find((item) => item.id === activityId);
      if (!activity || activity.organizerKey !== getUserKey()) throw new Error("Only organizer can review requests");

      if (!approved) {
        const { error } = await supabase.from("activity_members").delete().eq("activity_id", activityId).eq("user_key", memberKey);
        if (error) throw error;
      } else {
        const status: DbMember["status"] = activity.participants >= activity.capacity ? "waiting" : "joined";
        const { error } = await supabase
          .from("activity_members")
          .update({ status })
          .eq("activity_id", activityId)
          .eq("user_key", memberKey);
        if (error) throw error;
      }
      await reload();
    },
  };
});
