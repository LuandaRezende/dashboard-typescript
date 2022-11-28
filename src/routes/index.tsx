import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListPeople, ListSales, PeopleDetails, SalesDetails} from '../pages';
import { ListCities } from '../pages/cities/ListCities';
import { CitiesDetails } from '../pages/cities/CitysDetails';

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
      },
      { 
        label: 'Cidades',
        icon: 'location_city',
        route: '/cities'
      },
      { 
        label: 'Vendas',
        icon: 'money',
        route: '/sales'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/home' element={<Dashboard />} />
      <Route path='/people' element={<ListPeople />} />
      <Route path='/people/details/:id' element={<PeopleDetails />} />
      <Route path='/cities' element={<ListCities />} />
      <Route path='/cities/details/:id' element={<CitiesDetails />} />
      <Route path='/sales' element={<ListSales />} />
      <Route path='/sales/details/:id' element={<SalesDetails />} />
      <Route path='*' element={<Navigate to='/home'></Navigate>} />
    </Routes>
  );
};