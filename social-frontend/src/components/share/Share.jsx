import React from 'react'
import './share.css'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@material-ui/icons'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useRef } from 'react'
import { useState } from 'react'
import axios from '../../utils/axios'
import {CircularProgress} from "@material-ui/core"



const Share = () => {

  const {user,convertBase64} = useContext(AuthContext)
  const desc = useRef()
  const [file,setFile] = useState(null)

  const [isProcessing,setIsProcessing] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    setIsProcessing(true)

    if(file){
      const base64 = await convertBase64(file)

      const newPost = {
          userId: user._id,
          desc: desc.current.value,
          img:base64.toString()
      }

      
      try {
        await axios.post("/posts",newPost)
        window.location.reload()
      } catch (error) {
        console.log(error);
        setIsProcessing(false)
      }
    }

    else{
      const newPost = {
          userId: user._id,
          desc: desc.current.value,
      }

      try {
        await axios.post("/posts",newPost)
        window.location.reload()
      } catch (error) {
        console.log(error);
        setIsProcessing(false)
      }
    }
  }

  return (
    <div className='share'>
      <div className="shareWrapper">
          <div className="shareTop">
              <img className='shareProfileImg' src={user.profilePicture ? user.profilePicture : "/assets/person/noAvatar.png"} alt="" />
              <input 
                placeholder={`what's in your mind ${user.username} ?`} 
                className="shareInput" 
                ref={desc}
            />
          </div>
          <hr className='shareHr' />
          {file && (
              <div className="shareImgContainer">
                  <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
                  <Cancel className='shareCancelImg' onClick={()=>setFile(null)} />
              </div>
          )}
          <form className="shareBottom" onSubmit={submitHandler} >
            <div className="shareOptions">
                <label htmlFor='file' className="shareOption">
                    <PermMedia htmlColor='tomato' className='shareIcon' />
                    <span className='shareOptionText'>Photo or video</span>
                    <input style={{display:"none"}} type="file" name='file' id="file" accept='.png, .jpeg, .jpg' onChange={ (e)=>setFile(e.target.files[0]) } />
                </label>
            </div>
            <div className="shareOptions">
                <div className="shareOption">
                    <Label htmlColor='blue' className='shareIcon' />
                    <span className='shareOptionText'>Tag</span>
                </div>
            </div>
            <div className="shareOptions">
                <div className="shareOption">
                    <Room htmlColor='green' className='shareIcon' />
                    <span className='shareOptionText'>Location</span>
                </div>
            </div>
            <div className="shareOptions">
                <div className="shareOption">
                    <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                    <span className='shareOptionText'>Feelings</span>
                </div>
            </div>
            <button className="shareButton" type='submit' disabled={isProcessing} >{ isProcessing ?  <CircularProgress size="25px" />  : "Share"}</button>
          </form>
      </div>
    </div>
  )
}

export default Share
