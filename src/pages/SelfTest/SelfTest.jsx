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

import axios from '../../utils/axios';
import useFetch from '../../utils/useFetch';

const theme = createTheme();

function SelfTest() {
  const { data, loading, setLoading, error, setError } = useFetch(
    '/questionnaires?title=Emotional map',
  );

  const [show, setShow] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answer, setAnswer] = React.useState([]);
  const [emotional, setEmotional] = React.useState(null);

  //Post answer for quiz

  const postData = async () => {
    try {
      const { data } = await axios.post(
        '/emotional-maps?userId=3',
        { answers: answer },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setEmotional(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  //param UserId

  //Get Emotional Map
  // const getEmotionalMap = async () => {
  //   try {
  //     const res = await axios.get('http://44.210.115.207:8080/emotional-maps?userId=3');
  //     setEmotional(res);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAnswerOptionClick = (currentAnswer) => {
    const updateAnswear = [...answer, { ...currentAnswer }];
    setAnswer(updateAnswear);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      postData();
      // getEmotionalMap();

      setShow(!show);
    }
  };

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
                zIndex: '1000',
                position: 'relative',
              }}
              size="large"
              variant="contained"
              sx={{ m: 2 }}
              component={Link}
              to="/">
              Go Back
            </Button>
            {show ? (
              emotional && <Chart pieChart={emotional}></Chart>
            ) : (
              <Card
                sx={{
                  maxWidth: 538,
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
                  <CardContent>
                    {error && (
                      <Typography>{`There is a problem fetching the post data - ${error}`}</Typography>
                    )}
                    <Typography
                      style={{ position: 'relative', zIndex: '100' }}
                      variant="h5"
                      align="left"
                      color="text.secondary"
                      paragraph
                      maxWidth="sm">
                      Question {currentQuestion + 1}/{data && data.length}
                    </Typography>

                    <CardContent>
                      <Typography
                        style={{ position: 'relative', zIndex: '100' }}
                        variant="h5"
                        align="left"
                        color="text.secondary"
                        paragraph
                        maxWidth="sm">
                        {data && data[currentQuestion].questionText}
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
                          {data &&
                            data[currentQuestion].answers.map((element) => (
                              <Grid
                                xs={6}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                columnSpacing={2}
                                item
                                key={element.value}>
                                <Button
                                  onClick={(e) => handleAnswerOptionClick(element)}
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
                        </Grid>
                      </Box>
                    </CardActions>
                  </CardContent>
                )}
              </Card>
            )}
          </Container>
        </Box>
        <img className="main_img" src={Oval} alt="" />
      </main>
    </ThemeProvider>
  );
}

export default SelfTest;
