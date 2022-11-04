import { Box, Button, Paper, TextField, useTheme, Icon } from '@mui/material';
import { Environment } from '../../environment';

interface IToolbarListProps{
    textSearch?: string;
    showInputSearch?: boolean;
    changeTextSearch?: (newText: string) => void;
    textNewButton?: string;
    showNewButton?: boolean;
    clickAddNewPerson?: () => void;
}

export const ToolbarList: React.FC<IToolbarListProps> = ({
  textSearch = '', 
  showInputSearch = false, 
  changeTextSearch,
  textNewButton = 'Novo',
  showNewButton = true,
  clickAddNewPerson,
}) => {
  const theme = useTheme();
 
  return(
    <Box 
      height={theme.spacing(5)} 
      marginX={1}
      padding={1} 
      paddingX={2} 
      display="flex"
      alignItems="center"
      gap={1}
      component={Paper}>
      
      {showInputSearch && (
        <TextField value={textSearch} onChange={(e) => changeTextSearch?.(e.target.value)} size="small" placeholder={Environment.SEARCH_INPUT}></TextField>
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {(showNewButton &&
            <Button variant="contained" color="primary" onClick={clickAddNewPerson} disableElevation endIcon={<Icon>add</Icon>}>
              {textNewButton}
            </Button>
        )}
      </Box>
    </Box>
  );
};