import api from './api';

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: Date;
}

class LocationService {
  private watchId: number | null = null;

  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Геолокация не поддерживается'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp),
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  watchLocation(onLocation: (location: Location) => void, onError?: (error: Error) => void) {
    if (!navigator.geolocation) {
      onError?.(new Error('Геолокация не поддерживается'));
      return;
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        onLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp),
        });
      },
      (error) => {
        onError?.(new Error(error.message));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  stopWatching() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  async updateUserLocation(location: Location): Promise<void> {
    await api.post('/users/location', location);
  }

  async getNearbyUsers(radius: number): Promise<{ id: string; name: string; location: Location }[]> {
    const response = await api.get(`/users/nearby?radius=${radius}`);
    return response.data;
  }
}

export const locationService = new LocationService(); 