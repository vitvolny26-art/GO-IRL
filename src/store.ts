import { create } from "zustand";
import { supabase, getUserKey } from "./supabase";
import { getTelegramWebApp } from "./telegram";
import { getCurrentUserRole, isCurrentUserAdmin } from "./config/admin";
import { cities, defaultCityId } from "./config/cities";
import { getTranslation } from "./i18n";
import type { Activity, AppView, Language, NewActivity, UserRole } from "./types";

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
  address: string;
  location_url: string | null;
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

const mapActivity = (row: DbActivity, members: DbMember[]): Activity => ({
  id: row.id,
  categoryId: row.category_id,
  activity: localizedDbText(row.activity_ru, row.activity_cs),
  title: localizedDbText(row.title_ru, row.title_cs),
  description: localizedDbText(row.description_ru, row.description_cs),
  date: row.event_date,
  time: row.event_time.slice(0, 5),
  address: row.address,
  locationUrl: row.location_url || undefined,
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
});

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
        address: input.address,
        location_url: input.locationUrl || null,
        price: input.price,
        capacity: input.capacity,
        organizer,
        organizer_key: userKey,
        visibility: input.visibility,
      };

      const { data, error } = await supabase.from("activities").insert(row).select("id").single();
      if (error) throw error;

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
        address: input.address,
        location_url: input.locationUrl || null,
        price: input.price,
        capacity: input.capacity,
        visibility: input.visibility,
      };

      const { error } = await supabase.from("activities").update(row).eq("id", id);
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
