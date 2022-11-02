import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToolbarList } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { BaseLayout } from '../../shared/layouts';
import { IListPeople, PeopleService } from '../../shared/services/api/people/PeopleService';

export const ListPeople: React.FC = () => {
  const [ searchParams, setSearchParams ] = useSearchParams(); 
  const { debounce } = useDebounce();

  const [row, setRow] = useState<IListPeople[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(()=> {
    return searchParams.get('search') || '';
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
  
        setRow(result.data);
        setTotalCount(result.totalCount);
      });
    }); 
  }, [search]);

  return (
    <BaseLayout title="Listagem de pessoas" 
      toolbar={<ToolbarList textNewButton="Nova" showInputSearch textSearch={search} changeTextSearch={text => setSearchParams({search: text}, {replace: true})}/>}>
    </BaseLayout>
  );
};