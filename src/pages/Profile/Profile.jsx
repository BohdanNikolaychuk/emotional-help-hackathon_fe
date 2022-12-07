import * as React from 'react';
import Oval from '../../assets/Oval.svg';

import CssBaseline from '@mui/material/CssBaseline';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useAuth} from "../../context/AuthContext";
const theme = createTheme();

const OvalStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  maxWidth: '100%',
  maxHeight: '100%',
};

function Profile() {

    const {user} = useAuth();

    console.log(user)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 12,
            pb: 6,
            mt: 10,
          }}>
          <Container sx={{ position: 'relative', zIndex: '100' }} maxWidth="lg">
            <Button
              style={{
                textTransform: 'none',
                background: '#03ACF2',
              }}
              size="large"
              variant="contained"
              sx={{ m: 2 }}
              component={Link}
              to="/">
              Go Back
            </Button>
            <Card
              sx={{
                maxWidth: 538,
                width: '100%',
                position: 'relative',
                zIndex: '100',
                border: '1px solid #03ACF2',
              }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box
                  sx={{
                    background: '#03ACF2',
                    width: '50%',
                    borderRadius: '20px',
                    mr: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'absolute',
                    }}
                    src="/broken-image.jpg"
                  />
                </Box>
                <Box>
                  <Typography
                    style={{ position: 'relative', zIndex: '100' }}
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    maxWidth="sm">
                    Full Name :<br></br> Johnatan Smith
                  </Typography>
                  <hr />
                  <Typography
                    style={{ position: 'relative', zIndex: '100' }}
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    maxWidth="sm">
                    Email :<br></br> example@example.com
                  </Typography>
                  <hr />
                  <Button
                    style={{
                      textTransform: 'none',
                      background: '#03ACF2',
                    }}
                    size="large"
                    variant="contained"
                    sx={{ m: 2 }}
                    component={Link}
                    to="/selftest">
                    Test Yourself
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
        <img style={OvalStyle} src={Oval} alt="" />
      </main>
    </ThemeProvider>
  );
}

export default Profile;