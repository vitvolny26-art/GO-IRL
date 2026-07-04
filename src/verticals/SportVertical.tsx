import { CalendarDays, ChevronRight, CircleUserRound, Flag, MapPin, Pencil, Share2, ShieldCheck, Sparkles, Ticket, Trash2, UsersRound, X } from "lucide-react";
import { getTranslation, localeByLanguage } from "../i18n";
import { useAppStore } from "../store";
import { getUserKey } from "../supabase";
import type { Activity, Language, SportMetadata } from "../types";
import { getSportMetadata, sportEnvironmentLabel, sportEnvironments, sportFormatLabel, sportFormats, sportLevelLabel, sportLevels } from "./sport";

type SportCardProps = {
  activity: Activity;
  language: Language;
  onOpen: (activity: Activity) => void;
  onJoin: (activity: Activity) => void;
};

type SportSheetProps = {
  activity: Activity;
  language: Language;
  cityName: string;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onJoin: (activity: Activity) => void;
  onShare: (activity: Activity) => void;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
  onCloseMiniApp: () => void;
};

export function SportCreateFields({ language, initialSport }: { language: Language; initialSport: SportMetadata }) {
  const t = getTranslation(language);
  return (
    <div className="sport-create-panel">
      <div className="sport-panel-title">🏆 {t.sportVertical}</div>
      <div className="form-row">
        <label><span>{t.sportLevel}</span><select name="sportLevel" defaultValue={initialSport.level || "intermediate"}>{sportLevels.map((level) => <option key={level.id} value={level.id}>{level.label[language]}</option>)}</select></label>
        <label><span>{t.sportFormat}</span><select name="sportFormat" defaultValue={initialSport.format || "casual"}>{sportFormats.map((format) => <option key={format.id} value={format.id}>{format.label[language]}</option>)}</select></label>
      </div>
      <div className="form-row">
        <label><span>{t.sportEnvironment}</span><select name="sportEnvironment" defaultValue={initialSport.environment || "outdoor"}>{sportEnvironments.map((environment) => <option key={environment.id} value={environment.id}>{environment.label[language]}</option>)}</select></label>
        <label><span>{t.sportDuration}</span><input name="sportDuration" type="number" min="15" max="480" step="15" defaultValue={initialSport.durationMinutes || 90} /></label>
      </div>
      <label className="sport-check"><input name="sportEquipmentNeeded" type="checkbox" defaultChecked={Boolean(initialSport.equipmentNeeded)} /><span>{t.sportEquipmentNeeded}</span></label>
      <label><span>{t.sportEquipment}</span><input name="sportEquipment" defaultValue={initialSport.equipment} placeholder={t.sportEquipmentPlaceholder} /></label>
      <label><span>{t.sportBring}</span><input name="sportBring" defaultValue={initialSport.bring} placeholder={t.sportBringPlaceholder} /></label>
      <label><span>{t.sportRequirements}</span><input name="sportRequirements" defaultValue={initialSport.requirements} placeholder={t.sportRequirementsPlaceholder} /></label>
      <label><span>{t.sportOrganizerTips}</span><textarea name="sportOrganizerTips" rows={3} defaultValue={initialSport.organizerTips} placeholder={t.sportOrganizerTipsPlaceholder} /></label>
    </div>
  );
}

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

const dateLabel = (date: string, language: Language) =>
  new Intl.DateTimeFormat(localeByLanguage[language], {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));

