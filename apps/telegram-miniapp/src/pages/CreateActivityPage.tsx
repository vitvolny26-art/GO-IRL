import { useState, type FormEvent } from 'react';
import { createActivity } from '../services/api';
import '../styles/CreateActivityPage.css';

const ACTIVITY_TYPES = ['sport', 'nature', 'learning', 'creative', 'food', 'social'];

interface CreateActivityPageProps {
  initData: string;
  onSuccess: (activityId: string) => void;
  onBack: () => void;
}

export function CreateActivityPage({ initData, onSuccess, onBack }: CreateActivityPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('sport');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('10');

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(String(pos.coords.latitude.toFixed(6)));
        setLongitude(String(pos.coords.longitude.toFixed(6)));
      },
      () => setError('Could not get your location')
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const max = parseInt(maxParticipants, 10);

    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (isNaN(lat) || isNaN(lng)) {
      setError('Valid latitude and longitude are required');
      return;
    }
    if (!startTime) {
      setError('Start time is required');
      return;
    }
    if (isNaN(max) || max < 2) {
      setError('Max participants must be at least 2');
      return;
    }

    try {
      setLoading(true);
      const activity = await createActivity({
        title: title.trim(),
        description: description.trim() || undefined,
        type,
        latitude: lat,
        longitude: lng,
        startTime: new Date(startTime).toISOString(),
        endTime: endTime ? new Date(endTime).toISOString() : undefined,
        maxParticipants: max,
        initData,
      });
      onSuccess(activity.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-activity-container">
      <header className="create-activity-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1 className="create-activity-title">New Activity</h1>
        <div className="header-spacer" />
      </header>

      <form className="create-activity-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            className="form-input"
            type="text"
            placeholder="Morning football game"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            placeholder="Tell people what to expect…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            maxLength={500}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Type *</label>
          <div className="type-grid">
            {ACTIVITY_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className={`type-btn ${type === t ? 'active' : ''}`}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Location *</label>
          <button type="button" className="location-btn" onClick={handleUseMyLocation}>
            📍 Use my current location
          </button>
          <div className="location-inputs">
            <input
              className="form-input"
              type="number"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              step="0.000001"
            />
            <input
              className="form-input"
              type="number"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              step="0.000001"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Start time *</label>
          <input
            className="form-input"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">End time (optional)</label>
          <input
            className="form-input"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Max participants *</label>
          <input
            className="form-input"
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            min="2"
            max="1000"
          />
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating…' : 'Create Activity'}
          </button>
        </div>
      </form>
    </div>
  );
}
