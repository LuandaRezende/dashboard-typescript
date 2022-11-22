import { Alert, Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToobarDetail } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { BaseLayout } from '../../shared/layouts';
import { CitysService } from '../../shared/services/api/citys/CitysService';
import * as yup from 'yup';

interface IFormData{
  name: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
});

interface IAlertC{
  typeMessage: string;
  alertMessage: string;
}

export const AlertComponentC: React.FC<IAlertC> = ({ typeMessage, alertMessage }) => {
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

export const CitysDetails: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [ alert, setAlert ] = useState(false);
  const [ typeMessage, setTypeMessage ] = useState('success');
  const [ alertMessage, setAlertMessage ] = useState('');

  useEffect(() => {
    if(id !== 'new'){
      setIsLoading(true);
      CitysService.getById(Number(id)).then(
        (result) => {
          setIsLoading(false);  

          if(result instanceof Error){
            setAlert(true);
            setTypeMessage('error');
            setAlertMessage(result.message);
            navigate('/citys');
          }else{
            setName(result.name);
            formRef.current?.setData(result);
            setAlert(true);
            setTypeMessage('success');
            setAlertMessage('Salvo com sucesso');
          } 
        }
      ); 
    }else{
      formRef.current?.setData({
        name: '',
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    formValidationSchema.validate(data, {
      abortEarly: false
    }).then((dataValidated) => {
      if(id === 'new'){
        CitysService.create(dataValidated).then((result) => {
          if(result instanceof Error){ 
            setAlert(true);
            setTypeMessage('error');
            setAlertMessage(result.message);
            navigate('/citys');
          }else{
            if(isSaveAndClose()){
              navigate('/citys');
              setAlert(true);
              setTypeMessage('success');
              setAlertMessage('Salvo com sucesso');
            }else{
              navigate(`/citys/details/${result}`);
              setAlert(true);
              setTypeMessage('success');
              setAlertMessage('Salvo com sucesso');
            }
          }
        });

        setTimeout(() => {
          setAlert(false);
        }, 2000);
      }else{
        CitysService.updateById(Number(id), {id: Number(id), ...dataValidated}).then(
          (result) => {
            setIsLoading(false);  
      
            if(result instanceof Error){
              setAlert(true);
              setTypeMessage('error');
              setAlertMessage(result.message);
            }else{
              if(isSaveAndClose()){
                navigate('/citys');
                setAlert(true);
                setTypeMessage('success');
                setAlertMessage('Salvo com sucesso');
              }
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
      CitysService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            setAlert(true);
            setTypeMessage('error');
            setAlertMessage(result.message);
          }else{
            setAlert(true);
            setTypeMessage('success');
            setAlertMessage('Apagado com sucesso');
            navigate('/citys');
          }
          setTimeout(() => {
            setAlert(false);
          }, 2000);
        });
    }
  };
    
  return (
    <BaseLayout 
      title={id === 'new' ? 'Nova cidade' : `Edição de ${name}`}
      toolbar={
        <ToobarDetail 
          textNewButton="Nova"
          showSaveCloseButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          saveItem={save}
          saveAndCloseItem={saveAndClose}
          deleteItem={() => handleDelete(Number(id))}
          newItem={() => {navigate('/citys/details/new');}}
          returnItem={() => {navigate('/citys');}}
        />
      }
    >

      {alert && (<div>
        <AlertComponentC typeMessage={typeMessage} alertMessage={alertMessage} />
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
                <VTextField fullWidth label='Nome cidade' onChange={(e) => setName(e.target.value)} name="name" disabled={isLoading}/>
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