import React from 'react'
import "./message.css"
import {format} from "timeago.js"
import { useState } from 'react'
import { useEffect } from 'react'
// import { useContext } from 'react'
// import { AuthContext } from '../../context/AuthContext'
// import axios from 'axios'
import axios from '../../utils/axios'


const Message = ({own,message}) => {

    const [sender,setSender] = useState(null)

    useEffect(()=>{
        const getSender = async () =>{
            try {
                const res = await axios.get(`/users?userId=${message.sender}`)
                setSender(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getSender()
    },[message.sender])


    return (
        <div>
            <div className={own ? "message own" : "message"}>
                {
                own ?
                <div className="messageTop">
                    <p className='messageText'>{message.text}</p>
                    <img className='messageImgOwn' src={ sender?.profilePicture || "/assets/person/noAvatar.png" } alt="" />
                </div>
                :
                <div className="messageTop">
                    <img className='messageImg' src={ sender?.profilePicture || "/assets/person/noAvatar.png" } alt="" />
                    <p className='messageText'>{message.text}</p>
                </div>
                }
                <div className="messageBottom">{format(message.createdAt)}</div>
            </div>
        </div>
    )
}

export default Message
