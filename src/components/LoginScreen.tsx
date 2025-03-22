import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './AuthScreen.css';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login, error: authError, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      console.log('Attempting login with:', formData);
      await login(formData);
      console.log('Login successful, navigating to /map');
      navigate('/map', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth-screen">
      <div className="auth-container">
        <h1>Вход в Amoo</h1>
        {(error || authError) && (
          <div className="error-message">{error || authError}</div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Введите ваш email"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Введите ваш пароль"
              autoComplete="current-password"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading} 
            className="auth-button"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <div className="auth-links">
          <Link to="/register">Регистрация</Link>
          <Link to="/forgot-password">Забыли пароль?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 