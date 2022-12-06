import * as React from 'react';
import Oval from '../../assets/Oval.svg';

import CssBaseline from '@mui/material/CssBaseline';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const OvalStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  maxWidth: '100%',
  maxHeight: '100%',
};

function Profile() {
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
                position: 'relative',
                zIndex: '100',
                border: '1px solid #03ACF2',
              }}>
              <CardContent sx={{ display: 'flex' }}>
                <Box sx={{ background: 'green', width: '100%' }}></Box>
                <Box>
                  <Typography
                    style={{ position: 'relative', zIndex: '100' }}
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                    maxWidth="sm">
                    Full Name : Johnatan Smith
                  </Typography>
                  <hr />
                  <Typography
                    style={{ position: 'relative', zIndex: '100' }}
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                    maxWidth="sm">
                    Email : example@example.com
                  </Typography>
                  <hr />
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
