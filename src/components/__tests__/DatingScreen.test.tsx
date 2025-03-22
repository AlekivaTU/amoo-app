import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DatingScreen from '../DatingScreen';
import { AuthProvider } from '../../contexts/AuthContext';
import datingService from '../../services/datingService';

// Мокаем сервис знакомств
jest.mock('../../services/datingService');

describe('DatingScreen', () => {
  const mockProfiles = [
    {
      id: '1',
      name: 'Анна',
      age: 25,
      bio: 'Люблю путешествия',
      photos: ['photo1.jpg'],
      interests: ['путешествия', 'фотография'],
      location: { city: 'Москва' }
    },
    {
      id: '2',
      name: 'Иван',
      age: 28,
      bio: 'Увлекаюсь спортом',
      photos: ['photo2.jpg'],
      interests: ['спорт', 'музыка'],
      location: { city: 'Санкт-Петербург' }
    }
  ];

  beforeEach(() => {
    (datingService.getPotentialMatches as jest.Mock).mockResolvedValue(mockProfiles);
    (datingService.getMatches as jest.Mock).mockResolvedValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('загружает и отображает профили', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <DatingScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    // Проверяем отображение загрузки
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();

    // Ждем загрузки профилей
    await waitFor(() => {
      expect(screen.getByText('Анна, 25')).toBeInTheDocument();
      expect(screen.getByText('Люблю путешествия')).toBeInTheDocument();
    });
  });

  it('обрабатывает ошибку загрузки', async () => {
    const error = new Error('Ошибка загрузки');
    (datingService.getPotentialMatches as jest.Mock).mockRejectedValue(error);

    render(
      <BrowserRouter>
        <AuthProvider>
          <DatingScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Ошибка загрузки профилей')).toBeInTheDocument();
    });
  });

  it('обрабатывает лайк профиля', async () => {
    (datingService.likeProfile as jest.Mock).mockResolvedValue({ success: true });

    render(
      <BrowserRouter>
        <AuthProvider>
          <DatingScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Анна, 25')).toBeInTheDocument();
    });

    const likeButton = screen.getByText('♥');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(datingService.likeProfile).toHaveBeenCalledWith('1');
    });
  });

  it('обрабатывает дизлайк профиля', async () => {
    (datingService.dislikeProfile as jest.Mock).mockResolvedValue({ success: true });

    render(
      <BrowserRouter>
        <AuthProvider>
          <DatingScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Анна, 25')).toBeInTheDocument();
    });

    const dislikeButton = screen.getByText('✕');
    fireEvent.click(dislikeButton);

    await waitFor(() => {
      expect(datingService.dislikeProfile).toHaveBeenCalledWith('1');
    });
  });
}); 