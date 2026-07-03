import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Compass,
  Dices,
  Flag,
  Home,
  MapPin,
  Pencil,
  Plus,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  UserRoundCheck,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import { activityOptions, categories } from "./data";
import { AppHeader } from "./components/AppHeader";
import { getCity } from "./config/cities";
import { getTranslation, localeByLanguage } from "./i18n";
import { useAppStore } from "./store";
import { getUserKey } from "./supabase";
import type { Activity, AppView, Language, NewActivity } from "./types";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe?: {
          start_param?: string;
          user?: { id?: number; first_name?: string; last_name?: string; username?: string };
        };
        HapticFeedback?: { impactOccurred: (style: string) => void; notificationOccurred: (type: string) => void };
        openTelegramLink?: (url: string) => void;
      };
    };
  }
}

const BOT_USERNAME = "gosportovatBot";

const activityInviteUrl = (activity: Activity) =>
  `https://t.me/${BOT_USERNAME}?startapp=${encodeURIComponent(activity.id)}`;

const dateLabel = (date: string, language: Language) =>
  new Intl.DateTimeFormat(localeByLanguage[language], {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));

const compactDateLabel = (date: string, language: Language) => {
  const t = getTranslation(language);
  const eventDate = new Date(`${date}T12:00:00`);
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date === todayKey) return t.today;
  if (date === tomorrow.toISOString().slice(0, 10)) return t.tomorrow;

  return new Intl.DateTimeFormat(localeByLanguage[language], {
    day: "numeric",
    month: "short",
  }).format(eventDate);
};

function App() {
  const store = useAppStore();
  const [selected, setSelected] = useState<Activity | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [notice, setNotice] = useState("");
  const invitationHandled = useRef(false);
  const t = getTranslation(store.language);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();
    tg?.expand();
    void useAppStore.getState().initialize();
  }, []);

  useEffect(() => {
    if (invitationHandled.current) return;
    const tg = window.Telegram?.WebApp;
    const startParam = tg?.initDataUnsafe?.start_param;
    if (startParam) {
      const invitedActivity = store.activities.find((item) => item.id === startParam);
      if (invitedActivity) {
        invitationHandled.current = true;
        setSelected(invitedActivity);
      }
    }
  }, [store.activities]);

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const openRandom = () => {
    const random = store.activities[Math.floor(Math.random() * store.activities.length)];
    if (random) setSelected(random);
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("medium");
  };

  const handleJoin = async (activity: Activity) => {
    try {
      const result = await store.toggleJoin(activity.id);
      const message = result === "joined" ? t.joined : result === "waiting" ? t.waiting : result === "pending" ? t.requested : t.leave;
      flash(message);
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred(result === "left" ? "warning" : "success");
    } catch {
      flash(t.joinError);
    }
  };

  const shareActivity = async (activity: Activity) => {
    const url = activityInviteUrl(activity);
    const text = `${activity.title[store.language]} — ${dateLabel(activity.date, store.language)}, ${activity.time}. ${activity.address}`;
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;

    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(telegramShareUrl);
      return;
    }

    if (navigator.share) {
      await navigator.share({ title: "GO IRL", text, url });
    } else {
      await navigator.clipboard?.writeText(`${text}\n${url}`);
      flash(t.copied);
    }
  };

  return (
    <div className="app">
      <AppHeader
        language={store.language}
        selectedCityId={store.selectedCityId}
        translation={t}
        onBrandClick={() => store.setView("home")}
        onCityChange={store.setSelectedCity}
        onLanguageChange={store.setLanguage}
      />

      <main>
        {store.syncError && <div className="sync-banner">{t.databaseError}</div>}
        {store.loading && <div className="sync-loading">{t.loadingEvents}</div>}
        {store.view === "home" && (
          <HomeView
            language={store.language}
            onOpen={setSelected}
            onJoin={handleJoin}
            onRandom={openRandom}
            onCreate={() => store.setView("create")}
          />
        )}
        {store.view === "explore" && <ExploreView language={store.language} onOpen={setSelected} onJoin={handleJoin} />}
        {store.view === "create" && <CreateView language={store.language} initialActivity={editingActivity} onCancel={() => {
          setEditingActivity(null);
          store.setView("home");
        }} onCreated={(id) => {
          flash(editingActivity ? t.updatedSuccess : t.createdSuccess);
          setEditingActivity(null);
          setSelected(useAppStore.getState().activities.find((item) => item.id === id) || null);
        }} />}
        {store.view === "profile" && <ProfileView language={store.language} />}
      </main>

      <BottomNav view={store.view} setView={store.setView} language={store.language} />

      {selected && (
        <ActivitySheet
          activity={store.activities.find((item) => item.id === selected.id) || selected}
          language={store.language}
          onClose={() => setSelected(null)}
          onJoin={handleJoin}
          onShare={shareActivity}
          onEdit={(activity) => {
            setSelected(null);
            setEditingActivity(activity);
            store.setView("create");
          }}
        />
      )}
      {notice && <div className="toast">{notice}</div>}
    </div>
  );
}

