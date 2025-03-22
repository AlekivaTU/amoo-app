import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfileScreen from '../ProfileScreen';
import { AuthProvider } from '../../contexts/AuthContext';
import datingService from '../../services/datingService';

jest.mock('../../services/datingService');

describe('ProfileScreen', () => {
  const mockProfile = {
    id: '1',
    name: 'Анна',
    age: 25,
    bio: 'Люблю путешествия',
    photos: ['photo1.jpg', 'photo2.jpg'],
    interests: ['путешествия', 'фотография'],
    location: { city: 'Москва' },
    preferences: {
      distance: 50,
      gender: 'all',
      showLocation: true,
      allowMessages: true
    }
  };

  beforeEach(() => {
    (datingService.getProfile as jest.Mock).mockResolvedValue(mockProfile);
    (datingService.updateProfile as jest.Mock).mockResolvedValue({ success: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('загружает и отображает профиль', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ProfileScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Анна')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
      expect(screen.getByText('Люблю путешествия')).toBeInTheDocument();
    });
  });

  it('включает режим редактирования', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ProfileScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Анна')).toBeInTheDocument();
    });

    const editButton = screen.getByText('Редактировать');
    fireEvent.click(editButton);

    expect(screen.getByText('Сохранить')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });

  it('сохраняет изменения профиля', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ProfileScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Анна')).toBeInTheDocument();
    });

    // Включаем режим редактирования
    const editButton = screen.getByText('Редактировать');
    fireEvent.click(editButton);

    // Изменяем имя
    const nameInput = screen.getByLabelText('Имя');
    fireEvent.change(nameInput, { target: { value: 'Анна Петрова' } });

    // Сохраняем изменения
    const saveButton = screen.getByText('Сохранить');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(datingService.updateProfile).toHaveBeenCalledWith({
        ...mockProfile,
        name: 'Анна Петрова'
      });
    });
  });

  it('обрабатывает ошибку загрузки', async () => {
    const error = new Error('Ошибка загрузки');
    (datingService.getProfile as jest.Mock).mockRejectedValue(error);

    render(
      <BrowserRouter>
        <AuthProvider>
          <ProfileScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Ошибка загрузки профиля')).toBeInTheDocument();
    });
  });
}); 