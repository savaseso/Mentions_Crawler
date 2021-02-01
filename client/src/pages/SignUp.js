import React, { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { Context } from "../context";
import useStyles from "../themes/theme.form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, Typography } from '@material-ui/core';

const SignUp = (props) => {
  const { setIsLoggedIn } = useContext(Context);
  const classes = useStyles();
  const [values, handleChange] = useForm({
    email: "",
    company: "",
    password: "",
  });

  const signup = async (e) => {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    };

    const response = await fetch("http://localhost:3001/register", config);
    const result = await response.json();
    if (result.success) {
      setIsLoggedIn(true);
      props.history.push('/dashboard')
    } else {
      alert(result.message);
    }
  };

  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.title}>
          <Typography variant="h4">Lets Get Started!</Typography>
          <Typography variant="h6" style={{ color: "#6583F2", opacity: 0.5 }}>
            Create an account
          </Typography>
        </Box>
        <form className={classes.form} onSubmit={signup}>
          <TextField
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            size="medium"
            label="Your Email"
            className={classes.input}
            required
            fullWidth
            id="email"
            value={values.email}
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            name="company"
            variant="outlined"
            margin="normal"
            size="medium"
            label="Company name"
            className={classes.input}
            required
            fullWidth
            id="company"
            value={values.company}
            autoComplete="company"
            onChange={handleChange}
          />
          <TextField
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            size="medium"
            label="Password"
            minLength="6"
            className={classes.input}
            id="password"
            required
            fullWidth
            value={values.password}
            autoComplete="password"
            onChange={handleChange}
          />
          <Button type="submit" className={classes.button}>
            Sign up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
