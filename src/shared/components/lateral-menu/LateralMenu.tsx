import { Drawer, Box, useTheme, Avatar, Divider, List, ListItemButton, ListItemIcon, ListItemText, Icon, useMediaQuery} from '@mui/material';
import { useAppDrawerContext } from '../../contexts';

interface ILateralMenuProps{
    children: React.ReactNode
}

export const LateralMenu: React.FC<ILateralMenuProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen,toggleDrawerOpen } = useAppDrawerContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar sx={{height: theme.spacing(12), width: theme.spacing(12)}} alt="Luanda Rezende" src="https://media-exp1.licdn.com/dms/image/C4E03AQFhnkE_ZQPL6A/profile-displayphoto-shrink_400_400/0/1650930001928?e=1670457600&v=beta&t=0EnZmVqR3IcNJfp9saBljTrNtcFlzLM4LYUhkR762uw" />
          </Box>
          <Divider></Divider>
          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};