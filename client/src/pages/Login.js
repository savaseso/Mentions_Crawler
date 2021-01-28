import React, { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { Context } from "../context";

const Login = () => {
  const [values, handleChange] = useForm({ email: "", password: "" });
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);

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
      setIsLoggedIn(true);
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={login}>
          <label>Email</label>
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
          />
          <label type="password">Password</label>
          <input
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
