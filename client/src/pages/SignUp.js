import React, { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { Context } from "../context";

const SignUp = (props) => {
  const [values, handleChange] = useForm({
    email: "",
    company: "",
    password: "",
  });
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);

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
    } else {
      alert(result.message);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={signup}>
          <label>Email</label>
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
          />
          <label>Company</label>
          <input
            type="company"
            value={values.company}
            name="company"
            onChange={handleChange}
          />
          <label type="password">Password</label>
          <input
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
