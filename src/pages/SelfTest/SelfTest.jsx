import * as React from 'react';
import Button from '@mui/material/Button';
import Oval from '../../assets/Oval.svg';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useCookie } from '../../hooks/useCoockie';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Chart from '../../components/PieChart/PieChart';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/axios';
import useFetch from '../../utils/useFetch';
import { useEffect } from 'react';
import getLowestEmotional from "../../utils/getLowestEmotional";

const theme = createTheme();

function SelfTest() {
  const { data, loading, setLoading, error, setError } = useFetch(
    '/questionnaires?title=Emotional map',
  );
  const { user } = useAuth();

  const [show, setShow] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answer, setAnswer] = React.useState([]);
  const [emotional, setEmotional] = React.useState(null);
  const [emotionalLoading, setEmotionalLoading] = React.useState(false);
  const [badEmotion,setBadEmotion] = React.useState(null);
  const { anonymousToken } = useAuth();
  const [UserID, setUserId] = React.useState(() => (user === null ? anonymousToken : user.id));

  useEffect(() => {
    getEmotionalMap(UserID);
  
  }, [UserID]);

  useEffect(() => {
    setUserId(() => (user === null ? anonymousToken : user.id));

  }, [anonymousToken, user]);

useEffect(() => {
  getBadEmotion();
}, [emotional]);


  const postData = async () => {
    try {
      const { data } = await axios.post(
        `/emotional-maps?userId=${UserID}`,
        { answers: answer },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setEmotional(data.diagramValues);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getEmotionalMap = async (UserID) => {
    if (!UserID) {
      setShow(false);
      setEmotional(null);
      return;
    }

    try {
      setEmotionalLoading(true);
      const { data } = await axios.get(`/emotional-maps?userId=${UserID}`);

      setShow(true);
      setEmotional(data.diagramValues);


    } catch (e) {
      setShow(false);
      setEmotional(null);
      setCurrentQuestion(0);
    } finally {
      setEmotionalLoading(false);
    }
  };

  const getBadEmotion = async () =>{
    try {
         const badEmotion = getLowestEmotional(emotional);
         const {data} = await axios.get(`/advice/${badEmotion}`);
        setBadEmotion(data);

    } catch (error) {
      
    }
  }

  //param UserId

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

  const handleRepassTest = () => {
    setEmotional(null);
    setShow(false);
    setCurrentQuestion(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 15,
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

            {!!emotional && (
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
                onClick={handleRepassTest}>
                Take the test again
              </Button>
            )}

            {show ? (
              emotional && (
                <Container maxWidth="sm">
                  <Typography
                    variant="h5"
                    align="left"
                    color="text.secondary"
                    sx={{ zIndex: '1000', position: 'relative' }}
                    paragraph
                    maxWidth="sm">
                    Your result:
                  </Typography>
                  <Chart pieChart={emotional} width={260} height={300} outerRadius={120}></Chart>
                  <Typography
                    variant="p"
                    align="left"
                    color="text.secondary"
                    sx={{ zIndex: '1000', position: 'relative' }}
                    paragraph
                    maxWidth="sm">
                    Help with {badEmotion && badEmotion.feeling.toLowerCase()}
                  </Typography>{' '}
                  <Button
                    style={{
                      textTransform: 'none',
                      background: '#03ACF2',
                      zIndex: '1000',
                      position: 'relative',
                    }}
                    variant="contained"
                    sx={{ m: 1 }}
                    href={badEmotion && badEmotion.video}
                    target="_blank"
                    rel="noreferrer">
                    Go to video
                  </Button>
                  <Typography
                    variant="p"
                    align="left"
                    color="text.secondary"
                    sx={{ zIndex: '1000', position: 'relative' }}
                    paragraph
                    maxWidth="sm">
                    {badEmotion && badEmotion.tip}
                  </Typography>
                </Container>
              )
            ) : (
              <Card
                sx={{
                  maxWidth: 538,
                  position: 'relative',
                  zIndex: '100',
                  border: '1px solid #03ACF2',
                }}>
                {loading || emotionalLoading ? (
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
        <img className="main_img noselect" draggable={false} src={Oval} alt="" />
      </main>
    </ThemeProvider>
  );
}

export default SelfTest;
