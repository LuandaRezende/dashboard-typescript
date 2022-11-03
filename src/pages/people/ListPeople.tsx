import { useMemo, useEffect, useState } from 'react';
import { Box, LinearProgress, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { ToolbarList } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { BaseLayout } from '../../shared/layouts';
import { IListPeople, PeopleService } from '../../shared/services/api/people/PeopleService';
import { Environment } from '../../shared/environment';

export const ListPeople: React.FC = () => {
  const [ searchParams, setSearchParams ] = useSearchParams(); 
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListPeople[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(()=> {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(()=> {
    return searchParams.get('page') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeopleService.getAll(1, search).then((result) => {
        setIsLoading(false);

        if(result instanceof Error){
          alert(result.message);
          return;
        }
  
        setRows(result.data);
        setTotalCount(result.totalCount);
      });
    }); 
  }, [search]);

  return (
    <BaseLayout title="Listagem de pessoas" 
      toolbar={<ToolbarList textNewButton="Nova" showInputSearch textSearch={search} changeTextSearch={text => setSearchParams({search: text}, {replace: true})}/>}>
      {rows.length > 0 && (<TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{ row.fullName }</TableCell>
                <TableCell>{ row.email } </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate'/>
                </TableCell>
              </TableRow>
            )}

            {(totalCount > 0 && totalCount > Environment.LINE_LIMIT) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination count={10} variant="outlined" shape="rounded" />
                </TableCell>
              </TableRow>
            )} 
          </TableFooter>
        </Table>
      </TableContainer>)}

      {totalCount === 0 && !isLoading && (
        <Box component={Paper} variant="outlined" sx={{ m: 1, width: 'auto', p: 2 }}>Nenhum registro encontrado.</Box>
      )}
    </BaseLayout>
  );
};