import React, { memo } from 'react';
import Globe from 'react-globe.gl';

interface GlobeComponentProps {
  points: any[];
  onPointClick: (point: any) => void;
}

const GlobeComponent: React.FC<GlobeComponentProps> = memo(({ points, onPointClick }) => {
  return (
    <Globe
      globeImageUrl="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg"
      pointsData={points}
      pointLat="lat"
      pointLng="lng"
      pointAltitude="altitude"
      pointRadius="radius"
      pointColor="color"
      onPointClick={onPointClick}
      pointsMerge={false}
      atmosphereColor="#8fb7db"
      atmosphereAltitude={0.15}
      backgroundColor="rgba(0,0,0,0)"
    />
  );
});

export default GlobeComponent; 