import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import { withRouter } from "react-router-dom";
import { Context } from "../context";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#6583F2",
    height: 100,
  },

  menuButton: {
    marginRight: theme.spacing(2),
    border: "2px solid",
    width: "150px",
    height: "52px",
    borderRadius: "30px",
    marginLeft: "2rem",
  },
  settingIcon: {
    fontSize: "30px",
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = (props) => {
  const { isLoggedIn } = useContext(Context);
  const { pathname } = props.location;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            mentions<span style={{ color: "#284097" }}>crawler.</span>
          </Typography>
          {!isLoggedIn ? (
            <React.Fragment>
              <Typography variant="h6">
                {pathname === "/signup" ? "Already" : "Don't"} have an account?
              </Typography>
              <Button
                href={pathname === "/signup" ? "/login" : "/signup"}
                color="inherit"
                className={classes.menuButton}
              >
                {pathname === "/signup" ? "LOGIN" : "SIGN UP"}
              </Button>
            </React.Fragment>
          ) : (
            <Link to="/settings"><SettingsIcon className={classes.settingIcon} /></Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
