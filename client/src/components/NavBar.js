import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1, 
    backgroundColor:'#6583F2',
    height:100
  },
  menuButton: {
    marginRight: theme.spacing(2),
    border:'1px solid',
    width:'150px',
    height:'52px',
    borderRadius:'20px'
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar  className={classes.root}>
          <Typography variant="h6" className={classes.title}>
           MentionsCrawler.
          </Typography>
          <Typography variant="h6" >
           Don't have an account?
          </Typography>
          <Button color="inherit" className={classes.menuButton}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
