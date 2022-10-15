import { Box, Paper, useTheme, Icon, Button, Divider } from '@mui/material';

export const ToobarDetail: React.FC = () =>{
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
      <Button variant="contained" color="primary" disableElevation startIcon={<Icon>save</Icon>}>
        Salvar
      </Button>

      <Button variant="outlined" color="primary" disableElevation startIcon={<Icon>save</Icon>}>
        Salvar e voltar
      </Button>

      <Button variant="outlined" color="primary" disableElevation startIcon={<Icon>delete</Icon>}>
        Apagar
      </Button>

      <Button variant="outlined" color="primary" disableElevation startIcon={<Icon>add</Icon>}>
        Voltar
      </Button>

      <Divider variant="middle" orientation="vertical" />

      <Button variant="outlined" color="primary" disableElevation startIcon={<Icon>arrow_back</Icon>}>
        Novo
      </Button>
    </Box>
  );
};