import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, Grid, Box, Checkbox, Container,FormControlLabel, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { onRegistration } from '../api/auth';


const theme = createTheme();

const Adduser = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    admin: false
  });

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(()=> {
    console.log(inputs);
  }, [inputs])

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const onChangeBool = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.checked})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await onRegistration(inputs)

      setError('')
      setSuccess(data.message)
      setInputs({ email: '', password: '', fname:'', lname:'', admin: false })
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Sidebar />
      </div>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            minHeight: "100vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "grey" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="left">
            Add a New User
          </Typography>

        <Box alignItems="flex-start"  justifyContent="flex-start" component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} alignItems="flex-start" justifyContent="flex-start">
            <Grid item xs={12} sm={6}>
              <TextField
                name="fname"
                required
                fullWidth
                id="firstName"
                value={inputs.fname}
                label="First Name"
                autoComplete="given-name"
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={inputs.lname}
                name="lname"
                autoComplete="family-name"
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                value={inputs.email}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                value={inputs.password}
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <FormControlLabel
                control={<Checkbox checked={inputs.admin}/>} 
                // value={inputs.admin}
                onChange={e => onChangeBool(e)}
                label="Administrator"
                name="admin"
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add User
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/dashboard" variant="body2">
                Cancel
              </Link>
            </Grid>
          </Grid>
        </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Adduser;