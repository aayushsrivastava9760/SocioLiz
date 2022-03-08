import React, { useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css'
// import axios from "axios"
import { useParams } from "react-router-dom"
import axios from '../../utils/axios'



const Profile = () => {

  const [user,setUser] = useState({})
  const username = useParams().username
  // console.log(params);

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    fetchUser()
  },[username])

  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img className='profileCoverImg' src={user.coverPicture || "/assets/person/noCover.png" } alt="" />
                    <img className='profileUserImg' src={user.profilePicture || "/assets/person/noAvatar.png" } alt="" />
                </div>
                <div className="profileInfo">
                    <h4 className='profileInfoName' >{user.username}</h4>
                    <span className='profileInfoDesc' >{user.desc}</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed username={username} />
                <Rightbar user={user} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
