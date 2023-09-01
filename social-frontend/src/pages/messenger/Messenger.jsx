import React, { useRef } from 'react'
import "./messenger.css"
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import { useEffect } from 'react'
import {io} from "socket.io-client"
import axios from '../../utils/axios'
import { Send } from "@material-ui/icons"





const Messenger = () => {

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const socket = useRef()
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {user} = useContext(AuthContext)
    const scrollRef = useRef()

    useEffect(()=>{
        socket.current = io("https://socioliz-socket-render.onrender.com/")
        socket.current.on("getMessage", data =>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    },[])

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev)=>[...prev, arrivalMessage])
    },[arrivalMessage , currentChat])

    useEffect(()=>{
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers",users=>{
            setOnlineUsers(user.following.filter(f=>users.some(u=>u.userId === f)))
        })
    },[user])

    useEffect(()=>{
        const getConversations = async () =>{
            try {
                const res = await axios.get(`/conversations/${user._id}`)
                setConversations(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getConversations()
    },[user._id])

    useEffect(()=>{
        if(currentChat){
            const getMessages = async () =>{
            try {
                const res = await axios.get(`/messages/${currentChat._id}`)
                setMessages(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMessages()}
    },[currentChat])


    const handleSubmit = async (e) =>{
        e.preventDefault()
        const message = {
            conversationId:currentChat._id,
            sender:user._id,
            text:newMessage
        }

        const receiverId = currentChat.members.find(member=> member !== user._id)

        socket.current.emit("sendMessage",{
            senderId:user._id,
            receiverId,
            text:newMessage
        })

        try {
            const res = await axios.post("/messages",message)
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

    return (
        <div>
            <Topbar/> 
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder='Search for friends' className='chatMenuInput' />
                        {conversations.map(conversation=>(
                            <div key={conversation._id} onClick={()=>setCurrentChat(conversation)}>
                                <Conversation key={conversation._id} conversation={conversation} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                        <>
                            <div className="chatBoxTop">
                                {messages.map(message=>(
                                    <div key={message._id} ref={scrollRef}>
                                        <Message key={message._id} own={message.sender === user._id} message={message} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <input 
                                    className='chatMessageInput' 
                                    placeholder='write something...' 
                                    onChange={(e)=>setNewMessage(e.target.value)} 
                                    value={newMessage}
                                />
                                {/* </textarea> */}
                                <button className='chatSubmitButton' onClick={handleSubmit}><Send /></button>
                            </div>
                        </>
                        :
                        (
                        <span className='noConversationText'>
                            Open a conversation to start a chat.
                        </span>
                        )
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline 
                            onlineUsers={onlineUsers} 
                            currentUserId={user._id} 
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </div> 
  )
}

export default Messenger
