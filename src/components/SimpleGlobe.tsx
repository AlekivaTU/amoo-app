import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './SimpleGlobe.css';

// Исправляем проблему с маркерами Leaflet в React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Point {
  id: string;
  lat: number;
  lng: number;
  color: string;
  userData?: any;
  eventData?: any;
}

interface SimpleGlobeProps {
  points: Point[];
  onPointClick: (point: Point) => void;
}

const SimpleGlobe: React.FC<SimpleGlobeProps> = ({ points, onPointClick }) => {
  const [currentLocation, setCurrentLocation] = useState<[number, number]>([55.75, 37.62]); // Москва по умолчанию

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (error) => {
          console.log('Ошибка геолокации:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, []);

  const createCustomIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}"></div>`,
      iconSize: [30, 30],
    });
  };

  const currentLocationIcon = L.divIcon({
    className: 'current-location-marker',
    html: '<div></div>',
    iconSize: [40, 40],
  });

  return (
    <div className="map-container">
      <MapContainer
        center={currentLocation}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Маркер текущей локации */}
        <Marker 
          position={currentLocation}
          icon={currentLocationIcon}
        >
          <Popup>
            Вы здесь
          </Popup>
        </Marker>

        {/* Маркеры точек */}
        {points.map(point => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={createCustomIcon(point.color)}
            eventHandlers={{
              click: () => onPointClick(point)
            }}
          >
            <Popup>
              {point.userData?.name || 'Точка интереса'}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SimpleGlobe; 