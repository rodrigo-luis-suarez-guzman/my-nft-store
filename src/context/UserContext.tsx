import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define la interfaz para un NFT
interface NFTItem {
  id: string;
  name: string;
  imageUrl: string;
}

// Define la interfaz para el perfil del usuario
interface UserProfile {
  walletAddress: string; // Cambié 'address' a 'walletAddress' para mayor claridad
  purchases: NFTItem[];
}

// Define la interfaz para el contexto del usuario
interface UserContextType {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

// Crea el contexto del usuario
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor del contexto del usuario
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({ walletAddress: '', purchases: [] });

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto del usuario
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
