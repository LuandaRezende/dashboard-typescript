import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToobarDetail } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { BaseLayout } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

interface IFormData{
    email: string;
    fullName: string;
    cityId: number;
}

export const PeopleDetails: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if(id !== 'new'){
      setIsLoading(true);
      PeopleService.getById(Number(id)).then(
        (result) => {
          setIsLoading(false);  

          if(result instanceof Error){
            alert(result.message);
            navigate('/people');
          }else{
            setName(result.fullName);
            formRef.current?.setData(result);
          } 
        }
      ); 
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    if(id === 'new'){
      PeopleService.create(data).then((result) => {
        if(result instanceof Error){
          alert(result.message);
        }else{
          navigate(`/people/details/${result}`);
        }
      });
    }else{
      PeopleService.updateById(Number(id), {id: Number(id), ...data}).then(
        (result) => {
          setIsLoading(false);  
    
          if(result instanceof Error){
            alert(result.message);
          }
        }
      ); 
    }
  };

  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja apagar?')){
      PeopleService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            alert(result.message);
          }else{
            alert('Registro apagado com sucesso!');
            navigate('/people');
          }
        });
    }
  };
    
  return (
    <BaseLayout 
      title={id === 'new' ? 'Nova pessoa' : `Edição de ${name}`}
      toolbar={
        <ToobarDetail 
          textNewButton="Nova"
          showSaveCloseButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}

          saveItem={() => formRef.current?.submitForm()}
          saveAndCloseItem={() => formRef.current?.submitForm()}
          deleteItem={() => handleDelete(Number(id))}
          newItem={() => {navigate('/people/details/new');}}
          returnItem={() => {navigate('/people');}}
        />
      }
    >

      <Form ref={formRef} onSubmit={(dataForm) => handleSave(dataForm)} initialData={{}}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
          <Grid container direction="column" padding={2} spacing={2}>
            
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate"/>
              </Grid>
            )}
           
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField fullWidth label='Nome completo' onChange={(e) => setName(e.target.value)} name="fullName" disabled={isLoading}/>
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField fullWidth label='Email' name="email" disabled={isLoading} />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField fullWidth label='Cidade' name="cityId" disabled={isLoading}/>
              </Grid>
            </Grid>
          </Grid>
          
        </Box>
      </Form>

      {isLoading && (
        <LinearProgress variant="indeterminate"></LinearProgress>
      )}

      <p>detalhe de pessoas  {id}</p>

    </BaseLayout>
  );
};