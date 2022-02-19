import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "./conversation.css"

const Conversation = ({conversation,currentUser}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friend,setFriend] = useState(null)

    useEffect(()=>{
        const friendId = conversation.members.find((member)=>member !== currentUser._id)

        const getFriend = async () =>{
            try {
                const res = await axios.get(`/users?userId=${friendId}`)
                setFriend(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getFriend()
    },[conversation.members,currentUser._id])

    return (
        <div>
            {friend && 
            <div className="conversation">
                <img className='conversationImg' src={ friend.profilePicture ? PF+friend.profilePicture : PF + "person/noAvatar.png" } alt="" />
                <span className="conversationName">{friend.username}</span>
            </div>
            }
        </div>
    )
}

export default Conversation
