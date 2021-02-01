import React from 'react'
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import useStyles from "../themes/theme.dashboard";

const SocialTags = (props) => {
    const classes = useStyles();
    const {name, logo} = props

    return (
      <div className={classes.socialItem}>
        <Box
          display="flex"
          p={1}
          m={2}
          justifyContent="center"
          alignItems="center"
        >
          <Box flexGrow={1} display="flex" alignItems="center">
            <img className={classes.logos} src={logo} alt="logo" />
            {name}
          </Box>
          <Box>
            <Switch color="primary" />
          </Box>
        </Box>
      </div>
    );
}


export default SocialTags;