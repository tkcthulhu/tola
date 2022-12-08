import React, { useState } from "react"
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import logo from '../img/logo.png'

const Register = () => {

    let navigate = useNavigate()

    const [user, setUser] = useState({
      "username": "",
      "first_name": "",
      "last_name": "",
      "birthday": "",
      "email": "",
      "is_coach": false,
      "weight": 0.0
    })

    const handleChange = (key, value) => {
      setUser({
        ...user,
        [key]: value
      })
    }

    const handleRegister = (e) => {
      e.preventDefault();
      AuthService.register(user)
      navigate('/login')
    }

    return (
      <div className="c-form container register-form">
        <img src={logo} alt="logo" className="ratio"/>

        <form onSubmit={handleRegister}>
          <div className="row justify-content-center">
            <label htmlFor="username" className="norse-bold">Username:</label>
            <br/>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => handleChange('username', e.target.value)}
              required
            />
          </div>
          <br/>
          <div className="row justify-content-center">
            <label htmlFor="email" className="norse-bold">Email:</label>
            <br/>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          <br/>
          <div className="row justify-content-center">
            <label htmlFor="pass" className="norse-bold">Password (8 characters minimum):</label>
            <br/>
            <input
              type="password"
              id="pass"
              name="password"
              minLength="8"
              required
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <br/>
          <div className="row justify-content-center">
            <label htmlFor="passConf" className="norse-bold">Confirm Password:</label>
            <br/>
            <input
              type="password"
              id="passConf"
              name="password"
              minLength="8"
              required
              onChange={(e) => handleChange('passwordConf', e.target.value)} />
          </div>
          <br/>
          <div className="row justify-content-center">
            <label htmlFor="firstName" className="norse-bold">First Name:</label>
            <br/>
            <input
              type="text"
              id="firstName"
              name="fname"

              required
              onChange={(e) => handleChange('first_name', e.target.value)} />
          </div>
          <br/>
          <div className="row justify-content-center">
              <label htmlFor="lastName" className="norse-bold">Last Name:</label>
              <br/>
              <input
                  type="text"
                  id="lastName"
                  name="lname"
                  required
                  onChange={(e) => handleChange('last_name', e.target.value)}
              />
          </div>
          <br/>
          <div className="row justify-content-center">
              <label htmlFor="birthDate" className="norse-bold">Birthdate:</label>
              <br/>
              <input 
                  type="date"             
                  id="last_name"
                  name="lname"
                  required
                  onChange={(e) => handleChange('birthday', e.target.value)}
              />
          </div>
          <br/>
          <div className="row justify-content-center">
              <label htmlFor="weight" className="norse-bold">Weigth:</label>
              <br/>
              <input 
                  type="number"            
                  id="weight"
                  name="weight"
                  required
                  onChange={(e) => handleChange('weight', e.target.value)}  />
          </div>
          <br/>
          <div className="row justify-content-center">
              <label htmlFor="Coach" className="norse-bold">Are you a Coach?</label>
              <br/>
              <input 
                  type="checkbox" 
                  name="Coach" 
                  value="Coach"
                  id="coach"
                  onChange={(e) => handleChange('is_coach', e.target.value)} 
              ></input>
          </div>
          <br/>
          <button
            className="w-100 btn btn-lg btn-primary norse-bold"
            variant='dark'
            type="submit"
            value="Register"
            disabled={(
              user.password &&
              user.password.length >= 8 &&
              user.password === user.passwordConf &&
              user.first_name &&
              user.last_name &&
              user.email
            ) ? false : true}
          >Resgister</button>
        </form>
      </div>
    )

}

export default Register