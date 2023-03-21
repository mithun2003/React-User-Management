import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {saveUserAsync } from "../../action/registerAction";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const navigate = useNavigate();
  const {loading,success,error} = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = createTheme();
  const [phonenumber, setPhonenumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const handlePhoneNumberChange = (event) => {
    const phonenumberValue = event.target.value;
    setPhonenumber(phonenumberValue);

    // Regular expression for validating a phone number
    const phoneNumberRegex = /^\d{10}$/;

    if (phoneNumberRegex.test(phonenumberValue)) {
      setPhoneNumberError(false);
    } else {
      setPhoneNumberError(true);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      phonenumber,
      password
    };
    console.log(user);
    dispatch(saveUserAsync(user))
    console.log({success})
    

  };
  useEffect(() => {
    if (success) {
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');
    }
  }, [success]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={HandleSubmit}
            sx={{ mt: 3 }}
          >
             {error && (
        <div style={{ color: 'red' }}>
          {Object.values(error).map((value) => (
            <p key={value}>{value}</p>
          ))}
        </div>
      )}
    {/* {error && (
        <div>
          {error.email && <div>Email: {error.email}</div>}
          {error.password && <div>Password: {error.password}</div>}
        </div>
      )}      <div> */}

      {/* </div> */}
            {/* {registerState.error && <p>{registerState.error}</p>} */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phonenumber"
                  label="Phone Number"
                  name="phonenumber"
                  autoComplete="tel"
                  type="tel"
                  value={phonenumber}
                  onChange={handlePhoneNumberChange}
                  error={phoneNumberError}
                  helperText={
                    phoneNumberError ? "Please enter a valid phone number" : ""
                  }
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                Signup
               {loading ? 'Loading...' : 'Sign Up'} 
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
