import React, { useContext, useCallback } from "react";
import { useForm } from "../hooks/useForm";
import useStyles from "../themes/theme.form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, Typography } from "@material-ui/core";
import { AuthContext } from "../authContext";
import { Redirect, withRouter } from "react-router";

const Login = ({ history }) => {
  const [values, handleChange] = useForm({ email: "", password: "" });
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const classes = useStyles();

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    };
    const response = await fetch("http://localhost:3001/login", config);
    const result = await response.json();
    if (result.success) {
      setIsLoggedIn(true);
      history.push("/dashboard");
    } else {
      alert(result.message);
    }
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.title}>
        <Typography variant="h4">Welcome back!</Typography>
        <Typography variant="h6" style={{ color: "#6583F2", opacity: 0.5 }}>
          Login to your account
        </Typography>
      </Box>
      <form className={classes.form} onSubmit={handleLogin}>
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
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          size="medium"
          label="Password"
          className={classes.input}
          id="password"
          required
          fullWidth
          minLength="6"
          value={values.password}
          autoComplete="password"
          onChange={handleChange}
        />
        <Button type="submit" className={classes.button}>
          Log in
        </Button>
      </form>
    </Box>
  );
};

export default withRouter(Login);
