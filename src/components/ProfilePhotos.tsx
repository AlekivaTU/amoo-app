import React, { useState } from 'react';

interface ProfilePhotosProps {
  photos: string[];
}

const ProfilePhotos: React.FC<ProfilePhotosProps> = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="profile-photos">
      {photos.map((photo, index) => (
        <img
          key={photo}
          src={photo}
          alt={`Фото ${index + 1}`}
          className={index === currentPhotoIndex ? 'active' : ''}
        />
      ))}
      <div className="photo-navigation">
        <button
          className="photo-nav-button prev"
          onClick={prevPhoto}
          disabled={photos.length <= 1}
        >
          ←
        </button>
        <div className="photo-indicators">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`photo-indicator ${
                index === currentPhotoIndex ? 'active' : ''
              }`}
              onClick={() => setCurrentPhotoIndex(index)}
            />
          ))}
        </div>
        <button
          className="photo-nav-button next"
          onClick={nextPhoto}
          disabled={photos.length <= 1}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ProfilePhotos; 