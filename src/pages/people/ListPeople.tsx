import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToolbarList } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { BaseLayout } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

export const ListPeople: React.FC = () => {
  const [ searchParams, setSearchParams ] = useSearchParams(); 
  const { debounce } = useDebounce(3000, false);
  
  const search = useMemo(()=> {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      PeopleService.getAll(1, search).then((result) => {
        if(result instanceof Error){
          alert(result.message);
          return;
        }
  
        console.log(result);
      });
    });    
  }, [search]);

  return (
    <BaseLayout title="Listagem de pessoas" 
      toolbar={<ToolbarList textNewButton="Nova" showInputSearch textSearch={search} changeTextSearch={text => setSearchParams({search: text}, {replace: true})}/>}>
    </BaseLayout>
  );
};