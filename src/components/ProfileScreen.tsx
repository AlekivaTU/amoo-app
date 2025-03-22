import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { datingService, DatingProfile, EditableProfile } from '../services/datingService';
import './ProfileScreen.css';
import { useTheme } from '../hooks/useTheme';

interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  language: string;
  privacy: {
    showOnline: boolean;
    showLastSeen: boolean;
    showDistance: boolean;
  };
}

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<DatingProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editedProfile, setEditedProfile] = useState<EditableProfile>({});
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'security'>('profile');
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<UserSettings>({
    notifications: true,
    darkMode: theme === 'dark',
    language: 'Русский',
    privacy: {
      showOnline: true,
      showLastSeen: true,
      showDistance: true,
    }
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const userProfile = await datingService.getProfile();
      setProfile(userProfile);
      setEditedProfile(userProfile);
    } catch (err) {
      setError('Ошибка при загрузке профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile(profile || {});
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      await datingService.updateProfile(editedProfile);
      const updatedProfile = await datingService.getProfile();
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError('Ошибка при сохранении профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(',').map(interest => interest.trim());
    setEditedProfile(prev => ({
      ...prev,
      interests
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setEditedProfile(prev => ({
        ...prev,
        photos: [...(prev.photos || []), ...newPhotos]
      }));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setEditedProfile(prev => ({
      ...prev,
      photos: prev.photos?.filter((_, i) => i !== index)
    }));
  };

  const handleLogout = () => {
    // Здесь будет логика выхода
    console.log('Выход из аккаунта');
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-screen">
      <div className="profile-header">
        <h2>Профиль</h2>
        {!isEditing ? (
          <button onClick={handleEditProfile} className="edit-button">
            Редактировать
          </button>
        ) : (
          <div className="edit-actions">
            <button onClick={handleSaveProfile} className="save-button">
              Сохранить
            </button>
            <button onClick={handleCancelEdit} className="cancel-button">
              Отмена
            </button>
          </div>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-photos">
          <h3>Фотографии</h3>
          <div className="photos-grid">
            {isEditing ? (
              <>
                {editedProfile.photos?.map((photo, index) => (
                  <div key={index} className="photo-item">
                    <img src={photo} alt={`Фото ${index + 1}`} />
                    <button
                      onClick={() => handleRemovePhoto(index)}
                      className="remove-photo-button"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <label className="add-photo-button">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                  <div className="add-photo-placeholder">
                    <span>+</span>
                    <p>Добавить фото</p>
                  </div>
                </label>
              </>
            ) : (
              profile?.photos?.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo} alt={`Фото ${index + 1}`} />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="profile-info">
          <div className="info-group">
            <label>Имя</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedProfile.name || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile?.name}</p>
            )}
          </div>

          <div className="info-group">
            <label>Возраст</label>
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={editedProfile.age || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile?.age} лет</p>
            )}
          </div>

          <div className="info-group">
            <label>О себе</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={editedProfile.bio || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile?.bio}</p>
            )}
          </div>

          <div className="info-group">
            <label>Интересы</label>
            {isEditing ? (
              <input
                type="text"
                name="interests"
                value={editedProfile.interests?.join(', ') || ''}
                onChange={handleInterestChange}
                placeholder="Введите интересы через запятую"
              />
            ) : (
              <div className="interests-list">
                {profile?.interests?.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="info-group">
            <label>Предпочтения</label>
            {isEditing ? (
              <div className="preferences-form">
                <div className="preference-group">
                  <label>
                    <input
                      type="checkbox"
                      name="showLocation"
                      checked={editedProfile.preferences?.showLocation}
                      onChange={(e) =>
                        setEditedProfile(prev => ({
                          ...prev,
                          preferences: {
                            ...prev.preferences,
                            showLocation: e.target.checked
                          }
                        }))
                      }
                    />
                    Показывать местоположение
                  </label>
                </div>
                <div className="preference-group">
                  <label>
                    <input
                      type="checkbox"
                      name="allowMessages"
                      checked={editedProfile.preferences?.allowMessages}
                      onChange={(e) =>
                        setEditedProfile(prev => ({
                          ...prev,
                          preferences: {
                            ...prev.preferences,
                            allowMessages: e.target.checked
                          }
                        }))
                      }
                    />
                    Разрешить сообщения
                  </label>
                </div>
              </div>
            ) : (
              <div className="preferences-list">
                <p>
                  {profile?.preferences?.showLocation
                    ? 'Местоположение видно'
                    : 'Местоположение скрыто'}
                </p>
                <p>
                  {profile?.preferences?.allowMessages
                    ? 'Сообщения разрешены'
                    : 'Сообщения запрещены'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Профиль
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Настройки
        </button>
        <button 
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Безопасность
        </button>
      </div>

      {activeTab === 'settings' && (
        <div className="settings-content">
          <div className="settings-section">
            <h3>Основные настройки</h3>
            <div className="setting-item">
              <span>Уведомления</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications}
                  onChange={() => setSettings({...settings, notifications: !settings.notifications})}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Темная тема</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={theme === 'dark'}
                  onChange={() => {
                    toggleTheme();
                    setSettings({...settings, darkMode: !settings.darkMode});
                  }}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Язык</span>
              <select 
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
              >
                <option value="Русский">Русский</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>Настройки приватности</h3>
            <div className="setting-item">
              <span>Показывать онлайн статус</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.privacy.showOnline}
                  onChange={() => setSettings({
                    ...settings, 
                    privacy: {...settings.privacy, showOnline: !settings.privacy.showOnline}
                  })}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Показывать последнее посещение</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.privacy.showLastSeen}
                  onChange={() => setSettings({
                    ...settings, 
                    privacy: {...settings.privacy, showLastSeen: !settings.privacy.showLastSeen}
                  })}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Показывать расстояние</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.privacy.showDistance}
                  onChange={() => setSettings({
                    ...settings, 
                    privacy: {...settings.privacy, showDistance: !settings.privacy.showDistance}
                  })}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="security-content">
          <div className="security-section">
            <h3>Безопасность аккаунта</h3>
            <button className="security-button">
              Изменить пароль
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </button>
            <button className="security-button">
              Двухфакторная аутентификация
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </button>
            <button className="security-button">
              История входов
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </button>
          </div>

          <div className="security-section">
            <h3>Управление данными</h3>
            <button className="security-button">
              Скачать мои данные
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <button className="security-button danger">
              Удалить аккаунт
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button className="logout-button" onClick={handleLogout}>
        Выйти из аккаунта
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  );
};

export default ProfileScreen; 