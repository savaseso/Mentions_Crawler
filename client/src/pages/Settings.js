import React, { useState } from "react";
import useStyles from "../themes/theme.settings";
import { Grid } from "@material-ui/core";
import { Typography, Container, Box } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import SettingsForm from "../components/SettingsForm";
import SettingsIcon from "@material-ui/icons/Settings";


const Settings = (props) => {
  const classes = useStyles(props);

  const logout = () => {
    //1. remove cookie

    //2.push to login
    props.history.push("/login");
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={4}>
          <Box className={classes.menu}>
            <Typography className={classes.menuTitle} variant="h4">
              Settings <SettingsIcon className={classes.settingIcon} />
            </Typography>
            <MenuList>
              <MenuItem className={classes.selected} selected>
                Company
              </MenuItem>
              <MenuItem className={classes.selected}>Security</MenuItem>
              <MenuItem className={classes.selected} onClick={logout}>
                Log out
              </MenuItem>
            </MenuList>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <SettingsForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