function HomeView({ language, onOpen, onJoin, onRandom, onCreate }: { language: Language; onOpen: (activity: Activity) => void; onJoin: (activity: Activity) => void; onRandom: () => void; onCreate: () => void }) {
  const { activities, setCategory } = useAppStore();
  const t = getTranslation(language);
  const today = new Date().toISOString().slice(0, 10);
  const nearby = activities.filter((item) => item.date >= today).slice(0, 4);
  const popular = activities.filter((item) => item.popular);
  const urgent = activities.filter((item) => item.urgent);

  return (
    <>
      <section className="intro">
        <p>{t.tagline}</p>
        <div className="brand-expansion">{t.brandMeaning}</div>
        <div className="quick-actions">
          <button className="quick primary" onClick={onRandom} type="button"><Dices size={25} /><span>{t.surprise}</span></button>
          <button className="quick secondary" onClick={onCreate} type="button"><Plus size={25} /><span>{t.create}</span></button>
        </div>
      </section>

      <SectionHeader title={t.categories} />
      <div className="category-grid">
        {categories.map((category) => (
          <button className="category-button" key={category.id} onClick={() => setCategory(category.id)} type="button">
            <span>{category.icon}</span>
            <strong>{category.name[language]}</strong>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>

      <ActivitySection title={t.nearby} activities={nearby} language={language} onOpen={onOpen} onJoin={onJoin} />
      {urgent.length > 0 && <ActivitySection title={t.urgent} icon={<Zap size={18} />} activities={urgent} language={language} onOpen={onOpen} onJoin={onJoin} urgent />}
      <ActivitySection title={t.popular} activities={popular} language={language} onOpen={onOpen} onJoin={onJoin} />
    </>
  );
}

function ExploreView({ language, onOpen, onJoin }: { language: Language; onOpen: (activity: Activity) => void; onJoin: (activity: Activity) => void }) {
  const { activities, selectedCategory, selectedCityId, setCategory } = useAppStore();
  const t = getTranslation(language);
  const city = getCity(selectedCityId);
  const filtered = selectedCategory ? activities.filter((item) => item.categoryId === selectedCategory) : activities;

  return (
    <section className="page-section">
      <div className="page-title"><Compass /><div><h1>{t.all}</h1><p>{city.name[language]}</p></div></div>
      <div className="filter-row">
        <button className={!selectedCategory ? "filter active" : "filter"} onClick={() => setCategory(null)} type="button">{t.all}</button>
        {categories.map((category) => (
          <button className={selectedCategory === category.id ? "filter active" : "filter"} key={category.id} onClick={() => setCategory(category.id)} type="button">
            {category.icon} {category.name[language]}
          </button>
        ))}
      </div>
      <div className="activity-stack">
        {filtered.length ? filtered.map((item) => <ActivityCard key={item.id} activity={item} language={language} onOpen={onOpen} onJoin={onJoin} />) : <EmptyState text={t.noEvents} />}
      </div>
    </section>
  );
}

function CreateView({ language, initialActivity, onCreated, onCancel }: { language: Language; initialActivity: Activity | null; onCreated: (id: string) => void; onCancel: () => void }) {
  const createActivity = useAppStore((state) => state.createActivity);
  const updateActivity = useAppStore((state) => state.updateActivity);
  const selectedCityId = useAppStore((state) => state.selectedCityId);
  const [categoryId, setCategoryId] = useState(initialActivity?.categoryId || "sport");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const t = getTranslation(language);
  const selectedCity = getCity(selectedCityId);
  const today = new Date().toISOString().slice(0, 10);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError("");
    const data = new FormData(event.currentTarget);
    const activityText = String(data.get("activityText"));
    const activityEmoji = activityText.split(" ")[0];
    const rawTitle = String(data.get("titleText")).trim();
    const activity: NewActivity = {
      categoryId,
      activityText,
      titleText: rawTitle.startsWith(activityEmoji) ? rawTitle : `${activityEmoji} ${rawTitle}`,
      descriptionText: String(data.get("descriptionText")),
      date: String(data.get("date")),
      time: String(data.get("time")),
      address: String(data.get("address")),
      locationUrl: String(data.get("locationUrl") || "").trim() || undefined,
      price: Number(data.get("price")),
      capacity: Number(data.get("capacity")),
      visibility: String(data.get("visibility")) as NewActivity["visibility"],
    };
    try {
      const id = initialActivity
        ? await updateActivity(initialActivity.id, activity)
        : await createActivity(activity);
      onCreated(id);
      if (!initialActivity) event.currentTarget.reset();
    } catch {
      setFormError(t.publishError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page-section create-page">
      <button className="back-button" onClick={onCancel} type="button"><ArrowLeft size={20} /></button>
      <div className="page-title">{initialActivity ? <Pencil /> : <Plus />}<div><h1>{initialActivity ? t.edit : t.createTitle}</h1><p>{t.createHint}</p></div></div>
      <form className="create-form" onSubmit={submit}>
        <label><span>{t.category}</span><select name="categoryId" value={categoryId} onChange={(event) => setCategoryId(event.target.value)} required>{categories.map((category) => <option key={category.id} value={category.id}>{category.icon} {category.name[language]}</option>)}</select></label>
        <label><span>{t.activity}</span><select key={`${categoryId}-${language}`} name="activityText" defaultValue={initialActivity?.categoryId === categoryId ? initialActivity.activity[language] : undefined} required>{activityOptions[categoryId].map((option) => <option key={`${option.icon}-${option.name[language]}`} value={`${option.icon} ${option.name[language]}`}>{option.icon} {option.name[language]}</option>)}</select></label>
        <label><span>{t.title}</span><input name="titleText" defaultValue={initialActivity?.title[language]} placeholder={t.titlePlaceholder} required /></label>
        <label><span>{t.description}</span><textarea name="descriptionText" rows={4} defaultValue={initialActivity?.description[language]} required /></label>
        <div className="form-row">
          <label><span>{t.date}</span><input name="date" type="date" min={today} defaultValue={initialActivity?.date || today} required /></label>
          <label><span>{t.time}</span><input name="time" type="time" defaultValue={initialActivity?.time || "18:00"} required /></label>
        </div>
        <label><span>{t.address}</span><input name="address" defaultValue={initialActivity?.address || selectedCity.name[language]} required /></label>
        <label><span>{t.locationUrl}</span><input name="locationUrl" type="url" defaultValue={initialActivity?.locationUrl} placeholder={t.locationPlaceholder} /></label>
        <div className="form-row">
          <label><span>{t.price}</span><input name="price" type="number" min="0" defaultValue={initialActivity?.price || 0} required /></label>
          <label><span>{t.capacity}</span><input name="capacity" type="number" min="2" max="100" defaultValue={initialActivity?.capacity || 8} required /></label>
        </div>
        <fieldset>
          <legend>{t.visibility}</legend>
          <div className="segmented">
            <label><input name="visibility" type="radio" value="public" defaultChecked={!initialActivity || initialActivity.visibility === "public"} /><span>{t.public}</span></label>
            <label><input name="visibility" type="radio" value="private" defaultChecked={initialActivity?.visibility === "private"} /><span>{t.private}</span></label>
            <label><input name="visibility" type="radio" value="invite" defaultChecked={initialActivity?.visibility === "invite"} /><span>{t.invite}</span></label>
          </div>
        </fieldset>
        {formError && <div className="form-error">{formError}</div>}
        <button className="publish-button" type="submit" disabled={submitting}>{initialActivity ? <Pencil size={20} /> : <Sparkles size={20} />}{submitting ? "…" : initialActivity ? t.save : t.publish}</button>
      </form>
    </section>
  );
}

function ProfileView({ language }: { language: Language }) {
  const { activities, joinedIds } = useAppStore();
  const t = getTranslation(language);
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const name = [tgUser?.first_name, tgUser?.last_name].filter(Boolean).join(" ") || t.guestName;
  const myEvents = activities.filter((item) => joinedIds.includes(item.id));

  return (
    <section className="page-section profile-page">
      <div className="profile-head">
        <div className="avatar">{name.slice(0, 2).toUpperCase()}</div>
        <div><h1>{name}</h1><p>@{tgUser?.username || "go_irl_guest"}</p></div>
      </div>
      <div className="rli-panel">
        <div className="rli-top"><span>{t.rli}</span><ShieldCheck size={22} /></div>
        <strong>284</strong>
        <p>12 {t.confirmed}</p>
        <div className="rli-progress"><span /></div>
        <small>{t.explorer} · 16 / 20</small>
      </div>
      <SectionHeader title={t.lifeMap} />
      <div className="life-grid">
        <Metric icon={<CalendarDays />} value={String(12 + myEvents.length)} label={t.events} />
        <Metric icon={<UsersRound />} value="27" label={t.people} />
        <Metric icon={<Zap />} value="6" label={t.activeWeeks} />
        <Metric icon={<Star />} value="4" label={t.organized} />
      </div>
      <SectionHeader title={t.achievements} />
      <div className="achievements">
        <div><Compass /><span>{t.explorer}</span></div>
        <div><UserRoundCheck /><span>{t.social}</span></div>
        <div className="locked"><Star /><span>{t.organizerLevel}</span></div>
        <div className="locked"><Sparkles /><span>{t.legend}</span></div>
      </div>
      <button className="referral-button" type="button"><Ticket /><span><strong>{t.referral}</strong><small>{t.referralHint}</small></span><ChevronRight /></button>
    </section>
  );
}

function ActivitySection({ title, activities, language, onOpen, onJoin, icon, urgent = false }: { title: string; activities: Activity[]; language: Language; onOpen: (activity: Activity) => void; onJoin: (activity: Activity) => void; icon?: React.ReactNode; urgent?: boolean }) {
  if (!activities.length) return null;
  return (
    <section className={urgent ? "activity-section urgent-section" : "activity-section"}>
      <SectionHeader title={title} icon={icon} />
      <div className="activity-stack">{activities.map((activity) => <ActivityCard key={activity.id} activity={activity} language={language} onOpen={onOpen} onJoin={onJoin} />)}</div>
    </section>
  );
}

function ActivityCard({ activity, language, onOpen, onJoin }: { activity: Activity; language: Language; onOpen: (activity: Activity) => void; onJoin: (activity: Activity) => void }) {
  const { joinedIds, waitingIds, pendingIds } = useAppStore();
  const t = getTranslation(language);
  const category = categories.find((item) => item.id === activity.categoryId)!;
  const free = activity.capacity - activity.participants;
  const joined = joinedIds.includes(activity.id);
  const waiting = waitingIds.includes(activity.id);
  const pending = pendingIds.includes(activity.id);
  const isOrganizer = activity.organizerKey === getUserKey();
  const full = activity.participants >= activity.capacity;
  const action = isOrganizer
    ? t.open
    : pending
      ? t.requested
      : joined
        ? t.joined
        : waiting
          ? t.waiting
          : activity.visibility === "private"
            ? t.request
            : full
              ? t.wait
              : t.join;

  return (
    <article className="activity-card">
      <button className="activity-card-main" onClick={() => onOpen(activity)} type="button">
        <div className={`category-icon category-${activity.categoryId}`}>{category.icon}</div>
        <div className="activity-copy">
          <div className="activity-label">{category.name[language]}</div>
          <h3>{activity.activity[language]}</h3>
          <p>{activity.title[language]}</p>
        </div>
        <ChevronRight className="card-arrow" size={18} />
      </button>

      <div className="activity-card-details">
        <div><CalendarDays /><span>{compactDateLabel(activity.date, language)}</span></div>
        <div><Clock3 /><span>{activity.time}</span></div>
        <div><MapPin /><span>{activity.address}</span></div>
        <div><UsersRound /><span>{activity.participants} / {activity.capacity}</span></div>
        <div><Ticket /><span>{activity.price ? `${activity.price} Kč` : t.free}</span></div>
        <div><Star /><span>{t.organizerRli}</span></div>
      </div>

      <div className="activity-card-footer">
        <span className={free <= 1 ? "spots urgent" : "spots"}>
          <UsersRound />{free > 0 ? `${free} ${t.left}` : t.full}
        </span>
        <button className={joined || waiting || pending ? "card-join secondary" : "card-join"} onClick={() => isOrganizer ? onOpen(activity) : onJoin(activity)} type="button">
          {action}
        </button>
      </div>
    </article>
  );
}

function ActivitySheet({ activity, language, onClose, onJoin, onShare, onEdit }: { activity: Activity; language: Language; onClose: () => void; onJoin: (activity: Activity) => void; onShare: (activity: Activity) => void; onEdit: (activity: Activity) => void }) {
  const { joinedIds, waitingIds, pendingIds, reviewRequest } = useAppStore();
  const [membersOpen, setMembersOpen] = useState(false);
  const t = getTranslation(language);
  const category = categories.find((item) => item.id === activity.categoryId)!;
  const isOrganizer = activity.organizerKey === getUserKey();
  const joined = joinedIds.includes(activity.id);
  const waiting = waitingIds.includes(activity.id);
  const pending = pendingIds.includes(activity.id);
  const full = activity.participants >= activity.capacity;
  const action = isOrganizer
    ? t.edit
    : pending
      ? t.cancelRequest
      : joined || waiting
        ? t.leave
        : activity.visibility === "private"
          ? t.request
          : full
            ? t.wait
            : t.join;
  const joinedMembers = activity.members.filter((member) => member.status === "joined");
  const waitingMembers = activity.members.filter((member) => member.status === "waiting");
  const pendingMembers = activity.members.filter((member) => member.status === "pending");

  const handleReview = async (memberKey: string, approved: boolean) => {
    await reviewRequest(activity.id, memberKey, approved);
  };

  return (
    <div className="sheet-backdrop" onMouseDown={onClose}>
      <article className="activity-sheet" onMouseDown={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <button className="sheet-close" onClick={onClose} type="button" aria-label="Close"><X /></button>
        <div className={`sheet-symbol category-${activity.categoryId}`}>{category.icon}</div>
        <div className="sheet-label">{category.name[language]} · {activity.activity[language]}</div>
        <h2>{activity.title[language]}</h2>
        <p className="sheet-description">{activity.description[language]}</p>
        <div className="detail-list">
          <div><CalendarDays /><span>{dateLabel(activity.date, language)}</span><strong>{activity.time}</strong></div>
          <div><MapPin /><span>{t.address}</span>{activity.locationUrl ? <a href={activity.locationUrl} target="_blank" rel="noreferrer">{activity.address}</a> : <strong>{activity.address}</strong>}</div>
          <div><Ticket /><span>{t.price}</span><strong>{activity.price ? `${activity.price} Kč` : t.free}</strong></div>
          <div><CircleUserRound /><span>{t.organizer}</span><strong>{activity.organizer}</strong></div>
          <div><ShieldCheck /><span>{t.visibility}</span><strong>{activity.visibility === "public" ? t.public : activity.visibility === "private" ? t.private : t.invite}</strong></div>
          <button className="detail-members-toggle" onClick={() => setMembersOpen((open) => !open)} type="button">
            <UsersRound />
            <span>{t.participants}</span>
            <strong>{activity.participants} / {activity.capacity}</strong>
            <ChevronRight className={membersOpen ? "open" : ""} />
          </button>
        </div>
        {membersOpen && (
          <div className="members-section">
            <div className="members-list">
              {joinedMembers.map((member) => (
                <div className="member-row" key={member.userKey}>
                  <span className="member-avatar">{member.name.slice(0, 2).toUpperCase()}</span>
                  <strong>{member.name}</strong>
                  <UserRoundCheck />
                </div>
              ))}
              {!joinedMembers.length && <p>{t.noParticipants}</p>}
              {waitingMembers.length > 0 && <div className="waiting-heading">{t.waitingList} · {waitingMembers.length}</div>}
              {waitingMembers.map((member) => (
                <div className="member-row waiting-member" key={member.userKey}>
                  <span className="member-avatar">{member.name.slice(0, 2).toUpperCase()}</span>
                  <strong>{member.name}</strong>
                  <Clock3 />
                </div>
              ))}
              {isOrganizer && pendingMembers.length > 0 && <div className="pending-heading">{t.requests} · {pendingMembers.length}</div>}
              {isOrganizer && pendingMembers.map((member) => (
                <div className="member-row pending-member" key={member.userKey}>
                  <span className="member-avatar">{member.name.slice(0, 2).toUpperCase()}</span>
                  <strong>{member.name}</strong>
                  <span className="request-actions">
                    <button onClick={() => void handleReview(member.userKey, true)} type="button" aria-label={t.approve} title={t.approve}><Check /></button>
                    <button onClick={() => void handleReview(member.userKey, false)} type="button" aria-label={t.reject} title={t.reject}><X /></button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {!isOrganizer && (joined || waiting || pending) && <div className="status-banner">{joined ? <UserRoundCheck /> : <Clock3 />}<span>{joined ? t.joined : waiting ? t.waiting : t.requested}</span></div>}
        <div className="sheet-actions">
          <button className="main-action" onClick={() => isOrganizer ? onEdit(activity) : onJoin(activity)} type="button">{isOrganizer && <Pencil size={18} />}{action}</button>
          <button className="square-action" onClick={() => void onShare(activity)} type="button" aria-label={t.share} title={t.share}><Share2 /></button>
          <button className="square-action muted" type="button" aria-label={t.report} title={t.report}><Flag /></button>
        </div>
      </article>
    </div>
  );
}

function BottomNav({ view, setView, language }: { view: AppView; setView: (view: AppView) => void; language: Language }) {
  const t = getTranslation(language);
  const items: Array<{ id: AppView; label: string; icon: React.ReactNode }> = [
    { id: "home", label: t.navHome, icon: <Home /> },
    { id: "explore", label: t.navExplore, icon: <Compass /> },
    { id: "create", label: t.navCreate, icon: <Plus /> },
    { id: "profile", label: t.navProfile, icon: <CircleUserRound /> },
  ];
  return <nav className="bottom-nav">{items.map((item) => <button className={view === item.id ? "active" : ""} key={item.id} onClick={() => setView(item.id)} type="button">{item.icon}<span>{item.label}</span></button>)}</nav>;
}

function SectionHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return <div className="section-title">{icon}<h2>{title}</h2></div>;
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return <div className="metric">{icon}<strong>{value}</strong><span>{label}</span></div>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="empty-state"><Dices /><p>{text}</p></div>;
}

export default App;
