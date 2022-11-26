import * as React from 'react';
import Button from '@mui/material/Button';
import Oval from '../../assets/Oval.svg';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Chart from '../../components/PieChart/PieChart';

const theme = createTheme();
const OvalStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  maxWidth: '100%',
  maxHeight: '100%',
};

const values = [
  {
    value: 'value1',
  },
  {
    value: 'value2',
  },
  {
    value: 'value3',
  },
  {
    value: 'value4',
  },
];

function SelfTest() {
  const [show, setShow] = React.useState(false);

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
            {show ? (
              <Chart></Chart>
            ) : (
              <Card
                sx={{
                  maxWidth: 538,
                  position: 'relative',
                  zIndex: '100',
                  border: '1px solid #03ACF2',
                }}>
                <CardContent>
                  <Typography
                    style={{ position: 'relative', zIndex: '100' }}
                    variant="h5"
                    align="left"
                    color="text.secondary"
                    paragraph
                    maxWidth="sm">
                    question 1/20
                  </Typography>

                  <CardContent>
                    <Typography
                      style={{ position: 'relative', zIndex: '100' }}
                      variant="h5"
                      align="left"
                      color="text.secondary"
                      paragraph
                      maxWidth="sm">
                      How easy is it to talk about your feelings?
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Box sx={{ width: '100%' }}>
                      <Grid
                        container
                        spacing={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center">
                        {values.map((element) => (
                          <Grid
                            xs={6}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            columnSpacing={2}
                            item
                            key={element.value}>
                            <Button
                              onClick={() => setShow(!show)}
                              style={{
                                textTransform: 'none',
                                background: '#03ACF2',
                              }}
                              size="large"
                              variant="contained">
                              {element.value}
                            </Button>
                          </Grid>
                        ))}
                        {/*  */}
                      </Grid>
                    </Box>
                  </CardActions>
                </CardContent>
              </Card>
            )}
          </Container>
        </Box>
        <img style={OvalStyle} src={Oval} alt="" />
      </main>
    </ThemeProvider>
  );
}

export default SelfTest;
