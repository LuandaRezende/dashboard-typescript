import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ToolbarList } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { CitysService } from '../../shared/services/api/citys/CitysService';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

export const Dashboard = () => {
  const [isLoadingCitys, setIsLoadingCitys] = useState(true);
  const [isLoadingPeople, setIsLoadingPeople] = useState(true);
  const [totalCountyCitys, setTotalCountCitys] = useState(0);
  const [totalCountyPeople, setTotalCountPeople] = useState(0);

  useEffect(() => {
    setIsLoadingCitys(true);
    setIsLoadingPeople(true);
  
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

  }, []);
    
  return (
    <BaseLayout 
      title='Pagina inicial'
      toolbar={<ToolbarList showNewButton={false}/>}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2} >
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                      Total de pessoas
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingPeople &&(
                      <Typography variant='h1'>
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

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                      Total de cidades
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingCitys &&(
                      <Typography variant='h1'>
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
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};