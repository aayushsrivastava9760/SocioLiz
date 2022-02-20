import React from 'react'
import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import {Link} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { logoutCall } from '../../apiCalls'


const Topbar = () => {

    const {user} = useContext(AuthContext)

    const {dispatch} = useContext(AuthContext)

    const handleLogout = () =>{
      logoutCall(dispatch)
    }


    return (
      <div className='topbarContainer' >
        <div className="topbarLeft">
          <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">SocioLiz</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className='searchIcon' />
            <input placeholder='Search for friend, post or video' className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person/>
              <span className="topbarIconBadge">1</span>
            </div>
            <Link to={'/messenger'} style={{textDecoration:"none",color:"white"}}>
            <div className="topbarIconItem">
              <Chat/>
              <span className="topbarIconBadge">2</span>
            </div>
            </Link>
            <div className="topbarIconItem">
              <Notifications/>
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
            <img src={user.profilePicture || "/assets/person/noAvatar.png"} alt="profile pic" className="topbarImg" />
          </Link>
          <div>
            <button className="logoutButton" onClick={handleLogout} >Logout</button>
          </div>
        </div>
      </div>
  )
}

export default Topbar
