import api from './api';

export interface DatingProfile {
  id: string;
  userId: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  interests: string[];
  location: {
    latitude: number;
    longitude: number;
    city?: string;
  };
  preferences: {
    minAge: number;
    maxAge: number;
    distance: number;
    gender: string;
    showLocation: boolean;
    allowMessages: boolean;
  };
}

export interface Match {
  id: string;
  profiles: DatingProfile[];
  timestamp: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface EditableProfile {
  id?: string;
  userId?: string;
  name?: string;
  age?: number;
  bio?: string;
  photos?: string[];
  interests?: string[];
  location?: {
    latitude?: number;
    longitude?: number;
    city?: string;
  };
  preferences?: {
    minAge?: number;
    maxAge?: number;
    distance?: number;
    gender?: string;
    showLocation?: boolean;
    allowMessages?: boolean;
  };
}

class DatingService {
  async getProfile(): Promise<DatingProfile> {
    const response = await api.get('/dating/profile');
    return response.data;
  }

  async updateProfile(profile: EditableProfile): Promise<DatingProfile> {
    const response = await api.patch('/dating/profile', profile);
    return response.data;
  }

  async getPotentialMatches(): Promise<DatingProfile[]> {
    const response = await api.get('/dating/potential-matches');
    return response.data;
  }

  async likeProfile(profileId: string): Promise<void> {
    await api.post(`/dating/like/${profileId}`);
  }

  async dislikeProfile(profileId: string): Promise<void> {
    await api.post(`/dating/dislike/${profileId}`);
  }

  async getMatches(): Promise<Match[]> {
    const response = await api.get('/dating/matches');
    return response.data;
  }

  async acceptMatch(matchId: string): Promise<void> {
    await api.post(`/dating/matches/${matchId}/accept`);
  }

  async rejectMatch(matchId: string): Promise<void> {
    await api.post(`/dating/matches/${matchId}/reject`);
  }
}

export const datingService = new DatingService();
export default datingService; 