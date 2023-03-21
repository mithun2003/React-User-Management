import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser } from "../../action/userAction";
import axios from '../../axios'
const AdminEdit = () => {
  const theme = createTheme();
  const { id } = useParams();
  const user = useSelector((state) => state.login.user);
  const users = useSelector((state) => state.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [image, setImage] = useState(null);
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);
  useEffect(() => {
    console.log(users);
    setName(users.name);
    setEmail(users.email);
    setPhonenumber(users.phonenumber);
    setImage(users.image);
  }, [users]);

  const updateForm = (e) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phonenumber)
    if(fileRef.current.files.length > 0){
       console.log('image appended')
      formData.append('image', fileRef.current.files[0], fileRef.current.files[0]?.name)
    }
    console.log(formData);
    axios
      .post('api/users/update/user/'+id, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        console.log("hello");
        console.log(response.data);
        setName(response.data.name)
        setEmail(response.data.email)
        setPhonenumber(response.data.phone)
        setImage(response.data.image)
        setImage(response.data.image);
      })
      .then(() => navigate("/admin"))
      .catch((error) => setError("Please choose an image"));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: "7rem" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            src={image ? image : null}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <p className='error' style={{marginBottom: '1rem'}}>{error}</p>
            <Grid container spacing={2}>
              <p className='error'>{error && error}</p>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="text"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Profile Picture
                  <input
                    type="file"
                    name="image"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      setImage(URL.createObjectURL(e.target.files[0]))
                    }
                    ref={fileRef}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={updateForm}
            >
              Update
              {/* {registerState.loading ? 'Loading...' : 'Update'} */}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AdminEdit;
