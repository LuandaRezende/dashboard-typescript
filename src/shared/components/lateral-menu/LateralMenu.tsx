import { Drawer, Box, useTheme, Avatar, Divider, List, ListItemButton, ListItemIcon, ListItemText, Icon, useMediaQuery} from '@mui/material';
import { useAppDrawerContext, useAppThemeContext, useAuthContext } from '../../contexts';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';

interface ILateralMenuProps{
    children: React.ReactNode
}

interface IListItemLinkProps{
    label: string,
    icon: string,
    route: string,
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ label, icon, route, onClick }) => {
  const navigate  = useNavigate();
  const resolvedPath = useResolvedPath(route);
  const match = useMatch({path: resolvedPath.pathname, end: false});

  const handleClick = () => {
    navigate(route); 
    if (onClick) onClick();
  };
    
  return(
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label}/>
    </ListItemButton>
  );
};

export const LateralMenu: React.FC<ILateralMenuProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useAppDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();

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
              {drawerOptions.map(drawerOption => (
                <ListItemLink 
                  key={drawerOption.route}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  route={drawerOption.route}
                  onClick={smDown ? toggleDrawerOpen : undefined} />    
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary='Alterar tema'/>
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary='Sair'/>
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