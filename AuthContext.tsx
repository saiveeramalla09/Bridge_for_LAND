import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'seller' | 'buyer' | 'admin' | null;

interface User {
  id: string;
  name: string;
  role: UserRole;
  phone?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (phoneOrEmail: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (phoneOrEmail: string, role: UserRole = 'buyer') => {
    // Mock login logic
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name: phoneOrEmail.includes('@') ? phoneOrEmail.split('@')[0] : 'User',
      role,
      ...(phoneOrEmail.includes('@') ? { email: phoneOrEmail } : { phone: phoneOrEmail }),
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
