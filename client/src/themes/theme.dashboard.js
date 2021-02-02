import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  socialGroup: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  socialItem: {
    width: "70%",
    borderBottom: "1px solid #E9EDFA",
  },
  logos: {
    width: "45px",
    height: "45px",
    paddingRight: "10px",
  },
  //MISSING these styles when rendering ?!

  /* buttonGroup: {
    backgroundColor: "#ccefff",
    width: "220px",
    height: "45px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: "30px",
  },
  button: {
    border: "none",
    width: "100px",
    height: "25px",
    borderRadius: "30px",
    fontSize:"10px",
    backgroundColor:"#ccefff",
    color: theme.palette.primary.main,
    "&.Mui-disabled": {
      color: "#ccefff",
      backgroundColor: theme.palette.primary.main,
    },
    "&:hover": {
      background: "#617EE9",
      color:"#fff"
    },
    
  },  */
}));

export default useStyles;