function SportDetailsSkeleton() {
  return (
    <div className="details-skeleton" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export function SportActivityCard({ activity, language, onOpen, onJoin }: SportCardProps) {
  const { joinedIds, pendingIds } = useAppStore();
  const t = getTranslation(language);
  const meta = getSportMetadata(activity);
  const free = Math.max(activity.capacity - activity.participants, 0);
  const joined = joinedIds.includes(activity.id);
  const pending = pendingIds.includes(activity.id);
  const isOrganizer = activity.organizerKey === getUserKey();
  const full = activity.participants >= activity.capacity;
  const action = isOrganizer ? t.open : pending ? t.requested : joined ? t.joined : full ? t.eventFull : activity.visibility === "invite" ? t.request : t.join;

  return (
    <article className="sport-card">
      <button className="sport-card-main" onClick={() => onOpen(activity)} type="button">
        <div className="sport-card-symbol">{activity.activity[language].split(" ")[0] || "🏆"}</div>
        <div>
          <div className="sport-eyebrow">🏆 {sportLevelLabel(meta.level, language)} · {sportEnvironmentLabel(meta.environment, language)}</div>
          <h3>{activity.activity[language]}</h3>
          <p>{activity.title[language]}</p>
        </div>
        <ChevronRight className="card-arrow" size={18} />
      </button>
      <div className="sport-chip-row">
        <span>⚽ {meta.sportType || activity.activity[language]}</span>
        <span>👥 {activity.participants} / {activity.capacity}</span>
        <span>⏱ {meta.durationMinutes || 90} {t.minutesShort}</span>
      </div>
      <div className="activity-card-details sport-details-grid">
        <div><MapPin /><span>{activity.address}</span></div>
        <div><CalendarDays /><span>{compactDateLabel(activity.date, language)}</span></div>
        <div><Ticket /><span>{activity.price ? `${activity.price} Kč` : t.free}</span></div>
        <div><ShieldCheck /><span>{sportFormatLabel(meta.format, language)}</span></div>
      </div>
      <div className="activity-card-footer">
        <span className={free <= 1 ? "spots urgent" : "spots"}><UsersRound />{free > 0 ? `${free} ${t.left}` : t.full}</span>
        <span className="card-status">{t.sportSkillMatch}</span>
        <button className={joined || pending ? "card-join secondary" : "card-join"} onClick={() => isOrganizer ? onOpen(activity) : onJoin(activity)} type="button" disabled={!isOrganizer && full && !joined && !pending}>{action}</button>
      </div>
    </article>
  );
}

export function SportActivitySheet({
  activity,
  language,
  cityName,
  loading,
  error,
  onClose,
  onJoin,
  onShare,
  onEdit,
  onDelete,
  onCloseMiniApp,
}: SportSheetProps) {
  const { joinedIds, pendingIds, userRole } = useAppStore();
  const t = getTranslation(language);
  const meta = getSportMetadata(activity);
  const isOrganizer = activity.organizerKey === getUserKey();
  const canDelete = isOrganizer || userRole === "admin";
  const joined = joinedIds.includes(activity.id);
  const pending = pendingIds.includes(activity.id);
  const full = activity.participants >= activity.capacity;
  const freeSpots = Math.max(activity.capacity - activity.participants, 0);
  const action = isOrganizer ? t.edit : pending ? t.cancelRequest : joined ? t.leave : full ? t.eventFull : activity.visibility === "invite" ? t.request : t.join;

  return (
    <div className="sheet-backdrop" onMouseDown={onClose}>
      <article className="activity-sheet sport-sheet" onMouseDown={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <button className="sheet-close" onClick={onClose} type="button" aria-label={t.close}><X /></button>
        {loading && <SportDetailsSkeleton />}
        {error && <div className="details-error"><ShieldCheck /><span>{t.databaseError}</span></div>}
        <div className="sport-sheet-hero">
          <div className="sport-card-symbol large">{activity.activity[language].split(" ")[0] || "🏆"}</div>
          <div>
            <div className="sport-eyebrow">🏆 {sportLevelLabel(meta.level, language)} · {sportFormatLabel(meta.format, language)}</div>
            <h2>{activity.title[language]}</h2>
            <p>{activity.description[language]}</p>
          </div>
        </div>
        <div className="sport-chip-row sport-sheet-chips">
          <span>⚽ {meta.sportType || activity.activity[language]}</span>
          <span>🌤 {sportEnvironmentLabel(meta.environment, language)}</span>
          <span>⏱ {meta.durationMinutes || 90} {t.minutesShort}</span>
        </div>
        <div className="detail-list sport-detail-list">
          <div><Sparkles /><span>{t.sportLevel}</span><strong>{sportLevelLabel(meta.level, language)}</strong></div>
          <div><ShieldCheck /><span>{t.sportFormat}</span><strong>{sportFormatLabel(meta.format, language)}</strong></div>
          <div><MapPin /><span>{t.city}</span><strong>{cityName}</strong></div>
          <div><MapPin /><span>{t.address}</span>{activity.locationUrl ? <a href={activity.locationUrl} target="_blank" rel="noreferrer">{activity.address}</a> : <strong>{activity.address}</strong>}</div>
          <div><CalendarDays /><span>{dateLabel(activity.date, language)}</span><strong>{activity.time}</strong></div>
          <div><UsersRound /><span>{t.freeSpots}</span><strong>{freeSpots} / {activity.capacity}</strong></div>
          <div><Ticket /><span>{t.price}</span><strong>{activity.price ? `${activity.price} Kč` : t.free}</strong></div>
          <div><ShieldCheck /><span>{t.sportEquipmentNeeded}</span><strong>{meta.equipmentNeeded ? t.yes : t.no}</strong></div>
          {meta.equipment && <div><Sparkles /><span>{t.sportEquipment}</span><strong>{meta.equipment}</strong></div>}
          {meta.bring && <div><Sparkles /><span>{t.sportBring}</span><strong>{meta.bring}</strong></div>}
          {meta.requirements && <div><ShieldCheck /><span>{t.sportRequirements}</span><strong>{meta.requirements}</strong></div>}
          {meta.organizerTips && <div><CircleUserRound /><span>{t.sportOrganizerTips}</span><strong>{meta.organizerTips}</strong></div>}
          <div><Sparkles /><span>{t.weatherHint}</span><strong>{t.weatherPlaceholder}</strong></div>
        </div>
        <div className="sheet-actions">
          <button className="main-action" onClick={() => isOrganizer ? onEdit(activity) : onJoin(activity)} type="button" disabled={!isOrganizer && full && !joined && !pending}>{isOrganizer && <Pencil size={18} />}{action}</button>
          <button className="square-action" onClick={() => void onShare(activity)} type="button" aria-label={t.share} title={t.share}><Share2 /></button>
          <button className="square-action muted" type="button" aria-label={t.report} title={t.report}><Flag /></button>
        </div>
        {canDelete && <button className="danger-action" onClick={() => onDelete(activity)} type="button"><Trash2 size={18} />{t.delete}</button>}
        <button className="telegram-close-button compact" onClick={onCloseMiniApp} type="button">{t.backToTelegram}</button>
      </article>
    </div>
  );
}
