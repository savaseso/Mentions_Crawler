import React,{useContext,useEffect,useState} from "react";
import useStyles from "../themes/theme.dashboard";
import { Box, Grid } from "@material-ui/core";
import { Typography ,Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SocialTags from '../components/SocialTags'
import Reddit from '../icons/reddit.png'
import Twitter from '../icons/twitter.png'
import CardItem from '../components/CardItem'
import { AuthContext } from "../authContext";



const DashBoard = () => {
 const classes = useStyles();
 const { platform } = useContext(AuthContext);
 const [mentions, setMentions] = useState([])

 const getMentions = async (e) =>{
  //e.preventDefault();
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(platform),
  };
  const response = await fetch("http://localhost:3001/mentions", config);
  const result = await response.json();
  
  if(result.success){
    setMentions(result.mentions)
  }

 }

 useEffect(() => {
   getMentions()
  
 }, [])
 console.log(mentions)
  return (
    <Container maxWidth="xl">
      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={4}>
          <div className={classes.socialGroup}>

            <SocialTags title="Reddit" name="reddit" logo={Reddit} />
            <SocialTags title="Twitter" name="twitter" logo={Twitter} />
            <SocialTags title="Business Insider" name="news" logo={Reddit}/>
            <button onClick={getMentions}>submit</button>

            </div>
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
              {mentions.map(mention=><CardItem key={mention.id} mention={mention} />)}
              
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashBoard;
