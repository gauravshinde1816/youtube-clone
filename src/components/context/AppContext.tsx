import React, { ReactNode, createContext, useContext, useState } from 'react';

interface AppContextProps {
  children: ReactNode; 
}

interface AppContextInterface {
  data: any;
  setData: (data: any) => void;
}


const AppContext = createContext<AppContextInterface | null>(null);


export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [data, setData] = useState(); 

  const contextValue: AppContextInterface = { data, setData };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};


export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
