import React, { useState, useEffect } from 'react';
import { streamService, Stream, StreamSettings } from '../services/streamService';
import { useAuth } from '../contexts/AuthContext';
import './StreamsScreen.css';

const StreamsScreen: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [currentStream, setCurrentStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isStartingStream, setIsStartingStream] = useState(false);
  const [streamSettings, setStreamSettings] = useState<StreamSettings>({
    title: '',
    description: '',
    isPublic: true,
    allowChat: true,
  });
  const { user } = useAuth();

  useEffect(() => {
    loadStreams();
  }, []);

  const loadStreams = async () => {
    try {
      setLoading(true);
      const streamsData = await streamService.getStreams();
      setStreams(streamsData);
    } catch (err) {
      setError('Ошибка при загрузке стримов');
    } finally {
      setLoading(false);
    }
  };

  const handleStartStream = async () => {
    try {
      setIsStartingStream(true);
      const stream = await streamService.startStream(streamSettings);
      setCurrentStream(stream);
      loadStreams();
    } catch (err) {
      setError('Ошибка при запуске стрима');
    } finally {
      setIsStartingStream(false);
    }
  };

  const handleEndStream = async () => {
    if (!currentStream) return;

    try {
      await streamService.endStream(currentStream.id);
      setCurrentStream(null);
      loadStreams();
    } catch (err) {
      setError('Ошибка при завершении стрима');
    }
  };

  const handleWatchStream = async (streamId: string) => {
    try {
      const stream = await streamService.getStream(streamId);
      setCurrentStream(stream);
    } catch (err) {
      setError('Ошибка при загрузке стрима');
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="streams-screen">
      {currentStream ? (
        <div className="current-stream">
          <div className="stream-header">
            <h2>{currentStream.title}</h2>
            {currentStream.userId === user?.id && (
              <button onClick={handleEndStream} className="end-stream-button">
                Завершить стрим
              </button>
            )}
          </div>
          <div className="stream-player">
            {/* Здесь будет плеер для стрима */}
            <div className="stream-placeholder">
              Стрим {currentStream.title}
            </div>
          </div>
          <div className="stream-info">
            <p>{currentStream.description}</p>
            <div className="stream-stats">
              <span>👥 {currentStream.viewerCount}</span>
              <span>🕒 {new Date(currentStream.startedAt!).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="streams-header">
            <h2>Стримы</h2>
            {!isStartingStream && (
              <button onClick={() => setIsStartingStream(true)} className="start-stream-button">
                Начать стрим
              </button>
            )}
          </div>

          {isStartingStream ? (
            <div className="stream-settings">
              <h3>Настройки стрима</h3>
              <div className="form-group">
                <label>Название</label>
                <input
                  type="text"
                  value={streamSettings.title}
                  onChange={(e) =>
                    setStreamSettings({ ...streamSettings, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Описание</label>
                <textarea
                  value={streamSettings.description}
                  onChange={(e) =>
                    setStreamSettings({ ...streamSettings, description: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={streamSettings.isPublic}
                    onChange={(e) =>
                      setStreamSettings({ ...streamSettings, isPublic: e.target.checked })
                    }
                  />
                  Публичный стрим
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={streamSettings.allowChat}
                    onChange={(e) =>
                      setStreamSettings({ ...streamSettings, allowChat: e.target.checked })
                    }
                  />
                  Разрешить чат
                </label>
              </div>
              <div className="stream-actions">
                <button onClick={handleStartStream} className="start-button">
                  Начать
                </button>
                <button onClick={() => setIsStartingStream(false)} className="cancel-button">
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div className="streams-grid">
              {streams.map((stream) => (
                <div key={stream.id} className="stream-card">
                  <img src={stream.thumbnailUrl} alt={stream.title} className="stream-thumbnail" />
                  <div className="stream-card-info">
                    <h3>{stream.title}</h3>
                    <p>{stream.description}</p>
                    <div className="stream-card-stats">
                      <span>👥 {stream.viewerCount}</span>
                      <span>🕒 {new Date(stream.startedAt!).toLocaleTimeString()}</span>
                    </div>
                    <button
                      onClick={() => handleWatchStream(stream.id)}
                      className="watch-stream-button"
                    >
                      Смотреть
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StreamsScreen; 