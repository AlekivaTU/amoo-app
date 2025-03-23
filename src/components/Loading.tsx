import React from 'react';
import '../styles/Loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Загрузка...</p>
    </div>
  );
};

export default Loading; 