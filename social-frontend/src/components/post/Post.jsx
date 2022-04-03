import React, { useState,useEffect, useContext } from 'react'
import './post.css'
import { MoreVert } from '@material-ui/icons'
// import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import axios from '../../utils/axios'
import Comments from '../comments/Comments'



const Post = ({post}) => {

  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [seeComments,setSeeComments] = useState(false)
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
  
  return (
    <div className='post'>
      <div className="postWrapper">
          <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user.username}`}>
                  <img className='postProfileImg' src={ user.profilePicture ? user.profilePicture : "/assets/person/noAvatar.png" } alt="" />
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
              {/* {post.img && <img className='postImg' src={ PF+post.img } alt="" />} */}
              {post.img && <img className='postImg' src={post.img.length > 100 ? post.img : PF+post.img} alt="" />}
          </div>
          <div className="postBottom">
              <div className="postBottomLeft">
                  <img className='likeIcon' src="/assets/like.png" onClick={likeHandler} alt="" />
                  <img className='likeIcon' src="/assets/heart.png" onClick={likeHandler} alt="" />
                  <span className="postLikeCounter">{like} people like it</span>  
              </div>
              {
                seeComments
                ||
                <div className="postBottomRight" onClick={()=>setSeeComments(true)}>
                  <span className="postCommentText">comments</span>
                </div>
              }
          </div>
      </div>
      {
        seeComments && <Comments post={post} />
      }
    </div>
  )
}

export default Post
