import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IUser } from '../interfaces/user';
import { PATH_API } from '../utils/constants';

const UserPage = () => {

  const [users, setUsers] = useState<IUser[]>([]);
  const [average, setAverage] = useState(0);

  const loadUsers = async () => {
    try {
      const response = await fetch(`${PATH_API}/user/list`);
      const data = await response.json();
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  const loadAverage = async () => {
    try {
      const response = await fetch(`${PATH_API}/user/average`);
      const data = await response.json();
      setAverage(data?.average)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadUsers();
    loadAverage()
  }, []);


  return (
    <Grid
      container
      direction={'column'}
      justifyContent={'center'}
    >
      {users.length > 0 && (<h3>Usuarios</h3>)}
      {users.map((user) => (
        <Card
          key={user.id}
          style={{
            marginBottom: ".7rem",
            minWidth: "200px",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "white",
              }}
            >
              <Typography>Nombre: {user.name}</Typography>
              <Typography>Apellido: {user.surname}</Typography>
              <Typography>Fecha de nacimiento: {user.birthday}</Typography>
            </div>
          </CardContent>
        </Card>
      ))}
      {users.length > 0 && (<h3>Promedio de edades: {average}</h3>)}
    </Grid>
  )
};

export default UserPage;
