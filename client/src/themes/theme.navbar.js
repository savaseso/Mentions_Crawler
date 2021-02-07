import { makeStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
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
      color:"#c5c2fc"
    },
    title: {
      flexGrow: 1,
      color:"#fff"
    },
  }));
