export type Language = "ru" | "uk" | "cs" | "en";
export type AppView = "home" | "discover" | "explore" | "create" | "profile";
export type UserRole = "user" | "organizer" | "admin";
export type ActivityType = "sport" | "dating" | "friends" | "food" | "culture" | "local" | "custom";

export type ActivityMetadata = {
  sport?: Record<string, unknown>;
  dating?: Record<string, unknown>;
  friends?: Record<string, unknown>;
  food?: Record<string, unknown>;
  custom?: Record<string, unknown>;
};

export type Category = {
  id: string;
  icon: string;
  name: Record<Language, string>;
};

export type ActivityMember = {
  userKey: string;
  name: string;
  status: "joined" | "waiting" | "pending";
};

export type Activity = {
  id: string;
  type?: ActivityType;
  categoryId: string;
  activity: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
  date: string;
  time: string;
  cityId: string;
  address: string;
  locationUrl?: string;
  participantNote?: string;
  price: number;
  capacity: number;
  participants: number;
  members: ActivityMember[];
  organizer: string;
  organizerKey: string;
  visibility: "public" | "private" | "invite";
  urgent?: boolean;
  popular?: boolean;
  metadata?: ActivityMetadata;
};

export type NewActivity = Omit<Activity, "id" | "participants" | "members" | "organizer" | "organizerKey" | "activity" | "title" | "description"> & {
  titleText: string;
  descriptionText: string;
  activityText: string;
};
