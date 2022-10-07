import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const  { toggleDrawerOpen } = useAppDrawerContext();
  return (
    <Routes>
      <Route path='/home' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>teste</Button>} />
      <Route path='*' element={<Navigate to='/home'></Navigate>} />
    </Routes>
  );
};