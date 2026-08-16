import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export interface AuthUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  birthDate?: string;
  photo?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = sessionStorage.getItem('user');

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem('token'),
  );

  function login(newUser: AuthUser, newToken: string) {
    setUser(newUser);
    setToken(newToken);
    sessionStorage.setItem('user', JSON.stringify(newUser));
    sessionStorage.setItem('token', newToken);
  }

  function logout() {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
