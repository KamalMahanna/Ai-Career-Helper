import React, { createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationContextType {
  handleApiKeyError: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleApiKeyError = useCallback(() => {
    navigate('/api-keys', { 
      state: { invalidKey: true },
      replace: true 
    });
  }, [navigate]);

  return (
    <NavigationContext.Provider value={{ handleApiKeyError }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
