import React, { useState } from "react"
import AuthService from "../services/auth.service";
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from "../context/GlobalState";
import Button from "react-bootstrap/esm/Button";
import jwtDecode from "jwt-decode";
import logo from '../img/logo.png'

function Login(props) {

  let navigate = useNavigate();

  const [ state, dispatch ] = useGlobalState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService
      .login(username, password)
      .then(async (resp) => {
        let data = jwtDecode(resp.access)
        await dispatch({
          currentUserToken: resp.access,
          currentUser: data
        })
        navigate('/user/dashboard')
      });
  }

  return(
    <div className="container" id='login-cont'> 
      <div className="row justify-content-center">
        <div className="col-10">
          <img className="ratio" src={logo} alt="logo" id='login-logo'/>
        </div>
      </div>
      <main className="form-signin w-100 m-auto d-flex justify-content-center">
        <form onSubmit={handleLogin}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control login" 
              id="username" 
              name="username"
              placeholder="Johnny Snappleseed"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username</label>
        
          </div>
          <div className="form-floating">
            <input 
              type="password" 
              className="form-control login" 
              id="floatingPassword" 
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary login" type="submit">Sign in</button>
          <br/>
          <Button className="w-100 btn btn-lg btn-primary login" onClick={() => navigate("/register")}>Register</Button>
          <p className="mt-5 mb-3 text-muted">©2022</p>
        </form>
      </main>
    </div>
  )
}

export default Login