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

const questions = [
  {
    questionText: 'How often do you cry?',
    answerOptions: [
      { answerText: 'Once a day at least' },
      { answerText: 'Around once a week ' },
      { answerText: 'Once a month usually on my period' },
      { answerText: 'Hardly ever' },
    ],
  },
  {
    questionText: 'How often do you cry?',
    answerOptions: [
      { answerText: 'Once a day at least' },
      { answerText: 'Around once a week ' },
      { answerText: 'Once a month usually on my period' },
      { answerText: 'Hardly ever' },
    ],
  },
  {
    questionText: 'How often do you cry?',
    answerOptions: [
      { answerText: 'Once a day at least' },
      { answerText: 'Around once a week ' },
      { answerText: 'Once a month usually on my period' },
      { answerText: 'Hardly ever' },
    ],
  },
  {
    questionText: 'How often do you cry?',
    answerOptions: [
      { answerText: 'Once a day at least' },
      { answerText: 'Around once a week ' },
      { answerText: 'Once a month usually on my period' },
      { answerText: 'Hardly ever' },
    ],
  },
];

function SelfTest() {
  const [show, setShow] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answer, setAnswer] = React.useState([]);

  const handleAnswerOptionClick = (currentAnswer) => {
    const updateAnswear = [
      ...answer,
      { name: currentAnswer, value: Math.floor(Math.random() * 100) },
    ];
    setAnswer(updateAnswear);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
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
              }}
              size="large"
              variant="contained"
              sx={{ m: 2 }}
              component={Link}
              to="/">
              Go Back
            </Button>
            {show ? (
              <Chart pieChart={answer}></Chart>
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
                    Question {currentQuestion + 1}/{questions.length}
                  </Typography>

                  <CardContent>
                    <Typography
                      style={{ position: 'relative', zIndex: '100' }}
                      variant="h5"
                      align="left"
                      color="text.secondary"
                      paragraph
                      maxWidth="sm">
                      {questions[currentQuestion].questionText}
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
                        {questions[currentQuestion].answerOptions.map((element) => (
                          <Grid
                            xs={6}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            columnSpacing={2}
                            item
                            key={element.answerText}>
                            <Button
                              onClick={(e) => handleAnswerOptionClick(element.answerText)}
                              style={{
                                textTransform: 'none',
                                background: '#03ACF2',
                              }}
                              size="large"
                              variant="contained">
                              {element.answerText}
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
