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
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';


const DashBoard = () => {
 const classes = useStyles();
 const { platform } = useContext(AuthContext);
 const [mentions, setMentions] = useState([])
 const [sort,setSort] = useState(true)
 const [currentPage, setCurrentPage] = useState(1)
 const [postPerPage, setPostPerPage] = useState(6);




 const setPage = (e, newPage) => {
    setCurrentPage(newPage);
   };


 const getMentions = async (e) =>{
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

 const sortedArrByDates = (arr) => {
   const mentions = [...arr]
   return mentions.sort(function(a,b){
    return new Date(b.created) - new Date(a.created);
  });
 }

 const getPagination = (currentPage,postPerPage, sortedMentions) => {
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  return sortedMentions.slice(indexOfFirstPost, indexOfLastPost)
 }

 useEffect(() => {
   getMentions()
 }, [])

 const sortedMentions = !sort ? mentions : sortedArrByDates(mentions)
  return (
    <Container maxWidth="xl">
      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={4}>
          <div className={classes.socialGroup}>
            <SocialTags title="Reddit" name="reddit" logo={Reddit} />
            <SocialTags title="Twitter" name="twitter" logo={Twitter} />
            <SocialTags title="Business Insider" name="news" logo={Reddit} />
            <Button className={classes.saveButton} onClick={getMentions}>
              Search
            </Button>
          </div>
        </Grid>
        <Grid item xs={8}>
          <Container maxWidth="lg">
            <Box m={5} display="flex" justifyContent="space-between">
              <Typography variant="h4">{`${sortedMentions.length} mentions found`}</Typography>
              <Box className={classes.buttonGroup}>
                <Button
                  className={classes.button}
                  disabled={sort}
                  onClick={() => setSort((sort) => !sort)}
                >
                  Most recent
                </Button>
                <Button
                  className={classes.button}
                  disabled={!sort}
                  onClick={() => setSort((sort) => !sort)}
                >
                  Most popular
                </Button>
              </Box>
            </Box>
            <Box>
              <Pagination
                count={Math.ceil(mentions.length / postPerPage)}
                page={currentPage}
                limit={postPerPage}
                color="primary"
                onChange={setPage}
              />
              {mentions.length ? (
                getPagination(
                  currentPage,
                  postPerPage,
                  sortedMentions
                ).map((mention) => (
                  <CardItem key={mention.id} mention={mention} />
                ))
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashBoard;
