import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    margin: theme.spacing(1),
  },
  cover: {
    height: "200px",
    width: "200px",
    padding: theme.spacing(1),
  },
}));

export default useStyles;
