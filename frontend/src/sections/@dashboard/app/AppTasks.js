import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image="/assets/illustrations/illustration_login.png"
          alt="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Product
          </Typography>
          <Typography variant="body2" color="text.secondary">
           This is demo card
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}