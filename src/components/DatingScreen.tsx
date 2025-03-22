import React, { useEffect, useState } from 'react';
import { DatingProfile, Match } from '../services/datingService';
import datingService from '../services/datingService';
import ProfilePhotos from './ProfilePhotos';
import ProfileInfo from './ProfileInfo';
import MatchesList from './MatchesList';
import './DatingScreen.css';

const DatingScreen: React.FC = () => {
  const [currentProfile, setCurrentProfile] = useState<DatingProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [profileResponse, matchesResponse] = await Promise.all([
        datingService.getPotentialMatches(),
        datingService.getMatches()
      ]);
      
      if (profileResponse.length > 0) {
        setCurrentProfile(profileResponse[0]);
      }
      setMatches(matchesResponse);
    } catch (err) {
      setError('Произошла ошибка при загрузке данных');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!currentProfile) return;
    
    try {
      await datingService.likeProfile(currentProfile.id);
      loadData(); // Перезагружаем данные после лайка
    } catch (err) {
      setError('Не удалось поставить лайк');
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!currentProfile) return;
    
    try {
      await datingService.dislikeProfile(currentProfile.id);
      loadData(); // Перезагружаем данные после дизлайка
    } catch (err) {
      setError('Не удалось поставить дизлайк');
      console.error(err);
    }
  };

  const handleMatchClick = async (matchId: string) => {
    try {
      await datingService.acceptMatch(matchId);
      loadData(); // Перезагружаем данные после принятия совпадения
    } catch (err) {
      setError('Не удалось принять совпадение');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!currentProfile) {
    return (
      <div className="no-matches">
        <h2>Нет доступных профилей</h2>
        <p>Попробуйте изменить настройки поиска или вернитесь позже</p>
      </div>
    );
  }

  return (
    <div className="dating-screen">
      <div className="profile-card">
        <ProfilePhotos photos={currentProfile.photos} />
        <ProfileInfo
          profile={currentProfile}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      </div>
      <MatchesList matches={matches} onMatchClick={handleMatchClick} />
    </div>
  );
};

export default DatingScreen; 