import React from 'react'
import "./rightbar.css"
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@material-ui/icons'


const Rightbar = ({user}) => {

  const [friends, setFriends] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const {user:currentUser , dispatch} = useContext(AuthContext)
  // const [followed,setFollowed] = useState(currentUser.following.includes(user?._id))
  const [followed,setFollowed] = useState()

  useEffect(()=>{
    if(user){
      setFollowed(currentUser.following.includes(user._id))
    }
  },[currentUser,user])

  useEffect(()=>{
    if(user){
      const getFriends = async () =>{
        try {
          const friendList = await axios.get(`/users/friends/${user._id}`)
          setFriends(friendList.data)
        } catch (error) {
          console.log(error);
        }
      }
      getFriends()
    }
  },[user])

  const handleFollow = async () =>{
    if(user){
      try {
        if(followed){
          await axios.patch(`/users/${user?._id}/unfollow`,{userId:currentUser._id})
          dispatch({type:"UNFOLLOW",payload:user?._id})
        }
        else{
          await axios.patch(`/users/${user?._id}/follow`,{userId:currentUser._id})
          dispatch({type:"FOLLOW",payload:user?._id})
        }
      } catch (error) {
        console.log(error);
      }
      setFollowed(!followed)
    }
  }
  

  const HomeRightbar = () =>{
    return(
      <div>
        <div className="birthdayContainer">
          <img className='birthdayImg' src="/assets/gift.png" alt="" />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className='rightbarAd' src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u=>(
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    )
  }

  const ProfileRightbar = ( ) =>{
    return(
      <div>
        { currentUser.username !== user.username && (
          <button className="rightbarFollowButton" onClick={handleFollow} >
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className='rightbarTitle' >User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city || "-"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from || "-"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className='rightbarTitle' >User Friends</h4>
        <div className="rightbarFollowings">
          {
          friends.length === 0 
          ? <h4 className="rightbarInfoKey">User has no friends</h4>
          :
          friends.map(friend =>{
            return(
              <Link to={`/profile/${friend.username}`} style={{textDecoration:"none"}} >
                <div className="rightbarFollowing">
                  <img className='rightbarFollowingImg' src={ friend.profilePicture ? PF+friend.profilePicture : PF + "person/noAvatar.png" } alt="" />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
              </Link>
            )
          })
          }
        </div>
      </div>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
