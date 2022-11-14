import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from '../../contexts';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(5)
});

interface ILoginProps{
    children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit= () => {
    setIsLoading(true);

    loginSchema.validate({email, password}, {abortEarly: false})
      .then(dataValidated => {
        setIsLoading(true);

        login(dataValidated.email, dataValidated.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach(error => {
          if(error.path === 'email'){
            setEmailError(error.message);
          }else if(error.path === 'password'){
            setPasswordError(error.message);
          }
        });
      });
  };

  if(isAuthenticated) return(
    <>{children}</>
  );

  return(
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={350}>
            <Typography variant='h6' align='center'>
                Login
            </Typography>
            <TextField 
              fullWidth 
              type="email" 
              label="Email" 
              error={!!emailError} 
              helperText={emailError}
              value={email} 
              disabled={isLoading} 
              onChange={e => setEmail(e.target.value)}
              onKeyDown={() => setEmailError('')}
            />
                
            <TextField 
              fullWidth
              type="password"
              label="Senha"
              error={!!passwordError} 
              helperText={passwordError} 
              value={password} 
              disabled={isLoading} 
              onChange={e => setPassword(e.target.value)}
              onKeyDown={() => setPasswordError('')}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center' padding={2}
          >
            <Button variant='contained' 
              onClick={handleSubmit} 
              endIcon={isLoading ? <CircularProgress color='inherit' size={25} /> : undefined}
            >
                entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};