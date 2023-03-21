import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { adminLoginUser } from "../../action/adminLoginAction";

import axios from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const AdminLogin = () => {
   const [email,setEmail] = useState("")
   const { loading, error,success } = useSelector((state) => state.adminlogin);
   const dispatch = useDispatch();
   const [password,setPassword] = useState("")
    const theme = createTheme()
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      const user = {
        email,
        password
      };
      dispatch(adminLoginUser(user));
    };
    useEffect(() => {
      if (success) {
        setEmail('');
        setPassword('');
        navigate('/admin');
      }
    }, [success]);

  return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

          }}
          
        >
          <Avatar sx={{ m: 1, bgcolor: '#d32f2f' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <p className='error'>{error && error}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
          
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='error'
            >
              {loading ? 'Loading...' : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
 

  )
}

export default AdminLogin
