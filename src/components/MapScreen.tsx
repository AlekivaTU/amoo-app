import React from 'react';
import '../styles/MapScreen.css';

const MapScreen: React.FC = () => {
  return (
    <div className="map-container">
      <h1>Карта</h1>
      <div className="map-placeholder">
        <p>Здесь будет карта</p>
      </div>
    </div>
  );
};

export default MapScreen; 