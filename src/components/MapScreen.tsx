import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapScreen.css';

// Fix Leaflet icon issue
import L from 'leaflet';

// Delete default icon since we're using custom icons
delete L.Icon.Default.prototype._getIconUrl;

interface UserLocation {
  id: string;
  name: string;
  age: number;
  location: {
    lat: number;
    lng: number;
  };
  isOnline: boolean;
  lastActive: string;
  avatar: string;
  interests: string[];
}

const mockUsers: UserLocation[] = [
  {
    id: '1',
    name: 'Анна',
    age: 25,
    location: { lat: 55.7558, lng: 37.6173 }, // Москва
    isOnline: true,
    lastActive: 'сейчас',
    avatar: 'https://i.pravatar.cc/150?img=1',
    interests: ['музыка', 'путешествия', 'фотография']
  },
  {
    id: '2',
    name: 'Михаил',
    age: 28,
    location: { lat: 59.9343, lng: 30.3351 }, // Санкт-Петербург
    isOnline: false,
    lastActive: '5 минут назад',
    avatar: 'https://i.pravatar.cc/150?img=2',
    interests: ['спорт', 'кино', 'технологии']
  }
];

const MapScreen: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ lat: 55.7558, lng: 37.6173 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Ошибка получения геолокации:', error);
        }
      );
    }
  }, []);

  const createCustomIcon = (user: UserLocation) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="user-marker">
          <img src="${user.avatar}" alt="${user.name}" />
          <div class="online-status ${user.isOnline ? 'online' : 'offline'}"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });
  };

  return (
    <div className="map-screen">
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Маркер текущего пользователя */}
        <Marker 
          position={[userLocation.lat, userLocation.lng]}
          icon={L.divIcon({
            className: 'custom-marker',
            html: `
              <div class="user-marker current-user">
                <img src="https://i.pravatar.cc/150?img=3" alt="You" />
                <div class="online-status online"></div>
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40]
          })}
        >
          <Popup>
            <div>Вы здесь</div>
          </Popup>
        </Marker>

        {/* Маркеры других пользователей */}
        {mockUsers.map(user => (
          <Marker
            key={user.id}
            position={[user.location.lat, user.location.lng]}
            icon={createCustomIcon(user)}
          >
            <Popup>
              <div className="user-preview">
                <div 
                  className="preview-image"
                  style={{ backgroundImage: `url(${user.avatar})` }}
                />
                <div className="preview-info">
                  <h3>{user.name}, {user.age}</h3>
                  <p className="distance">12 км от вас</p>
                  <p className="last-active">
                    {user.isOnline ? 'Онлайн' : `Был(а) ${user.lastActive}`}
                  </p>
                </div>
                <button className="chat-button">
                  Написать
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapScreen; 