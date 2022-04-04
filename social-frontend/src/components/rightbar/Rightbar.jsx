import React, { useRef } from 'react'
import "./rightbar.css"
import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove, AddComment, Edit, ArrowForwardIos } from '@material-ui/icons'
import axios from '../../utils/axios'
import { updateCall } from '../../apiCalls'



const Rightbar = ({user}) => {

  const [friends, setFriends] = useState([])
  const {user:currentUser , dispatch} = useContext(AuthContext)
  const [followed,setFollowed] = useState()
  const [greet,setGreet] = useState(true)
  const [editCity,setEditCity] = useState(false)
  const [editFrom,setEditFrom] = useState(false)
  const [prevCity,setPrevCity] = useState(currentUser.city)
  const [prevFrom,setPrevFrom] = useState(currentUser.from)
  const cityRef = useRef()
  const fromRef = useRef()

  useEffect(()=>{
    if(user){
      setFollowed(currentUser.following.includes(user._id))
    }
  },[currentUser,user])

  useEffect(()=>{
    if(user){
      const getFriends = async () =>{
        try {

          if(user._id){
            const friendList = await axios.get(`/users/friends/${user._id}`)
            setFriends(friendList.data)
          }
          else{
            setFriends([])
          }

        } catch (error) {
          console.log(error);
        }
      }
      getFriends()
    }
  },[user])


  useEffect(()=>{
    if(user){

      const getConversations = async () =>{
        try {
          const res = await axios.get(`/conversations/find/${currentUser._id}/${user._id}`)
          if(res.data){
            setGreet(false)
          }
          else{
            setGreet(true)
          }
        } catch (error) {
          console.log(error);
        }
      }
      getConversations()
    }
  },[currentUser,user])

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

  const handleGreetingMsg = async () =>{
    try {
      const conversationData = {
        senderId:currentUser._id,
        receiverId:user._id
      }

      const newConversation = await axios.post('/conversations',conversationData)
      setGreet(false)
      console.log(newConversation);

    } catch (error) {
      console.log(error);
    }
  }


  const handleEditCity = async (e) =>{
    e.preventDefault()

    const data={
      userId:currentUser._id,
      city:cityRef.current.value
    }

    setEditCity(false)
    try {
      const res = await axios.patch(`/users/${currentUser._id}`,data)
      updateCall(res.data,dispatch)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditFrom = async (e) =>{
    e.preventDefault()

    const data={
      userId:currentUser._id,
      from:fromRef.current.value
    }

    setEditFrom(false)
    try {
      const res = await axios.patch(`/users/${currentUser._id}`,data)
      updateCall(res.data,dispatch)
    } catch (error) {
      console.log(error);
    }
  }
  

  const HomeRightbar = () =>{
    return(
      <div>
        <div className="birthdayContainer">
          <img className='birthdayImg' src="/assets/gift.png" alt="" />
          <span className='birthdayText'>
            New <b>Updates</b> coming soon.
          </span>
        </div>
        <img className='rightbarAd' src="/assets/gfg-ad.jpeg" alt="" />
      </div>
    )
  }

  const ProfileRightbar = ( ) =>{
    return(
      <div>
        { 
          currentUser.username !== user.username 
          &&
          (
          <div className='rightbarProfileButtonWrapper'>
            <button className="rightbarFollowButton" onClick={handleFollow} >
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
            {
              greet && (
              <button className="rightbarMessageButton" onClick={handleGreetingMsg}>
                Add on messenger 
                <AddComment style={{marginLeft:"5px"}} />
              </button>
              )
            }
          </div>
          )
        }
        <h4 className='rightbarTitle' >User Information</h4>
        <div className="rightbarInfo">
            {
              user._id === currentUser._id
              ?
              <div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">City:</span>
                  { 
                    editCity
                    ?
                    <div className="infoEditWrapper">
                      <input 
                        className="infoInput" 
                        ref={cityRef}
                        value={prevCity}
                        onChange={(e)=>setPrevCity(e.target.value)}
                        autoFocus
                      />
                      <button className="infoEditButton" onClick={handleEditCity}>
                        <ArrowForwardIos />
                      </button>
                    </div>
                    :
                    <span className="rightbarInfoValue">
                      {user.city || "-"}
                      <div className="infoEditIcon" onClick={()=>setEditCity(true)}>
                        <Edit htmlColor='gray' style={{ fontSize: 15}} />
                      </div>
                    </span>
                  }
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">From:</span>
                  {
                    editFrom
                    ?
                    <div className="infoEditWrapper">
                      <input 
                        className="infoInput" 
                        ref={fromRef}
                        value={prevFrom}
                        onChange={(e)=>setPrevFrom(e.target.value)}
                        autoFocus
                      />
                      <button className="infoEditButton" onClick={handleEditFrom}> 
                        <ArrowForwardIos />
                      </button>
                    </div>
                    :
                    <span className="rightbarInfoValue">
                      {user.from || "-"}
                      <div className="infoEditIcon" onClick={()=>setEditFrom(true)}>
                        <Edit htmlColor='gray' style={{ fontSize: 15}} />
                      </div>
                    </span>
                  }
                </div>
              </div>
              :
              <div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">City:</span>
                  <span className="rightbarInfoValue">{user.city || "-"}</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">From:</span>
                  <span className="rightbarInfoValue">{user.from || "-"}</span>
                </div>
              </div>
            }
        </div>
        <h4 className='rightbarTitle' >User Friends</h4>
        <div className="rightbarFollowings">
          {
          friends.length === 0 
          ? <h4 className="rightbarInfoKey">User has no friends</h4>
          :
          friends.map(friend =>{
            return(
              <Link key={friend._id} to={`/profile/${friend.username}`} style={{textDecoration:"none",color:"black",textAlign:"center"}} >
                <div className="rightbarFollowing">
                  <img className='rightbarFollowingImg' src={ friend.profilePicture || "/assets/person/noAvatar.png" } alt="" />
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
