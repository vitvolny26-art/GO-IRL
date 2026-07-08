import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Dumbbell, Star, UserCheck, X } from "lucide-react";
import {
  getCoachStatusLabel,
  getCurrentCoachUserKey,
  getSportCoachRoleLabel,
  isCoachDemoMode,
  isConfirmedCoachStatus,
  loadConfirmedCoachForActivity,
  loadCoachRequestsForActivity,
  requestCoachForActivity,
  sportCoachRoleOptions,
  type CoachAssignment,
} from "../coachFeature";
import type { Activity, CoachRequest, SportCoachRole, UserRole } from "../types";

type CoachRequestPanelProps = {
  activity: Activity;
  userRole: UserRole;
};

const isActiveCoachRequest = (request?: CoachRequest) =>
  Boolean(request && request.status !== "cancelled" && request.status !== "rejected");

const initials = (name?: string) =>
  String(name || "SC")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "SC";

export function CoachRequestPanel({ activity }: CoachRequestPanelProps) {
  const [requests, setRequests] = useState<CoachRequest[]>([]);
  const [assignment, setAssignment] = useState<CoachAssignment | null>(null);
  const [currentUserKey, setCurrentUserKey] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SportCoachRole>("sport_coach");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const isOrganizer = activity.organizerKey === currentUserKey;
  const canRequestCoach = isOrganizer;

  const organizerRequest = useMemo(
    () => requests.find((request) => request.requestType === "organizer_request" && request.status !== "cancelled"),
    [requests],
  );

  const participantInterest = useMemo(
    () => requests.find((request) => request.requestType === "participant_interest" && request.requesterUserKey === currentUserKey && request.status !== "cancelled"),
    [requests, currentUserKey],
  );

  const confirmedRequest = useMemo(
    () => requests.find((request) => request.requestType === "organizer_request" && isConfirmedCoachStatus(request.status)),
    [requests],
  );

  const activeRequest = isActiveCoachRequest(organizerRequest);
  const shouldRender = canRequestCoach || Boolean(activeRequest) || Boolean(assignment) || Boolean(participantInterest);

  const reload = async () => {
    const [userKey, coachRequests, confirmedCoach] = await Promise.all([
      getCurrentCoachUserKey(),
      loadCoachRequestsForActivity(activity.id),
      loadConfirmedCoachForActivity(activity.id),
    ]);

    setCurrentUserKey(userKey);
    setRequests(coachRequests);
    setAssignment(confirmedCoach);

    const request = coachRequests.find((coachRequest) => coachRequest.requestType === "organizer_request" && coachRequest.status !== "cancelled");
    if (request?.coachRole) setSelectedRole(request.coachRole);
    if (request?.message) setNote(request.message);
  };

  useEffect(() => {
    void reload().catch(() => {
      setMessage("Не удалось загрузить тренера");
    });
  }, [activity.id]);

  if (!shouldRender) return null;

  const handleRequest = async () => {
    if (!canRequestCoach) return;

    setLoading(true);
    setMessage(null);

    try {
      await requestCoachForActivity(activity, "organizer_request", selectedRole, note);
      await reload();
      setSheetOpen(false);
      setMessage(isCoachDemoMode() ? "Изменения сохранены (Демо-режим)" : "Тренер запрошен");
    } catch {
      setMessage("Не удалось отправить запрос");
    } finally {
      setLoading(false);
    }
  };

  const coach = assignment?.coach;
  const requestToShow = assignment?.request || confirmedRequest || organizerRequest;
  const roleLabel = getSportCoachRoleLabel(requestToShow?.coachRole || selectedRole);
  const requestDisabled = loading || activeRequest;

  return (
    <section className="coach-panel" aria-label="Sport Coach">
      <div className="coach-panel-header">
        <div className="coach-panel-icon">
          <Dumbbell size={18} aria-hidden="true" />
        </div>
        <div>
          <h3>{assignment ? "Тренер события" : "Sport Coach"}</h3>
          <p>Тренер помогает новичкам, объясняет правила, проводит разминку и снижает страх прийти одному.</p>
        </div>
      </div>

      {requestToShow ? (
        <div className="coach-panel-status">
          {isConfirmedCoachStatus(requestToShow.status) ? <CheckCircle2 size={18} aria-hidden="true" /> : <UserCheck size={18} aria-hidden="true" />}
          <span>{getCoachStatusLabel(requestToShow.status)} · {getSportCoachRoleLabel(requestToShow.coachRole)}</span>
        </div>
      ) : null}

      {coach ? (
        <article className="coach-event-card">
          <div className="coach-avatar" aria-hidden="true">
            {coach.avatarUrl ? <img src={coach.avatarUrl} alt="" /> : initials(coach.displayName)}
          </div>
          <div>
            <strong>{coach.displayName}</strong>
            <small>{roleLabel} · {coach.city || "Olomouc"}</small>
            {coach.bio ? <p>{coach.bio}</p> : null}
            {coach.ratingCount > 0 ? (
              <span className="coach-rating"><Star size={14} aria-hidden="true" /> {coach.ratingAvg.toFixed(1)} · {coach.ratingCount} отзывов</span>
            ) : null}
          </div>
        </article>
      ) : null}

      {canRequestCoach && !activeRequest ? (
        <button
          type="button"
          className="coach-panel-button"
          onClick={() => setSheetOpen(true)}
          disabled={requestDisabled}
        >
          Нужен тренер
        </button>
      ) : null}

      {participantInterest ? (
        <div className="coach-panel-status">
          <Star size={18} aria-hidden="true" />
          <span>Вы хотите тренера</span>
        </div>
      ) : null}

      {message ? <div className="coach-panel-message">{message}</div> : null}

      {sheetOpen ? (
        <div className="coach-sheet-layer" role="presentation">
          <button className="coach-sheet-scrim" type="button" aria-label="Закрыть" onClick={() => setSheetOpen(false)} />
          <div className="coach-sheet" role="dialog" aria-modal="true" aria-label="Кто нужен?">
            <div className="coach-sheet-head">
              <div>
                <span>Sport Coach MVP</span>
                <h3>Кто нужен?</h3>
              </div>
              <button type="button" onClick={() => setSheetOpen(false)} aria-label="Закрыть">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="coach-role-grid">
              {sportCoachRoleOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={selectedRole === option.id ? "coach-role-option selected" : "coach-role-option"}
                  onClick={() => setSelectedRole(option.id)}
                >
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </button>
              ))}
            </div>

            <label className="coach-note-field">
              <span>Заметка для тренера</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                maxLength={240}
                placeholder="Например: много новичков, нужен мягкий старт и объяснение правил."
              />
            </label>

            <button className="coach-panel-button" type="button" onClick={handleRequest} disabled={loading}>
              {loading ? "Отправляем…" : "Отправить запрос"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
