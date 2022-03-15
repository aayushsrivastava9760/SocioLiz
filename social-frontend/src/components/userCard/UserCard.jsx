import React from 'react'
import { Link } from 'react-router-dom'
import './userCard.css'

const UserCard = ({user}) => {
  const {username,profilePicture,desc} = user
    return (
      <div className='userCard'>
        <div className="userCardWrapper">
          <div>
          <img className='userCardProfilePicture' src={profilePicture || "/assets/person/noAvatar.png"} alt={username} />
          </div>
          <div className="userCardInfo">
            <span className='userCardUsername'>{username}</span>
            <span className='userCardDesc'>{desc}</span>
          </div>
          <div className='buttonWrapper'>
          <Link to={`/profile/${username}`}>
          <button className="userCardButton">View Profile</button>
          </Link>
          </div>
        </div>  
      </div>
    )
}

export default UserCard
