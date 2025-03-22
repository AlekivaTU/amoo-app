import React from 'react';
import { Match } from '../services/datingService';

interface MatchesListProps {
  matches: Match[];
  onMatchClick: (matchId: string) => void;
}

const MatchesList: React.FC<MatchesListProps> = ({ matches, onMatchClick }) => {
  if (matches.length === 0) {
    return (
      <div className="no-matches">
        <h2>Нет совпадений</h2>
        <p>Продолжайте искать, чтобы найти свою пару!</p>
      </div>
    );
  }

  return (
    <div className="matches-section">
      <h3>Ваши совпадения</h3>
      <div className="matches-grid">
        {matches.map((match) => (
          <div
            key={match.id}
            className="match-item"
            onClick={() => onMatchClick(match.id)}
          >
            <div className="match-avatar">
              <img
                src={match.profiles[0].photos[0]}
                alt={match.profiles[0].name}
              />
            </div>
            <div className="match-info">
              <h4>{match.profiles[0].name}</h4>
              <p>{match.profiles[0].age} лет</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesList; 