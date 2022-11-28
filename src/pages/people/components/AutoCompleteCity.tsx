import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CitiesService } from '../../../shared/services/api/cities/CitiesService';

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCityProps {
    isExternalLoading?: boolean;
}

export const AutoCompleteCity: React.FC<IAutoCompleteCityProps> = ({ isExternalLoading = false }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cityId');
  const { debounce } = useDebounce();
  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [ isLoading, setIsLoading] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ selectedId, setSelectedId ] = useState<number | undefined>(defaultValue);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1).then((result) => {
        setIsLoading(false);

        if(result instanceof Error){
          alert(result.message);
          return;
        }
  
        setOptions(result.data.map(city => ({ id: city.id, label: city.name })));
      });
    }); 
  }, [search]);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue : () => selectedId,
      setValue: (_,newSelectedId) => setSelectedId(newSelectedId) 
    });
  },[registerField, fieldName, selectedId]);

  const autoCompleteSelectedOption = useMemo(() => {
    if(!selectedId) return null;

    const selectedOption = options.find(option => option.id === selectedId);
    if(!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);

  return(
    <Autocomplete
      loading={isLoading}
      popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={25} /> : undefined}
      disabled={isExternalLoading}
      openText='Abrir'
      closeText='Fechar'
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disablePortal
      onInputChange={(_, newValue) => setSearch(newValue)}
      value={autoCompleteSelectedOption}
      options={options}
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError(); }}
      renderInput={(params) => (
        <TextField 
          {...params}
          label="Cidade"
          helperText={error}
          error={!!error}
        />
      )}
    />
  );
};