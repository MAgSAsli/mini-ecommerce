'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Role = 'buyer' | 'seller';

export interface User {
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => string | null;
  register: (name: string, email: string, password: string, role: Role) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface StoredUser extends User { password: string; }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const getUsers = (): StoredUser[] => {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  };

  const register = (name: string, email: string, password: string, role: Role): string | null => {
    const users = getUsers();
    if (users.find(u => u.email === email)) return 'Email sudah terdaftar';
    const newUser: StoredUser = { name, email, password, role };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    const { password: _p, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
    return null;
  };

  const login = (email: string, password: string): string | null => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return 'Email atau password salah';
    const { password: _p, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
    localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
