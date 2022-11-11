import {
  BrowserRouter,
} from 'react-router-dom';
import './shared/forms/TraductionYup';
import { AppRoutes } from './routes';
import { LateralMenu, Login } from './shared/components';
import { AuthProvider, DrawerProvider } from './shared/contexts';
import { AppThemeProvider } from './shared/contexts/ThemeContext';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <LateralMenu>
                <AppRoutes/>
              </LateralMenu>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
