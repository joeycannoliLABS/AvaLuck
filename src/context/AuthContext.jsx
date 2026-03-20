import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [address, setAddress] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const connect = () => {
    setIsConnected(true);
    setAddress('0xEa9c...45aa');
  };

  const disconnect = () => {
    setIsConnected(false);
    setIsAdmin(false);
    setAddress('');
  };

  const toggleAdmin = () => setIsAdmin(prev => !prev);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <AuthContext.Provider value={{
      isConnected,
      isAdmin,
      address,
      theme,
      connect,
      disconnect,
      toggleAdmin,
      toggleTheme,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
