export type Language = "ru" | "cs";
export type AppView = "home" | "explore" | "create" | "profile";

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
  categoryId: string;
  activity: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
  date: string;
  time: string;
  address: string;
  locationUrl?: string;
  price: number;
  capacity: number;
  participants: number;
  members: ActivityMember[];
  organizer: string;
  organizerKey: string;
  visibility: "public" | "private" | "invite";
  urgent?: boolean;
  popular?: boolean;
};

export type NewActivity = Omit<Activity, "id" | "participants" | "members" | "organizer" | "organizerKey" | "activity" | "title" | "description"> & {
  titleText: string;
  descriptionText: string;
  activityText: string;
};
