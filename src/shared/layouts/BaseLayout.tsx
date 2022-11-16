import { Box, Grid, Icon, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { useAppDrawerContext } from '../contexts';

interface IBaseLayoutProps{
    title: string;
    toolbar?: ReactNode;
    children: React.ReactNode;
    isDashboard?: boolean
}

export const BaseLayout: React.FC<IBaseLayoutProps> = ({title, children, toolbar, isDashboard}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); 
  const mdDown = useMediaQuery(theme.breakpoints.down('md')); 
  const { toggleDrawerOpen } = useAppDrawerContext();

  return(
    <div>
      {!isDashboard && (
        <Box height='100%' display='flex' flexDirection='column'>
          {!smDown && (
            <Box display='flex' paddingLeft={2} justifyContent='left' alignItems='center' component={Paper} height={theme.spacing(6)}>
              <Typography>Painel administrativo</Typography>
            </Box>
          )}

          <Box flex={1} component={Paper} m={theme.spacing(smDown ? 0 : mdDown ? 2 : 2)} p={2} overflow='auto'>
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
      )}

      {isDashboard &&(
        <Box height='100%' display='flex' flexDirection='column'>
          {!smDown && (
            <Box display='flex' paddingLeft={2} justifyContent='left' alignItems='center' component={Paper} height={theme.spacing(6)}>
              <Typography>Painel administrativo</Typography>
            </Box>
          )}


          {smDown && (<Box flex={1} component={Paper} m={theme.spacing(smDown ? 0 : mdDown ? 2 : 2)} p={2} overflow='auto'>
            <Box display='flex' alignItems='center'>
              <Box
                display="flex"
                alignItems="center"
                width='100%'
              >
                
                <IconButton onClick={toggleDrawerOpen}>
                  <Icon>menu</Icon>
                </IconButton>
        
                <Grid container>
                  <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <Typography 
                        variant={smDown ? 'h6' : mdDown ? 'h6' : 'h6'}
                        whiteSpace='nowrap'
                        overflow='hidden'
                        textOverflow='ellipsis'
                      >
                       Dashboard
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>        
            </Box>
          </Box>
          )}
          
          {children}
        </Box>
      )}
    </div>
    
  );
};