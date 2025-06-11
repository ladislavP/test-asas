'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextType {
  zipCode: string;
  setZipCode: (zip: string) => void;
  clearZipCode: () => void;
  isLocationSet: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [zipCode, setZipCodeState] = useState<string>('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedZipCode = localStorage.getItem('customerZipCode');
    if (savedZipCode) {
      setZipCodeState(savedZipCode);
    }
  }, []);

  const setZipCode = (zip: string) => {
    setZipCodeState(zip);
    localStorage.setItem('customerZipCode', zip);
  };

  const clearZipCode = () => {
    setZipCodeState('');
    localStorage.removeItem('customerZipCode');
  };

  return (
    <LocationContext.Provider 
      value={{ 
        zipCode, 
        setZipCode, 
        clearZipCode, 
        isLocationSet: zipCode.length > 0 
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
