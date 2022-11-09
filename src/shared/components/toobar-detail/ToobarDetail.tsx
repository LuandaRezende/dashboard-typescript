import { Box, Paper, useTheme, Icon, Button, Divider, Skeleton, Typography, useMediaQuery } from '@mui/material';

interface IToobarDetailProps{
    textNewButton?: string;
    showNewButton?: boolean;
    showReturnButton?: boolean;
    showDeleteButton?: boolean;
    showSaveButton?: boolean;
    showSaveCloseButton?: boolean;

    showNewButtonLoading?: boolean;
    showReturnButtonLoading?: boolean;
    showDeleteButtonLoading?: boolean;
    showSaveButtonLoading?: boolean;
    showSaveCloseButtonLoading?: boolean;

    newItem?: () => void;
    returnItem?: () => void;
    deleteItem?: () => void;
    saveItem?: () => void;
    saveAndCloseItem?: () => void;
}

export const ToobarDetail: React.FC<IToobarDetailProps> = ({
  textNewButton = 'Novo',  
  showNewButton = true,
  showReturnButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveCloseButton = true,

  showNewButtonLoading = false,
  showReturnButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveCloseButtonLoading = false,

  newItem,
  returnItem,
  deleteItem,
  saveItem,
  saveAndCloseItem,
}) =>{
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); 
  const mdDown = useMediaQuery(theme.breakpoints.down('md')); 
  
  return(
    <Box
      height={theme.spacing(5)} 
      marginX={1}
      padding={1} 
      paddingX={2} 
      display="flex"
      alignItems="center"
      gap={1}
      component={Paper}
    >
      {(showSaveButton && !showSaveButtonLoading) && (
        <Button onClick={saveItem} variant="contained" color="primary" disableElevation startIcon={<Icon>save</Icon>}>
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar
          </Typography> 
        </Button>
      )}
      {showSaveButtonLoading && (<Skeleton width={110} height={60}></Skeleton>)}

      {(showSaveCloseButton && !showSaveCloseButtonLoading && !smDown && !mdDown) && (
        <Button onClick={saveAndCloseItem} variant="outlined" color="primary" disableElevation startIcon={<Icon>save</Icon>}>
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar e voltar
          </Typography>
        </Button>
      )}
      {(showSaveCloseButtonLoading && !smDown && !mdDown) && (<Skeleton width={180} height={60}></Skeleton>)}
      
      {(showDeleteButton && !showDeleteButtonLoading) && (
        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
          <Button onClick={deleteItem} variant="outlined" color="primary" disableElevation startIcon={<Icon>delete</Icon>}>
            Apagar
          </Button>
        </Typography>
      )}
      {showDeleteButtonLoading && (<Skeleton width={110} height={60}></Skeleton>)}
      
      {(showNewButton && !showNewButtonLoading && !smDown) && (
        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
          <Button onClick={newItem} variant="outlined" color="primary" disableElevation startIcon={<Icon>arrow_back</Icon>}>
            {textNewButton}
          </Button>
        </Typography>
      )}
      {(showNewButtonLoading  && !smDown) && (<Skeleton width={110} height={60}></Skeleton>)}
        
      {(showReturnButton && (showNewButton || showDeleteButton || showSaveButton || showSaveCloseButton)) && (<Divider variant="middle" orientation="vertical" />)}

      {(showReturnButton && !showReturnButtonLoading) && (
        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
          <Button onClick={returnItem} variant="outlined" color="primary" disableElevation startIcon={<Icon>add</Icon>}>
            Voltar
          </Button>
        </Typography>
      )}
      {showReturnButtonLoading && (<Skeleton width={110} height={60}></Skeleton>)}
    </Box>
  );
};