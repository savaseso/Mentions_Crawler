import React from "react";
import useStyles from "../themes/theme.dashboard";
import { Box, Grid } from "@material-ui/core";
import { Typography ,Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SocialTags from '../components/SocialTags'
import Reddit from '../icons/reddit.png'
import Twitter from '../icons/twitter.png'
import CardItem from '../components/CardItem'




const DashBoard = () => {
 const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={4}>
          <Box className={classes.socialGroup}>
            <SocialTags name="Reddit" logo={Reddit} />
            <SocialTags name="Twitter" logo={Twitter} />
            <SocialTags name="Business Insider" logo={Reddit} />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Container maxWidth="lg">
            <Box m={5} display="flex" justifyContent="space-between">
              <Typography variant="h4">My mentions</Typography>
              <Box className={classes.buttonGroup}>
                <Button className={classes.button} disabled>
                  Most recent
                </Button>
                <Button className={classes.button}>Most popular</Button>
              </Box>
            </Box>
            <Box>
              <CardItem />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashBoard;
