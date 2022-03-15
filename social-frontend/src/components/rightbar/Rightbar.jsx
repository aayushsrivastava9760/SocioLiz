import React from 'react'
import "./rightbar.css"
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { useEffect } from 'react'
import { useState } from 'react'
// import axios from "axios"
import {Link} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove, AddComment } from '@material-ui/icons'
import axios from '../../utils/axios'



const Rightbar = ({user}) => {

  const [friends, setFriends] = useState([])
  const {user:currentUser , dispatch} = useContext(AuthContext)
  // const [followed,setFollowed] = useState(currentUser.following.includes(user?._id))
  const [followed,setFollowed] = useState()
  const [greet,setGreet] = useState(true)

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
    // console.log("say hi pressed");
    try {
      const conversationData = {
        senderId:currentUser._id,
        receiverId:user._id
      }

      const newConversation = await axios.post('/conversations',conversationData)
      setGreet(false)
      console.log(newConversation);
      // try {
      //   const greetMessageData = {
      //     conversationId:newConversation._id,
      //     sender:currentUser._id,
      //     text:""
      //   }

      //   const res = await axios.post('/messages',greetMessageData)
        
      //   console.log(res.data);
      // } catch (error) {
      //   console.log(error);
      // }

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
