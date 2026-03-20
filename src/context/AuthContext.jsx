import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [address, setAddress] = useState('');

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

  return (
    <AuthContext.Provider value={{
      isConnected,
      isAdmin,
      address,
      connect,
      disconnect,
      toggleAdmin,
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
