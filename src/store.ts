import { create } from "zustand";
import { categories } from "./data";
import { supabase, getUserKey } from "./supabase";
import { getTelegramWebApp } from "./telegram";
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
  type: inferActivityType(row.category_id, row.activity_type),
  categoryId: normalizeCategoryId(row.category_id),
  activity: localizedDbText(row.activity_ru, row.activity_cs),
  title: localizedDbText(row.title_ru, row.title_cs),
  description: localizedDbText(row.description_ru, row.description_cs),
  date: row.event_date,
  time: row.event_time.slice(0, 5),
  cityId: row.city_id || defaultCityId,
  address: row.address,
  locationUrl: row.location_url || undefined,
  participantNote: row.participant_note || undefined,
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
  metadata: row.metadata || undefined,
});

const isMissingOptionalColumnError = (error: { message?: string } | null) =>
  Boolean(error?.message?.includes("city_id") || error?.message?.includes("participant_note") || error?.message?.includes("activity_type") || error?.message?.includes("metadata"));

const optionalActivityColumns = ["city_id", "participant_note", "activity_type", "metadata"] as const;
type OptionalActivityColumn = (typeof optionalActivityColumns)[number];

const withoutMissingOptionalColumn = <T extends Partial<Record<OptionalActivityColumn, unknown>>>(row: T, error: { message?: string } | null) => {
  const message = error?.message || "";
  const nextRow = { ...row };
  const missingColumns = optionalActivityColumns.filter((column) => message.includes(column));
  const columnsToRemove = missingColumns.length ? missingColumns : optionalActivityColumns;

  for (const column of columnsToRemove) {
    delete nextRow[column];
  }

  return nextRow;
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

    const rows = (activitiesResult.data || []) as DbActivity[];
    const members = (membersResult.data || []) as DbMember[];
    const invitedActivityId = getTelegramWebApp()?.initDataUnsafe?.start_param;
    const visibleRows = rows.filter((row) => row.visibility === "public" || row.organizer_key === userKey || row.id === invitedActivityId);

    set({
      activities: visibleRows.map((row) => mapActivity(row, members)),
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
    userRole: getCurrentUserRole(getUserKey()),

    initialize: async () => {
      set({ loading: true });
      try {
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
      const telegramUser = getTelegramWebApp()?.initDataUnsafe?.user;
      const displayName = [telegramUser?.first_name, telegramUser?.last_name].filter(Boolean).join(" ") || getTranslation(get().language).guestName;
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
      const userKey = getUserKey();
      const telegramUser = getTelegramWebApp()?.initDataUnsafe?.user;
      const organizer = [telegramUser?.first_name, telegramUser?.last_name].filter(Boolean).join(" ") || getTranslation(get().language).guestName;
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
      for (let attempt = 0; attempt <= optionalActivityColumns.length; attempt += 1) {
        const result = await supabase.from("activities").update(updateRow).eq("id", id);
        error = result.error;
        if (!isMissingOptionalColumnError(error)) break;
        updateRow = withoutMissingOptionalColumn(updateRow, error);
      }
      if (error) throw error;
      await reload();
      set({ view: "home" });
      return id;
    },

    deleteActivity: async (id) => {
      const userKey = getUserKey();
      const current = get().activities.find((item) => item.id === id);
      if (!current || (current.organizerKey !== userKey && !isCurrentUserAdmin(userKey))) {
        throw new Error("Only organizer or admin can delete activity");
      }

      const { error } = await supabase.from("activities").delete().eq("id", id);
      if (error) throw error;
      await reload();
      set({ view: "home" });
    },

    reviewRequest: async (activityId, memberKey, approved) => {
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
