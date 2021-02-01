import React from 'react'
import useStyles from "../themes/theme.card";
import { Typography} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {  Card } from "@material-ui/core";
import img from '../icons/uni.jpg'

const CardItem = (props) => {
    const classes = useStyles();

    return (
      <Card className={classes.card}>
        <CardMedia
          component="img"
          image={img}
          className={classes.cover}
          title="Live from space album cover"
        />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
           maintitle
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            titletext
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </CardContent>
      </Card>
    );
}


export default CardItem;