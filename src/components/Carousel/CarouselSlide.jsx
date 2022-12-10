import React from 'react';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
export default function CarouselSlide(props) {
  const { backgroundColor, title, desc } = props.content;

  return (
    <Card
      sx={{
        backgroundColor,
        borderRadius: 5,
        maxWidth: 538,
        position: 'relative',
        zIndex: '100',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: 3,
      }}
      style={{
        maxHeight: '100vh',
      }}>
      <CardContent>
        <Typography
          style={{ position: 'relative', zIndex: '100' }}
          variant="h6"
          align="left"
          color="text.secondary"
          maxWidth="sm">
          {title}
        </Typography>
        <Typography
          style={{ position: 'relative', zIndex: '100' }}
          variant="p"
          align="left"
          maxWidth="sm">
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );
}
