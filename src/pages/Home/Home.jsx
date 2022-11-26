import * as React from 'react';
import Button from '@mui/material/Button';
import Oval from '../../assets/Oval.svg';

import CssBaseline from '@mui/material/CssBaseline';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const theme = createTheme();

const OvalStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  maxWidth: '100%',
  maxHeight: '100%',
};

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 12,
            pb: 6,
          }}>
          <Container maxWidth="lg">
            <Typography
              style={{ position: 'relative', zIndex: '100' }}
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom>
              Emotional Help
            </Typography>
            <Typography
              style={{ position: 'relative', zIndex: '100' }}
              variant="h5"
              align="left"
              color="text.secondary"
              paragraph
              maxWidth="sm">
              Taking care of your emotional health is as important as taking care of your physical
              body. If your emotional health is out of balance, you may experience high blood
              pressure, ulcers, chest pain, or a host of other physical symptoms.
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={4} justifyContent="left">
              <Button
                style={{ textTransform: 'none', padding: '10px 35px' }}
                pr={2}
                variant="outlined">
                More Info
              </Button>

              <Button
                style={{ textTransform: 'none', padding: '10px 50px', background: '#03ACF2' }}
                component={Link}
                to="/selftest"
                pr={2}
                variant="contained">
                Self Test
              </Button>
            </Stack>
          </Container>
        </Box>
        <img style={OvalStyle} src={Oval} alt="" />
      </main>
    </ThemeProvider>
  );
}

export default Home;