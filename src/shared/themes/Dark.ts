import { createTheme } from '@mui/material';
import { yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#fff',
    },
    secondary: {
      main: yellow[500],
      dark: yellow[400],
      light: yellow[300],
      contrastText: '#fff',
    },
    background: { 
      default: '#202124',
      paper: '#303134',
    },
  },
  typography: {
    allVariants:{
      color: 'white',
    },
  },
});