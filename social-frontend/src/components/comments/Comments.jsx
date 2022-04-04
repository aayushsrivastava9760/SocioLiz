import React, { useContext, useState ,useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import SingleComment from '../singleComment/SingleComment'
import { Send } from "@material-ui/icons"
import './comments.css'
import axios from '../../utils/axios'

const Comments = ({post}) => {
    const {user} = useContext(AuthContext)
    const [comments,setComments] = useState([])
    const [newComment,setNewComment] = useState("")

    useEffect(()=>{
        const getComments = async () =>{
            try {
                const res = await axios.get(`/comments/${post._id}`)
                setComments(res.data.reverse())
            } catch (error) {
                console.log(error);
            }
        }
        getComments()
    },[post?._id])


    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(newComment){
            const comment = {
                postId:post._id,
                commenterId:user._id,
                text:newComment
            }

            try {
                const res = await axios.post("/comments",comment)
                setComments([res.data,...comments])
                setNewComment("")
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='commentBox'>
            <hr className="line" />
            <div className="commentWrapper">
                <div className="shareComment">
                    <img src={user.profilePicture || "/assets/person/noAvatar.png"} alt="" className="commentProfileImg" />
                    <input 
                        className="commentInput" 
                        value={newComment}
                        placeholder={`What do you think of the post ${user.username} ?`}
                        required
                        onChange={(e)=>setNewComment(e.target.value)}
                    />
                    <div className="submitButton" onClick={handleSubmit}>
                        <Send />
                    </div>
                </div>
                <div className="comments">
                    {
                        comments.map(comment=>(
                            <SingleComment key={comment._id} own={comment.commenterId === user._id} comment={comment} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Comments
