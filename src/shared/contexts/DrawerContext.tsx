import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData{
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOptions[];
    setDrawerOption: (newDrawerOptions: IDrawerOptions[]) => void;
}

interface IAppProviderProps{
    children: React.ReactNode
}

interface IDrawerOptions {
  icon: string,
  label: string,
  route: string,
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IAppProviderProps> = ({children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback(( newDrawerOptions: IDrawerOptions[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return(
    <DrawerContext.Provider value={{ drawerOptions, isDrawerOpen, toggleDrawerOpen, setDrawerOption: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
};