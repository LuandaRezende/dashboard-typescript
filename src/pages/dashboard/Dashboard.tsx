import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { BaseLayout } from '../../shared/layouts';
import { CitysService } from '../../shared/services/api/citys/CitysService';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { SalesService } from '../../shared/services/api/sales/SalesService';
import { BarChart } from '../../shared/components/graphics/BarChart';

export const Dashboard = () => {
  const [isLoadingCitys, setIsLoadingCitys] = useState(true);
  const [isLoadingPeople, setIsLoadingPeople] = useState(true);
  const [isLoadingSales, setIsLoadingSales] = useState(true);
  const [totalCountyCitys, setTotalCountCitys] = useState(0);
  const [totalCountyPeople, setTotalCountPeople] = useState(0);
  const [totalCountySales, setTotalCountSales] = useState(0);
  const [sellers, setSellers] = useState<string[]>([]);
  const [sales, setSales] = useState<number[]>([]);

  useEffect(() => {
    setIsLoadingCitys(true);
    setIsLoadingPeople(true);
    setIsLoadingSales(true);
  
    CitysService.getAll(1).then((result) => {
      setIsLoadingCitys(false);
  
      if(result instanceof Error){
        alert(result.message);
        return;
      }
    
      setTotalCountCitys(result.totalCount);
    });

    PeopleService.getAll(1).then((result) => {
      setIsLoadingPeople(false);
  
      if(result instanceof Error){
        alert(result.message);
        return;
      }
    
      setTotalCountPeople(result.totalCount);
    });

    SalesService.getAll(1).then((result) => {
      setIsLoadingSales(false);
  
      if(result instanceof Error){
        alert(result.message);
        return;
      }

      const valor = result.quantitySales;
      
      const newArray: {id: number; value: number; name: string}[] = [];

      for(let i = 0; i < valor.length; i++){
        const found = newArray.find(element => element.id === valor[i].id);

        if(found){
          const index = newArray.findIndex(element => element.id === valor[i].id);
          newArray[index].value = newArray[index].value + valor[i].value;
        }else{
          newArray.push(valor[i]);
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

      console.log('props', getSellers);
      
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
                    {!isLoadingCitys &&(
                      <Typography variant='h6'>
                        {totalCountyCitys}
                      </Typography>
                    )}

                    {isLoadingCitys && (
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

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card>
                <CardContent>
                  <Box padding={1} display='flex' justifyContent='center' alignItems='center'>
                    <BarChart sellers={sellers} values={sales} />
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