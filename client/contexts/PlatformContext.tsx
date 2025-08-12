import { createContext, useContext, useState, ReactNode } from 'react';

type Platform = 'SAAS' | 'PAAS';

interface PlatformContextType {
  selectedPlatform: Platform;
  setSelectedPlatform: (platform: Platform) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('SAAS');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <PlatformContext.Provider 
      value={{ 
        selectedPlatform, 
        setSelectedPlatform, 
        isDropdownOpen, 
        setIsDropdownOpen 
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}
