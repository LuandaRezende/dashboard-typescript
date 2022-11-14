import { Box, Grid, Icon, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { useAppDrawerContext } from '../contexts';

interface IBaseLayoutProps{
    title: string;
    toolbar?: ReactNode;
    children: React.ReactNode
}

export const BaseLayout: React.FC<IBaseLayoutProps> = ({title, children, toolbar}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); 
  const mdDown = useMediaQuery(theme.breakpoints.down('md')); 
  const { toggleDrawerOpen } = useAppDrawerContext();

  return(
    <Box height='100%' display='flex' flexDirection='column'>
      {!smDown && (
        <Box display='flex' paddingLeft={2} justifyContent='left' alignItems='center' component={Paper} height={theme.spacing(6)}>
          <Typography>Painel administrativo</Typography>
        </Box>
      )}
      {/* <Box padding={1} display='flex' alignItems='center' height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}>
        <Box component={Paper}
          height={theme.spacing(smDown ? 3 : mdDown ? 8 : 8)} 
          marginX={1}
          padding={1} 
          paddingX={2} 
          display="flex"
          alignItems="center"
          width='100%'
        >
          {smDown && (
            <IconButton onClick={toggleDrawerOpen}>
              <Icon>menu</Icon>
            </IconButton>
          )}
        
          <Grid container margin={2}>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Typography 
                  variant={smDown ? 'h6' : mdDown ? 'h6' : 'h6'}
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                >
                  {title} 
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>        
      </Box> */}


      <Box flex={1} component={Paper} m={2} p={2} overflow='auto'>
        <Box display='flex' alignItems='center'>
          <Box
            display="flex"
            alignItems="center"
            width='100%'
          >
            {smDown && (
              <IconButton onClick={toggleDrawerOpen}>
                <Icon>menu</Icon>
              </IconButton>
            )}
        
            <Grid container>
              <Grid item container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Typography 
                    variant={smDown ? 'h6' : mdDown ? 'h6' : 'h6'}
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'
                  >
                    {title} 
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>        
        </Box> 
          
        {toolbar && (
          <Box>
            {toolbar}
          </Box>
        )}
      
        {children}
      </Box>
    </Box>
  );
};