import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import TodoList from './pages/TodoList';
import Login from './pages/Login';
import { AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';

const App = () => {
  return (
    <AppRoot mode="partial">
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthContextProvider>
    </AppRoot>
  );
};

export default App;
