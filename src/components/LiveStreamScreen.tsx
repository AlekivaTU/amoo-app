import React, { useState } from 'react';
import './LiveStreamScreen.css';

interface Stream {
  id: string;
  username: string;
  title: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
}

const mockStreams: Stream[] = [
  {
    id: '1',
    username: 'Анна',
    title: 'Утренняя йога и разговоры',
    viewers: 156,
    thumbnail: 'https://picsum.photos/400/225?random=1',
    isLive: true,
  },
  {
    id: '2',
    username: 'Михаил',
    title: 'Готовим вместе: итальянская кухня',
    viewers: 89,
    thumbnail: 'https://picsum.photos/400/225?random=2',
    isLive: true,
  },
  {
    id: '3',
    username: 'Елена',
    title: 'Путешествие по Санкт-Петербургу',
    viewers: 234,
    thumbnail: 'https://picsum.photos/400/225?random=3',
    isLive: true,
  },
];

const LiveStreamScreen: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>(mockStreams);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamTitle, setStreamTitle] = useState('');

  const handleStartStream = () => {
    if (!streamTitle.trim()) return;

    const newStream: Stream = {
      id: String(Date.now()),
      username: 'Вы',
      title: streamTitle,
      viewers: 0,
      thumbnail: 'https://picsum.photos/400/225?random=4',
      isLive: true,
    };

    setStreams([newStream, ...streams]);
    setIsStreaming(true);
    setSelectedStream(newStream);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
    setStreamTitle('');
    setSelectedStream(null);
    setStreams(streams.filter(stream => stream.username !== 'Вы'));
  };

  const handleStreamSelect = (stream: Stream) => {
    setSelectedStream(stream);
  };

  return (
    <div className="live-stream-screen">
      <div className="streams-list">
        <div className="streams-header">
          <h2>Прямые трансляции</h2>
          {!isStreaming && (
            <div className="start-stream-form">
              <input
                type="text"
                placeholder="Название трансляции"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
              />
              <button onClick={handleStartStream}>Начать трансляцию</button>
            </div>
          )}
        </div>
        <div className="streams-grid">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className={`stream-card ${selectedStream?.id === stream.id ? 'active' : ''}`}
              onClick={() => handleStreamSelect(stream)}
            >
              <div className="stream-thumbnail">
                <img src={stream.thumbnail} alt={stream.title} />
                {stream.isLive && <span className="live-badge">LIVE</span>}
                <span className="viewers-count">{stream.viewers} зрителей</span>
              </div>
              <div className="stream-info">
                <h3>{stream.title}</h3>
                <p>{stream.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stream-view">
        {selectedStream ? (
          <div className="active-stream">
            <div className="stream-player">
              <img src={selectedStream.thumbnail} alt={selectedStream.title} />
              {isStreaming && selectedStream.username === 'Вы' && (
                <button className="stop-stream-button" onClick={handleStopStream}>
                  Завершить трансляцию
                </button>
              )}
            </div>
            <div className="stream-details">
              <h2>{selectedStream.title}</h2>
              <p className="streamer-name">{selectedStream.username}</p>
              <p className="viewers">{selectedStream.viewers} зрителей</p>
            </div>
            <div className="chat-section">
              <div className="chat-messages">
                <p className="chat-message">
                  <span className="chat-username">Александр:</span> Привет всем! 👋
                </p>
                <p className="chat-message">
                  <span className="chat-username">Мария:</span> Отличная трансляция!
                </p>
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Написать сообщение..." />
                <button>Отправить</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-stream-selected">
            <h3>Выберите трансляцию для просмотра</h3>
            <p>или начните свою собственную</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveStreamScreen; 