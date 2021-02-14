import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {useStyles} from "../css/navbar";
import { AuthContext } from "../authContext";




const NavBar = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { pathname } = props.location;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <span style={{ color: "#fff" }}>mentions</span>
              <span style={{ color: "#284097" }}>crawler.</span>
            </Link>
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
            <Link to="/settings">
              <SettingsIcon className={classes.settingIcon} />
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
