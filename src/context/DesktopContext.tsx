'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DesktopContextType {
  openWindow: string | null;
  setOpenWindow: (window: string | null) => void;
}

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [openWindow, setOpenWindow] = useState<string | null>(null);

  return (
    <DesktopContext.Provider value={{ openWindow, setOpenWindow }}>
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (context === undefined) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
} 