import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, RegisterPayload, LoginPayload } from '@/types';
import { authApi, setToken, removeToken, getToken } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkAuth = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    const response = await authApi.getMe();
    if (response.success) {
      setUser(response.data.user);
    } else {
      removeToken();
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (payload: LoginPayload): Promise<boolean> => {
    const response = await authApi.login(payload);
    
    if (response.success) {
      setToken(response.data.token);
      setUser(response.data.user);
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${response.data.user.name}`,
      });
      return true;
    } else {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: response.message,
      });
      return false;
    }
  };

  const register = async (payload: RegisterPayload): Promise<boolean> => {
    const response = await authApi.register(payload);
    
    if (response.success) {
      setToken(response.data.token);
      setUser(response.data.user);
      toast({
        title: 'Account created!',
        description: 'Welcome to Course Manager',
      });
      return true;
    } else {
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: response.message,
      });
      return false;
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'See you soon!',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
