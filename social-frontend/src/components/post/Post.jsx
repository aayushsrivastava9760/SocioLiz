import React, { useState,useEffect, useContext } from 'react'
import './post.css'
import { MoreVert } from '@material-ui/icons'
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'


const Post = ({post}) => {

  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})

  const {user:currentUser} = useContext(AuthContext)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser()
  },[post.userId])

  const likeHandler = () =>{
    try {
      const updateLike = async ()=>{
        await axios.patch(`/posts/${post._id}/like`,{
          userId:currentUser._id
        })
      }
      updateLike()
      if(post.userId!==currentUser._id){
        setLike(isLiked? like-1 : like+1)
        setIsLiked(!isLiked)
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  // console.log(post.userId,post.likes);
  
  return (
    <div className='post'>
      <div className="postWrapper">
          <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user.username}`}>
                  <img className='postProfileImg' src={ user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.png" } alt="" />
                </Link>
                  <span className="postUsername">
                    {user.username}
                  </span>
                  <span className="postDate">{format(post.createdAt)}</span>
              </div>
              <div className="postTopRight">
                <MoreVert />
              </div>
          </div>
          <div className="postCenter">
              <span className="postText">{post?.desc}</span>
              <img className='postImg' src={PF+post.img} alt="" />
          </div>
          <div className="postBottom">
              <div className="postBottomLeft">
                  <img className='likeIcon' src="/assets/like.png" onClick={likeHandler} alt="" />
                  <img className='likeIcon' src="/assets/heart.png" onClick={likeHandler} alt="" />
                  <span className="postLikeCounter">{like} people like it</span>  
              </div>
              <div className="postBottomRight">
                  <span className="postCommentText">{post.comment} comments</span>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Post
