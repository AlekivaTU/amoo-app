import api from './api';

export interface Stream {
  id: string;
  userId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  isLive: boolean;
  viewerCount: number;
  startedAt?: Date;
  endedAt?: Date;
}

export interface StreamSettings {
  title: string;
  description: string;
  isPublic: boolean;
  allowChat: boolean;
}

class StreamService {
  async getStreams(): Promise<Stream[]> {
    const response = await api.get('/streams');
    return response.data;
  }

  async getStream(streamId: string): Promise<Stream> {
    const response = await api.get(`/streams/${streamId}`);
    return response.data;
  }

  async startStream(settings: StreamSettings): Promise<Stream> {
    const response = await api.post('/streams', settings);
    return response.data;
  }

  async endStream(streamId: string): Promise<void> {
    await api.post(`/streams/${streamId}/end`);
  }

  async updateStreamSettings(streamId: string, settings: Partial<StreamSettings>): Promise<Stream> {
    const response = await api.patch(`/streams/${streamId}`, settings);
    return response.data;
  }

  async getStreamKey(streamId: string): Promise<string> {
    const response = await api.get(`/streams/${streamId}/key`);
    return response.data.streamKey;
  }
}

export const streamService = new StreamService(); 