import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MapScreen from './components/MapScreen';
import Loading from './components/Loading';
import './styles/themes.css';
import './App.css';

// Ленивая загрузка компонентов
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const DatingScreen = lazy(() => import('./components/DatingScreen'));
const ProfileScreen = lazy(() => import('./components/ProfileScreen'));
const ChatScreen = lazy(() => import('./components/ChatScreen'));
const StreamsScreen = lazy(() => import('./components/StreamsScreen'));
const LocationScreen = lazy(() => import('./components/LocationScreen'));

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <div className="content">
            <Routes>
              {!user ? (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<DatingScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/chat" element={<ChatScreen />} />
                  <Route path="/streams" element={<StreamsScreen />} />
                  <Route path="/location" element={<LocationScreen />} />
                </>
              )}
              <Route path="/" element={<Navigate to="/map" replace />} />
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
                path="/chats"
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
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
