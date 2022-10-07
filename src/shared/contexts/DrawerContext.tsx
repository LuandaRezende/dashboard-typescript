import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData{
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}

interface IAppProviderProps{
    children: React.ReactNode
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IAppProviderProps> = ({children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  return(
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen}}>
      {children}
    </DrawerContext.Provider>
  );
};