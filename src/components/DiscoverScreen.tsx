import React, { useState, useRef, useEffect } from 'react';
import './DiscoverScreen.css';

interface UserProfile {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  images: string[];
  interests: string[];
  distance: number;
}

interface Filters {
  ageRange: [number, number];
  maxDistance: number;
  interests: string[];
}

const mockProfiles: UserProfile[] = [
  {
    id: 1,
    name: "Анна",
    age: 25,
    location: "Москва",
    bio: "Люблю путешествия, фотографию и хорошую музыку",
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
    ],
    interests: ["Путешествия", "Фотография", "Музыка", "Искусство"],
    distance: 3
  },
  {
    id: 2,
    name: "Михаил",
    age: 28,
    location: "Санкт-Петербург",
    bio: "Программист, фанат спорта и активного отдыха",
    images: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    ],
    interests: ["Спорт", "Технологии", "Путешествия"],
    distance: 5
  },
  {
    id: 3,
    name: "Елена",
    age: 24,
    location: "Москва",
    bio: "Художник, люблю искусство и творчество",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9"
    ],
    interests: ["Искусство", "Музыка", "Фотография"],
    distance: 2
  }
];

const allInterests = Array.from(
  new Set(mockProfiles.flatMap(profile => profile.interests))
);

const DiscoverScreen: React.FC = () => {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    ageRange: [18, 35],
    maxDistance: 10,
    interests: []
  });
  const [history, setHistory] = useState<number[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles);
  const cardRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    const filtered = mockProfiles.filter(profile => {
      const ageMatch = profile.age >= filters.ageRange[0] && profile.age <= filters.ageRange[1];
      const distanceMatch = profile.distance <= filters.maxDistance;
      const interestsMatch = filters.interests.length === 0 || 
        filters.interests.some(interest => profile.interests.includes(interest));
      return ageMatch && distanceMatch && interestsMatch;
    });
    setFilteredProfiles(filtered);
    setCurrentProfile(0);
  }, [filters]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleDragEnd = () => {
    if (dragOffset.x > 100) {
      handleLike();
    } else if (dragOffset.x < -100) {
      handleSkip();
    } else if (dragOffset.y < -100) {
      handleSuperLike();
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleLike = () => {
    setAnimation('swipe-right');
    setTimeout(() => {
      if (currentProfile < filteredProfiles.length - 1) {
        setHistory([...history, currentProfile]);
        setCurrentProfile(prev => prev + 1);
        setCurrentImageIndex(0);
      }
      setDragOffset({ x: 0, y: 0 });
      setAnimation('');
    }, 300);
  };

  const handleSkip = () => {
    setAnimation('swipe-left');
    setTimeout(() => {
      if (currentProfile < filteredProfiles.length - 1) {
        setHistory([...history, currentProfile]);
        setCurrentProfile(prev => prev + 1);
        setCurrentImageIndex(0);
      }
      setDragOffset({ x: 0, y: 0 });
      setAnimation('');
    }, 300);
  };

  const handleSuperLike = () => {
    setAnimation('super-like');
    setTimeout(() => {
      if (currentProfile < filteredProfiles.length - 1) {
        setHistory([...history, currentProfile]);
        setCurrentProfile(prev => prev + 1);
        setCurrentImageIndex(0);
      }
      setDragOffset({ x: 0, y: 0 });
      setAnimation('');
    }, 300);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastProfile = history[history.length - 1];
      setCurrentProfile(lastProfile);
      setHistory(history.slice(0, -1));
      setCurrentImageIndex(0);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width / 2) {
      setCurrentImageIndex(prev => 
        prev < filteredProfiles[currentProfile].images.length - 1 ? prev + 1 : prev
      );
    } else {
      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : prev);
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleInterestToggle = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const profile = filteredProfiles[currentProfile];
  const commonInterests = profile?.interests.filter(interest => 
    filters.interests.includes(interest)
  ) || [];

  if (!profile) {
    return (
      <div className="discover-screen">
        <div className="no-profiles">
          <h2>Профили не найдены</h2>
          <p>Попробуйте изменить параметры поиска</p>
          <button onClick={toggleFilters}>Настроить фильтры</button>
        </div>
      </div>
    );
  }

  return (
    <div className="discover-screen">
      <button className="filters-button" onClick={toggleFilters}>
        <span className="filter-icon">⚙️</span>
        Фильтры
      </button>

      {showFilters && (
        <div className="filters-panel">
          <h3>Настройки поиска</h3>
          <div className="filter-section">
            <label>Возраст: {filters.ageRange[0]} - {filters.ageRange[1]}</label>
            <div className="range-inputs">
              <input
                type="range"
                min="18"
                max="50"
                value={filters.ageRange[0]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  ageRange: [parseInt(e.target.value), prev.ageRange[1]]
                }))}
              />
              <input
                type="range"
                min="18"
                max="50"
                value={filters.ageRange[1]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  ageRange: [prev.ageRange[0], parseInt(e.target.value)]
                }))}
              />
            </div>
          </div>
          <div className="filter-section">
            <label>Максимальное расстояние: {filters.maxDistance} км</label>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.maxDistance}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                maxDistance: parseInt(e.target.value)
              }))}
            />
          </div>
          <div className="filter-section">
            <label>Интересы:</label>
            <div className="interests-grid">
              {allInterests.map(interest => (
                <button
                  key={interest}
                  className={`interest-tag ${filters.interests.includes(interest) ? 'active' : ''}`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div 
        ref={cardRef}
        className={`card ${animation}`}
        style={{
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div 
          className="card-image" 
          style={{ backgroundImage: `url(${profile.images[currentImageIndex]})` }}
          onClick={handleImageClick}
        >
          <div className="image-counter">
            {profile.images.map((_, index) => (
              <div
                key={index}
                className={`image-dot ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
          <div className="card-gradient" />
        </div>
        <div className="card-content">
          <h2>{profile.name}, {profile.age}</h2>
          <p className="location">
            <span className="location-icon">📍</span>
            {profile.location} • {profile.distance} км
          </p>
          <p className="bio">{profile.bio}</p>
          <div className="interests">
            {profile.interests.map((interest, index) => (
              <span 
                key={index} 
                className={`interest-tag ${commonInterests.includes(interest) ? 'common' : ''}`}
              >
                {interest}
                {commonInterests.includes(interest) && <span className="common-icon">✨</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="action-button skip-button" 
          onClick={handleSkip}
          title="Пропустить"
        >
          ✕
        </button>
        <button 
          className="action-button undo-button" 
          onClick={handleUndo}
          disabled={history.length === 0}
          title="Отменить"
        >
          ↩
        </button>
        <button 
          className="action-button super-like-button" 
          onClick={handleSuperLike}
          title="Super Like"
        >
          ⭐
        </button>
        <button 
          className="action-button like-button" 
          onClick={handleLike}
          title="Лайк"
        >
          ♥
        </button>
      </div>
    </div>
  );
};

export default DiscoverScreen; 