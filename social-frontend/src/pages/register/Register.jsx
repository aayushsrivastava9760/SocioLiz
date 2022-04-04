import React, { useContext, useRef, useState } from 'react'
import './register.css'
import {Link} from "react-router-dom"
import axios from '../../utils/axios'
import { AuthContext } from '../../context/AuthContext'
import {CircularProgress} from "@material-ui/core"


const Register = () => {

  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()

  const [passwordValue,setPasswordValue] = useState("")


  const [isProcessing,setIsProcessing] = useState(false)

  const {dispatch} = useContext(AuthContext)

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(password.current.value !== passwordAgain.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!")
    }
    else{
      setIsProcessing(true)
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }

      try {
        const res = await axios.post("/auth/register",user)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
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
                    className="loginInput username" 
                    pattern='^[A-Za-z0-9]{3,20}$'
                  />
                  <span className='errorMsgUsername'>Username should be 3-20 characters and shouldn't include any special character!</span>
                  <input 
                    placeholder="Email" 
                    required 
                    ref={email} 
                    className="loginInput email" 
                    type="email" 
                  />
                  <span className='errorMsgEmail'>Enter a valid Email address</span>
                  <input 
                    placeholder="Password" 
                    required  
                    ref={password} 
                    className="loginInput password"  
                    value={passwordValue}
                    onChange={(e)=>setPasswordValue(e.target.value)}
                    type="password" 
                    minLength="6"
                    pattern="^[A-Za-z0-9_@./#&+-]{6,}$"
                  />
                  <span className='errorMsgPassword'>Password must contain at least 6 characters</span>
                  <input 
                    placeholder="Password Again" 
                    required  
                    ref={passwordAgain} 
                    className="loginInput passwordAgain" 
                    type="password" 
                    pattern={passwordValue}
                  />
                  <span className='errorMsgPasswordAgain'>Passwords don't match!</span>
                  <button className="loginButton" type='submit' disabled={isProcessing} >{ isProcessing ?  <CircularProgress size="25px" />  :  "Sign Up"}</button>
                  <Link to={`/login`} style={{textDecoration:"none",textAlign:"center"}}>
                    <button className="loginRegisterButton">
                      { isProcessing ?  <CircularProgress size="25px" />  : "Log into Account" }
                    </button>
                  </Link>
              </form>
              {/* { 
                errorOccurred &&
                <div className="errorBox">
                  <p className="errorMsg">{errorMsg}</p>
                </div>
              } */}
          </div>
      </div>
    </div>
  )
}

export default Register
