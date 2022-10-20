import { Box, Paper, useTheme, Icon, Button, Divider, Skeleton } from '@mui/material';

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
  showSaveCloseButton = false,

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
            Salvar
        </Button>
      )}

      {showSaveButtonLoading && (<Skeleton width={110} height={60}></Skeleton>)}

      
      {(showSaveCloseButton && !showSaveCloseButtonLoading) && (
        <Button onClick={saveAndCloseItem} variant="outlined" color="primary" disableElevation startIcon={<Icon>save</Icon>}>
        Salvar e voltar
        </Button>
      )}
      {showSaveCloseButtonLoading && (<Skeleton width={180} height={60}></Skeleton>)}
      
    
      {(showDeleteButton && !showDeleteButtonLoading) && (
        <Button  onClick={deleteItem} variant="outlined" color="primary" disableElevation startIcon={<Icon>delete</Icon>}>
        Apagar
        </Button>
      )}
      {showDeleteButtonLoading && (<Skeleton width={110} height={60}></Skeleton>)}
      
    
      {(showReturnButton && !showReturnButtonLoading) && (
        <Button onClick={returnItem} variant="outlined" color="primary" disableElevation startIcon={<Icon>add</Icon>}>
        Voltar
        </Button>
      )}
      {showReturnButtonLoading && (<Skeleton width={110} height={60}></Skeleton>)}

      
      <Divider variant="middle" orientation="vertical" />

      {(showNewButtonLoading && !showNewButton) && (
        <Button onClick={newItem} variant="outlined" color="primary" disableElevation startIcon={<Icon>arrow_back</Icon>}>
          {textNewButton}
        </Button>
      )}
      {showNewButtonLoading && (<Skeleton width={110} height={60}></Skeleton>)}
    </Box>
  );
};