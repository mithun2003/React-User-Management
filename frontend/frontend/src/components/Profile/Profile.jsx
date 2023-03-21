import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../axios";
import "./Profile.css";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../action/userAction";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const users = useSelector((state) => state.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const theme = createTheme();
  const fileRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(user.id));
  }, []);
  useEffect(() => {
    console.log(users);
    setName(users.name);
    setEmail(users.email);
    setPhonenumber(users.phonenumber);
    setImage(users.image);
  }, [users]);

  const updateImage = (e) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    console.log(file);
    if (!file) {
      setError("Please select an image.");
      return;
    }
    const formData = new FormData();

    formData.append("image", file, file?.name);
    console.log(formData);
    axios
      .patch(`api/users/edit/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        console.log("hello");
        console.log(image);
        // dispatch(updateUser(response.data.image));
        // navigate('/')
        console.log(response.data.image);
        console.log(response.data);
        console.log(user.image);
        setImage(response.data.image);
        console.log(user.image);
      })
      .then(() => navigate("/"))
      .catch((error) => setError("Please choose an image"));
  };

  const imageUpload = (e) => {
    console.log(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    return setImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <div className="profile-page">
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
              <Avatar src={image}></Avatar>
              <Typography component="h1" variant="h5">
                Edit User
              </Typography>
              {error && (
                <Alert severity="warning">
                  <strong>{error}</strong>
                </Alert>
              )}
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                encType="multipart/form-data"
                onSubmit={updateImage}
              >
                <p className="error">{error && "Please select a file"}</p>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <p>{name}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <p>{email}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <p>{phonenumber}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" component="label">
                      Upload Profile Picture
                      <input
                        type="file"
                        name="image"
                        hidden
                        ref={fileRef}
                        accept="image/*"
                        onChange={imageUpload}
                      />
                    </Button>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save Changes
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                  style={{ backgroundColor: "red" }}
                  onClick={()=>navigate('/')}
                >
                 Cancel
                </Button>
              </Box>
            </Box>
          </Container>
          <Snackbar autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: "100%" }}>
              Image uploaded successfully
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Profile;
