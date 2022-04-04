import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "./chatOnline.css"
import axios from '../../utils/axios'


const ChatOnline = ({onlineUsers,currentUserId,setCurrentChat}) => {

    const [friends,setFriends] = useState([])
    const [onlinefriends,setOnlineFriends] = useState([])

    useEffect(()=>{
        const getFriends = async () =>{
            try {
                const res = await axios.get(`/users/friends/${currentUserId}`)
                setFriends(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getFriends()
    },[currentUserId])

    useEffect(()=>{
        setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)))
    },[friends,onlineUsers])

    const handleClick = async (onlineFriend) =>{
        try {
            const res = await axios.get(`/conversations/find/${currentUserId}/${onlineFriend._id}`)
            setCurrentChat(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="chatOnline">
                {onlinefriends.map(friend => (
                    <div className="chatOnlineFriend" onClick={()=>{handleClick(friend)}}>
                        <div className="chatOnlineImgContainer">
                            <img className='chatOnlineImg' src={ friend?.profilePicture || "/assets/person/noAvatar.png" } alt="" />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{friend.username}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatOnline
