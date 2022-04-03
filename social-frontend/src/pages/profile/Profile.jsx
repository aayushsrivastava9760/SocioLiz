import React, { useContext, useEffect, useRef, useState } from 'react'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css'
// import axios from "axios"
import { useParams } from "react-router-dom"
import axios from '../../utils/axios'
import { AuthContext } from '../../context/AuthContext'
import { Edit, ArrowForwardIos } from '@material-ui/icons'
import { updateCall } from '../../apiCalls'



const Profile = () => {

  const {user:currentUser,convertBase64,dispatch} = useContext(AuthContext)

  const [changedProfilePicture,setChangedProfilePicture] = useState(null)
  const [changedCoverPicture,setChangedCoverPicture] = useState(null)
  const [editDesc,setEditDesc] = useState(false)
  const [prevDesc,setPrevDesc] = useState(currentUser.desc)
  const desc = useRef()
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

  const handleCoverPictureChange = async (e) =>{
    e.preventDefault()
    setChangedCoverPicture(e.target.files[0])

    const base64 = await convertBase64(e.target.files[0])

    const data = {
      userId:currentUser._id,
      coverPicture:base64.toString()
    }

    try {
      const res = await axios.patch(`/users/${currentUser._id}`,data)
      // window.location.reload()
      updateCall(res.data,dispatch)
    } catch (error) {
      console.log(error);
    }
  }

  const handleProfilePictureChange = async (e) =>{
    e.preventDefault()
    setChangedProfilePicture(e.target.files[0])

    const base64 = await convertBase64(e.target.files[0])

    const data = {
      userId:currentUser._id,
      profilePicture:base64.toString()
    }

    try {
      const res = await axios.patch(`/users/${currentUser._id}`,data)
      updateCall(res.data,dispatch)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditDesc = async (e) =>{
    e.preventDefault()

    const data = {
      userId:currentUser._id,
      desc:desc.current.value
    }
    setEditDesc(false)
    try {
      const res = await axios.patch(`/users/${currentUser._id}`,data)
      // window.location.reload()
      updateCall(res.data,dispatch)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
                    {
                      user._id === currentUser._id
                      ?
                      <div className="profileCover">
                        <label htmlFor='file'>
                          <img className='profileCoverImg' src={ changedCoverPicture ?  URL.createObjectURL(changedCoverPicture) : user.coverPicture || "/assets/person/noCover.png" } alt="" />
                          <div className="editIconCover">
                            <Edit htmlColor='gray' style={{ fontSize: 30}} />
                            <input style={{display:"none"}} type="file" name='file' id="file" accept='.png, .jpeg, .jpg' onChange={(e)=>handleCoverPictureChange(e)} />
                          </div>
                        </label>
                        <label htmlFor='ProfileFile'>
                          <img className='profileUserImg' src={ changedProfilePicture ?  URL.createObjectURL(changedProfilePicture) : user.profilePicture || "/assets/person/noAvatar.png" } alt="" />
                          <div className="editIconProfile"><Edit htmlColor='gray' style={{ fontSize: 70}} /></div>
                          <input 
                            style={{display:"none"}} 
                            type="file" 
                            name='file' 
                            id="ProfileFile" 
                            accept='.png, .jpeg, .jpg' 
                            onChange={(e)=>{
                              handleProfilePictureChange(e)
                            }} 
                            />
                        </label>
                      </div>
                      :
                      <div className="profileCover">
                        <img className='profileCoverImg' src={user.coverPicture || "/assets/person/noCover.png" } alt="" />
                        <img className='profileUserImg' src={user.profilePicture || "/assets/person/noAvatar.png" } alt="" />
                      </div>
                    }
                <div className="profileInfo">
                    <h4 className='profileInfoName' >{user.username}</h4>
                    {
                      user._id === currentUser._id
                      ?
                      <div>
                      { 
                        editDesc 
                        ?
                          <div className='descEditWrapper'>
                            <input 
                              className="descInput"
                              ref={desc} 
                              value={prevDesc}
                              onChange={(e)=>setPrevDesc(e.target.value)}
                              autoFocus
                            />
                            <button className='descEditButton' onClick={handleEditDesc}>
                              <ArrowForwardIos />
                            </button>
                          </div>
                        :
                        <span className='profileInfoDesc' >
                        {user.desc || "-"}
                        <div className="descEditIcon" onClick={()=>setEditDesc(true)}>
                          <Edit htmlColor='gray' style={{ fontSize: 20}} />
                        </div>
                        </span>
                      }
                      </div>
                      :
                      <span className='profileInfoDesc' >
                        {user.desc || "-"}
                      </span>
                    }
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
