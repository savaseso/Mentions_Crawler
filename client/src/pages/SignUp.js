import React from "react";
import NavBar from "../components/NavBar";
import {useForm} from "../hooks/useForm";
import { useCookies } from 'react-cookie';

const SignUp = () => {
    const [values, handleChange] = useForm({email:'',company:'',password:''})
    const [cookies, setCookie] = useCookies([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            }
            const response = await fetch("http://localhost:3001/register", config)
            const result = await response.json();
            setCookie('token', result.token);

        } catch (err) {
                console.log(err)
      }}
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
          />
          <label >Company</label>
          <input
            type="company"
            value={values.company}
            name="company"
            onChange={handleChange}
          />
          <label type="password" >
            Password
          </label>
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
