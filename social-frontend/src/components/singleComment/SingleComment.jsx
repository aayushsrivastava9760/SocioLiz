import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import axios from '../../utils/axios'
import './singleComment.css'

const SingleComment = ({own,comment}) => {

    const [commenter,setCommenter] = useState(null)

    useEffect(()=>{
        const getCommenter = async () =>{
            try {
                const res = await axios.get(`/users?userId=${comment.commenterId}`)
                setCommenter(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getCommenter()
    },[comment])

    return (
        <>
        {
        !own
        ?
        <div className='comment'>
            <div className="commentTop">
                <img src={ commenter?.profilePicture || "/assets/person/noAvatar.png"} alt="" className="commentImg" />
                <div className="commentRight">
                    <h3 className="commentName">{commenter?.username}</h3>
                    <p className="commentText">{comment.text}</p>
                </div>
            </div>
            <div className="commentBottom">
                {format(comment.createdAt)}
            </div>
        </div>
        :
        <div className="commentOwn own">
            <div className="commentTop">
                <div className="commentLeft">
                    <h3 className="commentNameOwn">{commenter?.username}</h3>
                    <p className="commentTextOwn">{comment.text}</p>
                </div>
                <img src={ commenter?.profilePicture || "/assets/person/noAvatar.png"} alt="" className="commentImg" />
            </div>
            <div className="commentBottom">
                {format(comment.createdAt)}
            </div>
        </div>
        }
        </>
    )
}

export default SingleComment
