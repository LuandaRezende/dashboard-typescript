import {
  BrowserRouter,
} from 'react-router-dom';
import './shared/forms/TraductionYup';
import { AppRoutes } from './routes';
import { LateralMenu } from './shared/components';
import { DrawerProvider } from './shared/contexts';
import { AppThemeProvider } from './shared/contexts/ThemeContext';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <LateralMenu>
            <AppRoutes/>
          </LateralMenu>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
