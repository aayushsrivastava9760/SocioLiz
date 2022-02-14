import axios from 'axios'
import React, { useRef } from 'react'
import './register.css'
import { useNavigate } from "react-router-dom"
import {Link} from "react-router-dom"



const Register = () => {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(password.current.value !== passwordAgain.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!")
    }
    else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }

      try {
        await axios.post("/auth/register",user)
        console.log("lol");
        navigate("/login")
      } catch (error) {
        console.log(error);
      }

      
    }
    
  }


  return (
    <div className='login'>
      <div className="loginWrapper">
          <div className="loginLeft">
              <h3 className="loginLogo">SocioLiz</h3>
              <span className="loginDesc">
                  Connect with friends and the world around you on SocioLiz.
              </span>
          </div>
          <div className="loginRight">
              <form className="loginBox" onSubmit={handleSubmit} >
                  <input 
                    placeholder="Username" 
                    required 
                    ref={username} 
                    className="loginInput" 
                  />
                  <input 
                    placeholder="Email" 
                    required 
                    ref={email} 
                    className="loginInput" 
                    type="email" 
                  />
                  <input 
                    placeholder="Password" 
                    required  
                    ref={password} 
                    className="loginInput" 
                    type="password" 
                    minLength="6"
                  />
                  <input 
                    placeholder="Password Again" 
                    required  
                    ref={passwordAgain} 
                    className="loginInput" 
                    type="password" 
                  />
                  <button className="loginButton" type='submit' >Sign Up</button>
                    <button className="loginRegisterButton">
                        Log into Account 
                    </button>
              </form>
          </div>
      </div>
    </div>
  )
}

export default Register