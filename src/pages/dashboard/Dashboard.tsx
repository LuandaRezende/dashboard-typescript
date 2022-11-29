import { Box, Card, CardContent, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { BaseLayout } from '../../shared/layouts';
import { CitiesService } from '../../shared/services/api/cities/CitiesService';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { SalesService } from '../../shared/services/api/sales/SalesService';
import { BarChart } from '../../shared/components/graphics/BarChart';
import { PieChart } from '../../shared/components/graphics/PieChart';

export const Dashboard = () => {
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isLoadingPeople, setIsLoadingPeople] = useState(true);
  const [isLoadingSales, setIsLoadingSales] = useState(true);
  const [totalCountyCities, setTotalCountCities] = useState(0);
  const [totalCountyPeople, setTotalCountPeople] = useState(0);
  const [totalCountySales, setTotalCountSales] = useState(0);
  const [sellers, setSellers] = useState<string[]>([]);
  const [sales, setSales] = useState<number[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [quantityPeople, setQuantityPeople] = useState<number[]>([]);
  const theme = useTheme();

  useEffect(() => {
    setIsLoadingCities(true);
    setIsLoadingPeople(true);
    setIsLoadingSales(true);
  
    CitiesService.getAll(1).then((result) => {
      setIsLoadingCities(false);
  
      if(result instanceof Error){
        alert(result.message);
        return;
      }
    
      setTotalCountCities(result.totalCount);
    });

    PeopleService.getAll(1).then((result) => {
      setIsLoadingPeople(false);
  
      if(result instanceof Error){
        alert(result.message);
        return;
      }

      const values = result.quantityPeople;
      
      const newArray: {id: number; value: number; cityName: string}[] = [];

      for(let i = 0; i < values.length; i++){
        const found = newArray.find(element => element.id === values[i].id);

        if(found){
          const index = newArray.findIndex(element => element.id === values[i].id);
          newArray[index].value = newArray[index].value + values[i].value;
        }else{
          newArray.push(values[i]);
        }
      }
      
      const getPeopleByCity: number[] = [];
      
      const getCities = [];
      
      for(let a = 0; a < newArray.length; a++){
        getCities.push(newArray[a].cityName);
        getPeopleByCity.push(newArray[a].value);
      }

      setQuantityPeople(getPeopleByCity);
      setCities(getCities);

      setTotalCountPeople(result.totalCount);
    });

    SalesService.getAll(1).then((result) => {
      setIsLoadingSales(false);
  
      if(result instanceof Error){
        alert(result.message);
        return;
      }

      const values = result.quantitySales;
      
      const newArray: {id: number; value: number; name: string}[] = [];

      for(let i = 0; i < values.length; i++){
        const found = newArray.find(element => element.id === values[i].id);

        if(found){
          const index = newArray.findIndex(element => element.id === values[i].id);
          newArray[index].value = newArray[index].value + values[i].value;
        }else{
          newArray.push(values[i]);
        }
      }
      
      const getSalesBySellers: number[] = [];
      
      const getSellers = [];
      
      for(let a = 0; a < newArray.length; a++){
        getSellers.push(newArray[a].name);
        getSalesBySellers.push(newArray[a].value);
      }

      setSellers(getSellers);
      setSales(getSalesBySellers);
      
      setTotalCountSales(result.totalCount);
    });

  }, []);
    
  return (
    <BaseLayout 
      title=''
      isDashboard={true}
    >
      <Box width='100%' display='flex'>
        <Grid container mt={2} ml={2} mr={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card>
                <CardContent>
                  <Typography color={'#c1c1c1'} align='right' fontWeight={100}>
                      Total de pessoas
                  </Typography>
                  <Box padding={1} display='flex' justifyContent='right' alignItems='center'>
                    {!isLoadingPeople &&(
                      <Typography variant='h6'>
                        {totalCountyPeople}
                      </Typography>
                    )}

                    {isLoadingPeople && (
                      <Typography>
                        <CircularProgress size={30} />
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card > 
                <CardContent>
                  <Typography color={'#c1c1c1'} align='right' fontWeight={100}>
                      Total de cidades
                  </Typography>

                  <Box padding={1} display='flex' justifyContent='right' alignItems='center'>
                    {!isLoadingCities &&(
                      <Typography variant='h6'>
                        {totalCountyCities}
                      </Typography>
                    )}

                    {isLoadingCities && (
                      <Typography>
                        <CircularProgress size={30} />
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card>
                <CardContent>
                  <Typography color={'#c1c1c1'} align='right' fontWeight={100}>
                      Quantidade de vendas
                  </Typography>

                  <Box padding={1} display='flex' justifyContent='right' alignItems='center'>
                    {!isLoadingSales &&(
                      <Typography variant='h6'>
                        {totalCountySales}
                      </Typography>
                    )}

                    {isLoadingSales && (
                      <Typography>
                        <CircularProgress size={30} />
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
              <Card>
                <CardContent>
                  <Box height={theme.spacing(60)} padding={1} display='flex' justifyContent='center' alignItems='center'>
                    <BarChart sellers={sellers} values={sales} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <Card>
                <CardContent>
                  <Box height={theme.spacing(60)} padding={1} display='flex' justifyContent='center' alignItems='center'>
                    <PieChart cities={cities} values={quantityPeople} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};