import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Snackbar,
  SnackbarContent
} from '@mui/material';
import { useForm } from '../hooks/useForm';
import { IUser } from '../interfaces/user';
import { defaultDay } from '../utils/functions';
import { PATH_API } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {

  const navigate = useNavigate();
  const [user, onChange, cleanUserForm] = useForm<IUser>({
    name: '',
    surname: ''
  })

  const [showError, setshowError] = useState(false);

  useEffect(() => {
    setshowError(false)
  }, [user]);


  const onSubmit = async () => {
    if (
      user.name === '' ||
      user.surname === '' ||
      !user.birthday
    ) {
      setshowError(true)
    } else {
      const response = await fetch(`${PATH_API}/user/create`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const data = await response.json();
      if (data.status === 200) {
        cleanUserForm()
        navigate('/users')
      }
    }
  }

  return (
    <Grid
      container
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: '#1e272e',
            padding: '1rem'
          }}
        >
          <Typography variant='h5' textAlign={'center'} color={'white'}>
            Ingrese los datos
          </Typography>
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              variant="filled"
              label="Nombre"
              sx={{
                margin: ".5rem 0",
              }}
              name="name"
              onChange={(event) => onChange(event.target.value, 'name')}
              value={user.name}
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />

            <TextField
              variant="filled"
              label="Apellido"
              autoComplete=''
              sx={{
                margin: ".5rem 0",
              }}
              name="surname"
              onChange={(event) => onChange(event.target.value, 'surname')}
              value={user.surname}
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <TextField
              variant="filled"
              label="Cumpleaños"
              sx={{
                margin: ".5rem 0",
              }}
              type="date"
              value={user.birthday ?? defaultDay()}
              onChange={(event) => onChange(event.target.value, 'birthday')}
              name="birthday"
              inputProps={{ style: { width: '100%', color: "white" } }}
              InputLabelProps={{ style: { width: '100%', color: "white" } }}
            />
            <Button variant='contained' color='primary' onClick={onSubmit} style={{ marginTop: ".5rem" }}>
              Enviar
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showError}
      >
        <SnackbarContent style={{
          backgroundColor: '#1565c0',
        }}
          message={<span id="client-snackbar">Ingresa todos los campos</span>}
        />
      </Snackbar>
    </Grid>
  );
};

export default CreatePage;
