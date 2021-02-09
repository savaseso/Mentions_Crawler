import React, {useContext} from 'react'
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import useStyles from "../css/dashboard";
import { AuthContext } from "../authContext";


const SocialTags = (props) => {
    const classes = useStyles();
    const { platform, setPlatform } = useContext(AuthContext);
    const {title,name, logo} = props

    const handleChange = (e) =>{
     const {name} = e.target;
      setPlatform(prev => {
        return {
          ...prev,
          [name]: !prev[name]
        }
      }
    );
    }

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
            {title}
          </Box>
          <Box>
            <Switch name={props.name} checked={platform[`${name}`]}  color="primary" onChange={(e)=>handleChange(e)} />
          </Box>
        </Box>
      </div>
    );
}


export default SocialTags;