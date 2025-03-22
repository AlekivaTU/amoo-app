import React from 'react';
import { DatingProfile } from '../services/datingService';

interface ProfileInfoProps {
  profile: DatingProfile;
  onLike: () => void;
  onDislike: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, onLike, onDislike }) => {
  return (
    <div className="profile-info">
      <h2>
        {profile.name}, {profile.age}
      </h2>
      {profile.location.city && (
        <p className="location">{profile.location.city}</p>
      )}
      <p className="bio">{profile.bio}</p>
      {profile.interests.length > 0 && (
        <div className="interests">
          {profile.interests.map((interest) => (
            <span key={interest} className="interest-tag">
              {interest}
            </span>
          ))}
        </div>
      )}
      <div className="profile-actions">
        <button className="dislike-button" onClick={onDislike}>
          ✕
        </button>
        <button className="like-button" onClick={onLike}>
          ♥
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo; 