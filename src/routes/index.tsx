import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListPeople} from '../pages';

export const AppRoutes = () => {
  const  { setDrawerOption } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOption([
      { 
        label: 'Dashboard',
        icon: 'home',
        route: '/home'
      },
      { 
        label: 'Pessoas',
        icon: 'people',
        route: '/people'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/home' element={<Dashboard />} />
      <Route path='/people' element={<ListPeople />} />
      {/* <Route path='/citys/details/:id' element={<ListCitys />} /> */}
      <Route path='*' element={<Navigate to='/home'></Navigate>} />
    </Routes>
  );
};