import * as React from 'react';
import Oval from '../../assets/Oval.svg';

import CssBaseline from '@mui/material/CssBaseline';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { useCookie } from '../../hooks/useCoockie';

import moment from 'moment';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/axios';
import Chart from '../../components/PieChart/PieChart';
import { useEffect } from 'react';

const theme = createTheme();

const OvalStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  maxWidth: '100%',
  maxHeight: '100%',
};

function Profile() {
  const { user, anonymousToken } = useAuth();
  const [emotional, setEmotional] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [UserID, setUserID] = React.useState(() => (user === null ? anonymousToken : user.id));
  const [time, setTime] = React.useState(null);
  useEffect(() => {
    setUserID(() => (user === null ? anonymousToken : user.id));
  }, [anonymousToken, user]);

  const getEmotionalMap = async () => {
    try {
      const { data } = await axios.get(`/emotional-maps?userId=${UserID}`);

      setEmotional(data.diagramValues);
      setTime(data.createDate);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (UserID) {
      getEmotionalMap();
    }
  }, [UserID]);

  // if (user) getEmotionalMap();
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
              {loading ? (
                <Typography
                  variant="h5"
                  align="left"
                  color="text.secondary"
                  paragraph
                  maxWidth="sm">
                  A moment please...
                </Typography>
              ) : (
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="backgroud_color">
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
                  </div>
                  <Box sx={{p:2}}>
                    <Typography
                      style={{
                        position: 'relative',
                        zIndex: '100',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      variant="h5"
                      align="center"
                      color="text.secondary"
                      maxWidth="sm">
                      Full Name :<br></br> {user && user.username}
                    </Typography>
                    <hr />
                    <Typography
                      style={{
                        position: 'relative',
                        zIndex: '100',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      variant="h5"
                      align="center"
                      color="text.secondary"
                      maxWidth="sm">
                      Email :<br></br> {emotional && user.email}
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
              )}
              <Button
                style={{
                  textTransform: 'none',
                  background: '#03ACF2',
                }}
                size="large"
                variant="contained"
                sx={{ m: 2 }}
                onClick={() => setShow(!show)}>
                Show results
              </Button>
              {show ? (
                emotional && (
                  <>
                    <Typography variant="h6" align="center" color="text.secondary" maxWidth="sm">
                      Last take quiz :<br></br> {new Date(time + 'Z').toLocaleString()}
                    </Typography>
                    <Chart pieChart={emotional} width={200} height={200} outerRadius={60}></Chart>
                  </>
                )
              ) : (
                <></>
              )}
            </Card>
          </Container>
        </Box>
        <img style={OvalStyle} src={Oval} className="noselect" alt="" />
      </main>
    </ThemeProvider>
  );
}

export default Profile;
