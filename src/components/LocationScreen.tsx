import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { locationService, Location } from '../services/locationService';
import { useAuth } from '../contexts/AuthContext';
import './LocationScreen.css';

interface NearbyUser {
  id: string;
  name: string;
  location: Location;
  distance: number;
}

const LocationScreen: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isWatching, setIsWatching] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadCurrentLocation();
    return () => {
      if (isWatching) {
        locationService.stopWatching();
      }
    };
  }, []);

  const loadCurrentLocation = async () => {
    try {
      setLoading(true);
      const location = await locationService.getCurrentLocation();
      setCurrentLocation(location);
      await loadNearbyUsers();
    } catch (err) {
      setError('Ошибка при получении местоположения');
    } finally {
      setLoading(false);
    }
  };

  const loadNearbyUsers = async () => {
    if (!currentLocation) return;

    try {
      const users = await locationService.getNearbyUsers(5); // радиус 5 км
      const formattedUsers: NearbyUser[] = users.map(user => ({
        id: user.id,
        name: user.name || 'Пользователь',
        location: user.location,
        distance: calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          user.location.latitude,
          user.location.longitude
        )
      }));
      setNearbyUsers(formattedUsers);
    } catch (err) {
      setError('Ошибка при загрузке ближайших пользователей');
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // радиус Земли в километрах
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value: number): number => {
    return (value * Math.PI) / 180;
  };

  const toggleLocationWatching = () => {
    if (isWatching) {
      locationService.stopWatching();
      setIsWatching(false);
    } else {
      locationService.watchLocation(
        (location) => {
          setCurrentLocation(location);
          loadNearbyUsers();
        },
        (err) => {
          setError('Ошибка при отслеживании местоположения');
        }
      );
      setIsWatching(true);
    }
  };

  const updateLocation = async () => {
    if (!currentLocation) return;

    try {
      await locationService.updateUserLocation(currentLocation);
    } catch (err) {
      setError('Ошибка при обновлении местоположения');
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!currentLocation) {
    return (
      <div className="location-screen">
        <div className="location-error">
          <h2>Не удалось получить местоположение</h2>
          <p>Пожалуйста, разрешите доступ к геолокации в настройках браузера</p>
        </div>
      </div>
    );
  }

  return (
    <div className="location-screen">
      <div className="location-controls">
        <button
          onClick={toggleLocationWatching}
          className={`watch-button ${isWatching ? 'active' : ''}`}
        >
          {isWatching ? 'Остановить отслеживание' : 'Начать отслеживание'}
        </button>
        <button onClick={updateLocation} className="update-button">
          Обновить местоположение
        </button>
      </div>

      <div className="map-container">
        <MapContainer
          center={[currentLocation.latitude, currentLocation.longitude]}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[currentLocation.latitude, currentLocation.longitude]}>
            <Popup>
              <div className="marker-popup">
                <h3>Вы</h3>
                <p>Ваше текущее местоположение</p>
              </div>
            </Popup>
          </Marker>
          {nearbyUsers.map((user) => (
            <Marker
              key={user.id}
              position={[user.location.latitude, user.location.longitude]}
            >
              <Popup>
                <div className="marker-popup">
                  <h3>{user.name}</h3>
                  <p>Расстояние: {user.distance.toFixed(2)} км</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="nearby-users">
        <h2>Ближайшие пользователи</h2>
        <div className="users-list">
          {nearbyUsers.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>Расстояние: {user.distance.toFixed(2)} км</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationScreen; 