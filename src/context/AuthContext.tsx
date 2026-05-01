/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { authService, User } from '../services/authService';

interface ExtendedUser extends User {
  isGuest?: boolean;
}

interface AuthContextType {
  user: ExtendedUser | null;
  login: (email: string, name?: string) => void;
  register: (email: string, name: string) => void;
  continueAsGuest: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(() => authService.getUser());

  const login = (email: string, name?: string) => {
    const newUser = { id: '1', email, name: name || email.split('@')[0], isGuest: false };
    setUser(newUser);
    authService.saveUser(newUser);
  };

  const register = (email: string, name: string) => {
    const newUser = { id: '1', email, name, isGuest: false };
    setUser(newUser);
    authService.saveUser(newUser);
  };

  const continueAsGuest = (email: string) => {
    const newUser = { id: 'guest', email, name: 'Misafir', isGuest: true };
    setUser(newUser);
    authService.saveUser(newUser);
  };

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      continueAsGuest, 
      logout, 
      isAuthenticated: !!user && !user.isGuest 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
