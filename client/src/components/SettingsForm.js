import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { TextField, Box, Checkbox, Typography } from "@material-ui/core";
import useStyles from "../css/settings";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../authContext";
import { ObjectID } from "bson";

const SettingsForm = () => {
  const classes = useStyles();
  const [isSubscribed, setSubscribe] = useState(false);
  const { email, setEmail, companies, setCompanies } = useContext(AuthContext);

  const handleChangeInput = (index, event) => {
    const values = [...companies];
    values[index][event.target.name] = event.target.value;
    setCompanies(values);
  };

  const addCompany = () => {
    const id = new ObjectID();
    setCompanies([...companies, { company: "", _id: id.toString() }]);
  };
  const removeCompany = (_id) => {
    const values = [...companies].filter((company) => company._id !== _id);
    setCompanies(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      companies: [...companies],
    };

     const saveCompaniesPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }; 

    const subscriptionPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
       credentials: "include", 
      body: JSON.stringify({subscribed:isSubscribed}),
    };
    try {
      const saveCompanies = await fetch("http://localhost:3001/settings", saveCompaniesPut);
      const subscribeUser = await fetch(`http://localhost:3001/report/${email}`, subscriptionPost);
      const resultSavedCompanies = await saveCompanies.json();
      const resultSubscription = await subscribeUser.json();
    
      if (resultSavedCompanies.success && resultSubscription.success) {
        toast.info(`${resultSubscription.message}`, { position: "bottom-right" });
        toast.info(`${resultSavedCompanies.message}`, { position: "bottom-right" });
      }
    } catch (err) {
      toast.error(`${err.message}`, { position: "bottom-right" });
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box className={classes.container}>
        <Box className={classes.label}>
          <label>Your Company</label>
        </Box>
        <Box display="flex" flexDirection="column">
          {companies.map(({ company, _id }, index) => (
            <TextField
              key={_id}
              name="company"
              type="text"
              variant="outlined"
              margin="normal"
              size="medium"
              className={classes.input}
              id="company"
              placeholder="Company name"
              required
              value={company}
              onChange={(event) => handleChangeInput(index, event)}
              autoFocus
              InputProps={{
                endAdornment:
                  index + 1 === companies.length ? (
                    <Button className={classes.addButton} onClick={addCompany}>
                      Add
                    </Button>
                  ) : (
                    <Button
                      className={classes.removeButton}
                      onClick={() => removeCompany(_id)}
                    >
                      Remove
                    </Button>
                  ),
              }}
            />
          ))}
        </Box>
      </Box>
      <Box display="flex">
        <Box className={classes.label}>
          <label>Weekly Report</label>
        </Box>
        <Box>
          <TextField
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            size="medium"
            label="Your Email"
            className={classes.input}
            required
            id="email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </Box>
      <Box display="flex">
        <Box className={classes.label}>
          <label>Subscribe</label>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Checkbox
            color="primary"
            onClick={() => setSubscribe((subscribe) => !subscribe)}
            value={isSubscribed}
          />
        </Box>
      </Box>

      <Button className={classes.button} type="submit">
        Save
      </Button>
    </form>
  );
};
export default SettingsForm;
