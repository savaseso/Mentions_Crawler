import React from "react";
import NavBar from "../components/NavBar";
import {useForm} from "../hooks/useForm";
import { useCookies } from 'react-cookie';

const Login = () => {
    const [values, handleChange] = useForm({email:'',password:''})
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
            const response = await fetch("http://localhost:3001/login", config)
            const result =  await response.json();
            console.log(result)
            setCookie('token', result.token);
        } catch (err) {
                console.log(err)
      }}

      const isAuth = async () =>{
        try {
          
          const response = await fetch("http://localhost:3001/isUserAuth",{ /* 'Access-Control-Allow-Credentials':true */ credentials: 'include'})
          const result =  await response.json();
          console.log(result)
         
      } catch (err) {
              console.log(err)
    }
      }
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
          <label type="password">
            Password
          </label>
          <input
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        <button onClick={isAuth}>isUserAuthenticated</button>
      </div>
    </div>
  );
};

export default Login;
