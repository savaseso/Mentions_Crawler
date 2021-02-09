import React from 'react'
import useStyles from "../css/card";
import { Typography} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {  Card } from "@material-ui/core";

const CardItem = (props) => {
    const classes = useStyles();
    const {author, company,text, img} = props.mention
    return (
      <Card className={classes.card}>
        <CardMedia
          component="img"
          image={img}
          className={classes.cover}
          title="Picture"
        />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {author}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
           {company}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
      </Card>
    );
}


export default CardItem;