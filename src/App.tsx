import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import './styles/themes.css';
import './App.css';

// Ленивая загрузка компонентов
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const MapScreen = lazy(() => import('./components/MapScreen'));
const DatingScreen = lazy(() => import('./components/DatingScreen'));
const ProfileScreen = lazy(() => import('./components/ProfileScreen'));
const ChatScreen = lazy(() => import('./components/ChatScreen'));
const StreamsScreen = lazy(() => import('./components/StreamsScreen'));
const LocationScreen = lazy(() => import('./components/LocationScreen'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Защищенные маршруты */}
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dating"
          element={
            <ProtectedRoute>
              <DatingScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats/:id"
          element={
            <ProtectedRoute>
              <ChatScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/streams"
          element={
            <ProtectedRoute>
              <StreamsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/location"
          element={
            <ProtectedRoute>
              <LocationScreen />
            </ProtectedRoute>
          }
        />
        
        {/* Редиректы */}
        <Route path="/" element={<Navigate to="/map" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <div className="content">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
