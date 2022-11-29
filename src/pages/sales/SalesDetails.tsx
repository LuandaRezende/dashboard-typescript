import { Alert, Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToobarDetail } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { BaseLayout } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import * as yup from 'yup';
import { AutoCompletePeople } from './components/AutoCompletePeople';
import { SalesService } from '../../shared/services/api/sales/SalesService';

interface IFormData{
    title: string;
    description: string;
    value: number;
    personId: number;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  title: yup.string().required().min(3),
  description: yup.string().required(),
  value: yup.number().required(),
  personId: yup.number().required(),
});

interface IAlert{
  typeMessage: string;
  alertMessage: string;
}

export const AlertComponentSales: React.FC<IAlert> = ({ typeMessage, alertMessage }) => {
  return(
    <div>
      {typeMessage === 'warning' && (
        <Alert severity="warning">
          {alertMessage}
        </Alert>
      )}

      {typeMessage === 'error' && (
        <Alert severity="error">
          {alertMessage}
        </Alert>
      )}

      {typeMessage === 'success' && (
        <Alert severity="success">
          {alertMessage}
        </Alert>
      )}

      {typeMessage === 'info' && (
        <Alert severity="info">
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};

export const SalesDetails: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [ alert, setAlert ] = useState(false);
  const [ typeMessage, setTypeMessage ] = useState('success');
  const [ alertMessage, setAlertMessage ] = useState('');

  useEffect(() => {
    if(id !== 'new'){
      setIsLoading(true);
      SalesService.getById(Number(id)).then(
        (result) => {
          setIsLoading(false);  

          if(result instanceof Error){
            setAlert(true);
            setTypeMessage('error');
            setAlertMessage(result.message);
            navigate('/people');
          }else{
            setTitle(result.title);
            formRef.current?.setData(result);
          } 
        }
      ); 
    }else{
      formRef.current?.setData({
        title: '',
        personId: undefined,
        description: '',
        value: 0,
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    formValidationSchema.validate(data, {
      abortEarly: false
    }).then((dataValidated) => {
      if(id === 'new'){
        SalesService.create(dataValidated).then((result) => {
          if(result instanceof Error){ 
            setAlert(true);
            setTypeMessage('error');
            setAlertMessage(result.message);
          }else{
            if(isSaveAndClose()){
              navigate('/sales');
            }else{
              navigate(`/sales/details/${result}`);
            }
            setAlert(true);
            setTypeMessage('success');
            setAlertMessage('Salvo com sucesso');
          }
          setTimeout(() => {
            setAlert(false);
          }, 2000);
        });
      }else{
        SalesService.updateById(Number(id), {id: Number(id), ...dataValidated}).then(
          (result) => {
            setIsLoading(false);  
      
            if(result instanceof Error){
              setAlert(true);
              setTypeMessage('error');
              setAlertMessage(result.message);
            }else{
              if(isSaveAndClose()){
                navigate('/sales');
              }
              setAlert(true);
              setTypeMessage('success');
              setAlertMessage('Salvo com sucesso');
            }
            setTimeout(() => {
              setAlert(false);
            }, 2000);
          }
        ); 
      }
    }).catch((errors: yup.ValidationError) => {
      setIsLoading(false);  

      const ValidationErrors: IVFormErrors = {};

      errors.inner.forEach(error => {
        if(!error.path){
          return;
        }

        ValidationErrors[error.path] = error.message;
      });

      formRef.current?.setErrors(ValidationErrors);
    });
  };

  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja apagar?')){
      PeopleService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            setAlert(true);
            setTypeMessage('error');
            setAlertMessage(result.message);
          }else{
            setAlert(true);
            setTypeMessage('success');
            setAlertMessage('Registro apagado com sucesso');
            navigate('/sales');
          }
        });
    }
  };
    
  return (
    <BaseLayout 
      title={id === 'new' ? 'Nova venda' : `Edição da venda "${title}"`}
      toolbar={
        <ToobarDetail 
          textNewButton="Nova"
          showSaveCloseButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}

          saveItem={save}
          saveAndCloseItem={saveAndClose}
          deleteItem={() => handleDelete(Number(id))}
          newItem={() => {navigate('/people/details/new');}}
          returnItem={() => {navigate('/people');}}
        />
      }
    >
      {alert && (<div>
        <AlertComponentSales typeMessage={typeMessage} alertMessage={alertMessage} />
      </div>)}

      <VForm ref={formRef} onSubmit={(dataForm) => handleSave(dataForm)} initialData={{}}>
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
                <VTextField fullWidth label='Título da venda' onChange={(e) => setTitle(e.target.value)} name="title" disabled={isLoading}/>
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField fullWidth label='Descrição' name="description" disabled={isLoading} />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField fullWidth label='Preço' name="value" disabled={isLoading} />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <AutoCompletePeople isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
          
        </Box>
      </VForm>

      {isLoading && (
        <LinearProgress variant="indeterminate"></LinearProgress>
      )}
    </BaseLayout>
  );
};