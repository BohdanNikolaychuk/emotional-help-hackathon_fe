import * as React from 'react';
import Button from '@mui/material/Button';
import Oval from '../../assets/Oval.svg';

import CssBaseline from '@mui/material/CssBaseline';
import { SLIDE_INFO } from '../../assets/constants';
import CarouselSlide from '../../components/Carousel/CarouselSlide';
import Slide from '@mui/material/Slide';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const theme = createTheme();

function Arrow(props) {
  const { direction, clickFunction } = props;
  const icon = direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />;

  return <div onClick={clickFunction}>{icon}</div>;
}

function MoreInfo() {
  const [index, setIndex] = React.useState(0);
  const content = SLIDE_INFO[index];
  const numSlides = SLIDE_INFO.length;

  const [slideIn, setSlideIn] = React.useState(true);
  const [slideDirection, setSlideDirection] = React.useState('down');

  const onArrowClick = (direction) => {
    const increment = direction === 'left' ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;

    const oppDirection = direction === 'left' ? 'right' : 'left';
    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
      setIndex(newIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 500);
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
          <Container
            style={{
              zIndex: '1000',
              position: 'relative',
            }}
            maxWidth="lg">
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
            <Typography variant="h5" align="left" color="text.secondary" paragraph maxWidth="sm">
              5 Reasons Emotions Are Important
            </Typography>
            <Box display="flex" justifyContent="left" alignItems="center">
              <Arrow
                sx={{ position: 'absolute' }}
                direction="left"
                clickFunction={() => onArrowClick('left')}
              />
              <Slide in={slideIn} direction={slideDirection}>
                <div>
                  <CarouselSlide content={content} />
                </div>
              </Slide>
              <Arrow direction="right" clickFunction={() => onArrowClick('right')} />
            </Box>
          </Container>
        </Box>
        <img className="main_img noselect" src={Oval} alt="" />
      </main>
    </ThemeProvider>
  );
}

export default MoreInfo;
