import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  container: {
    display: "flex",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  menu: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(3),
  },
  selected: {
    "&.Mui-selected": {
      borderLeft: `2px solid ${theme.palette.primary.main}`,
      backgroundColor: "#fff",
      color:  theme.palette.primary.main,
    },
    margin: theme.spacing(2),
  },
  settingIcon: {
    color: theme.palette.primary.main,
  },
  input: {
    width: "350px",
    [`& fieldset`]: {
      borderRadius: 30,
    },
  },
  label: {
    margin: "30px",
    fontWeight: "bold",
  },
  button: {
    border: "none",
    width: "150px",
    height: "52px",
    marginTop: "20px",
    marginRight: theme.spacing(2),
    borderRadius: "30px",
    marginLeft: "2rem",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      background: "#617EE9",
    },
  },
  addButton: {
    border: "none",
    width: "150px",
    height: "40px",
    borderRadius: "30px",
    marginRight: theme.spacing(1),
    color:"#fff",
    backgroundColor:  theme.palette.primary.main,
    color:  "#fff", 
    "&:hover": {
      background: "#617EE9",
    },
  },
  removeButton: {
    border: "none",
    width: "150px",
    height: "40px",
    borderRadius: "30px",
    marginRight: theme.spacing(1),
    color:"#fff",
    backgroundColor: "#d3eeff", 
    color: theme.palette.primary.main,
    "&:hover": {
      background: "#617EE9",
      color:'#fff'
    },
  },
  
}));

export default useStyles;
