import React from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { loginCall } from '../../apiCalls'
import './login.css'
import {AuthContext} from '../../context/AuthContext'
import {CircularProgress} from "@material-ui/core"
import {Link} from "react-router-dom"


const Login = () => {

  const email = useRef()
  const password = useRef()

  const { isFetching, dispatch} = useContext(AuthContext)


  const handleSubmit = (e) =>{
    e.preventDefault()
    loginCall({email:email.current.value,password:password.current.value},dispatch)
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
                  <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                  <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password} />
                  {/* <button className="loginButton" disabled={isFetching}>{ isFetching ? <CircularProgress color='white' size="25px" /> : "Log In"}</button> */}
                  <button className="loginButton" disabled={isFetching}>{ isFetching ? <CircularProgress size="25px" /> : "Log In"}</button>
                  <span className="loginForgot">Forgot Password?</span>
                  <Link to={`/register`} style={{textDecoration:"none",textAlign:"center"}}>
                  <button className="loginRegisterButton">
                  { isFetching ? <CircularProgress size="25px" /> : "Create a New Account"}
                  </button>
                  </Link>
              </form>
          </div>
      </div>
    </div>
  )
}

export default Login
