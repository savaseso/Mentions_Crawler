import React, { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { Context } from "../context";
import useStyles from "../themes/theme.form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core';

const Login = (props) => {
  const [values, handleChange] = useForm({ email: "", password: "" });
  const { setIsLoggedIn } = useContext(Context);
  const classes = useStyles();

  const login = async (e) => {
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
      props.history.push("/dashboard");
      setIsLoggedIn(true);
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.title}>
        <Typography variant="h4">Welcome back!</Typography>
        <Typography variant="h6" style={{color:"#6583F2",opacity:0.5}}>Login to your account</Typography>
        </div>
        <form className={classes.form} onSubmit={login} >
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
            value={values.password}
            autoComplete="password"
            onChange={handleChange}
          />
          <Button type="submit" className={classes.button}>
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
