import { useMemo, useEffect, useState } from 'react';
import { Box, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToolbarList } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { BaseLayout } from '../../shared/layouts';
import { IListCitys, CitysService } from '../../shared/services/api/citys/CitysService';
import { Environment } from '../../shared/environment';

export const ListCitys: React.FC = () => {
  const [ searchParams, setSearchParams ] = useSearchParams(); 
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListCitys[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(()=> {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(()=> {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitysService.getAll(page, search).then((result) => {
        setIsLoading(false);

        if(result instanceof Error){
          alert(result.message);
          return;
        }
  
        setRows(result.data);
        setTotalCount(result.totalCount);
      });
    }); 
  }, [search, page]);

  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja apagar?')){
      CitysService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            alert(result.message);
          }else{
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id),
            ]);
            alert('Registro apagado com sucesso!');
          }
        });
    }
  };

  return (
    <BaseLayout title="Listagem de cidades" 
      toolbar={<ToolbarList clickAddNewPerson={() => navigate('/citys/details/new')} textNewButton="Nova" showInputSearch textSearch={search} changeTextSearch={text => setSearchParams({search: text, page: '1'}, {replace: true})}/>}>
      {rows.length > 0 && (<TableContainer component={Paper} variant="outlined" sx={{ mt: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/citys/details/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{ row.name }</TableCell>
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
                  <Pagination 
                    count={Math.ceil(totalCount/Environment.LINE_LIMIT)} 
                    variant="outlined" shape="rounded" 
                    page={page}
                    onChange={(e, newPage) => setSearchParams({search, page: newPage.toString()}, {replace: true}) }
                  />
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