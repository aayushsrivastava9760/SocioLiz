import React,{ useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from '../../utils/axios'
import './details.css'

const Details = () => {

    const [profilePicture,setProfilePicture] = useState(null)
    const desc = useRef()
    const city = useRef()
    const country = useRef()
    const navigate = useNavigate()

    const {user,convertBase64} = useContext(AuthContext)

    const submitHandler = async (e) =>{

        e.preventDefault()

        if(profilePicture){
            const base64 = await convertBase64(profilePicture)

            const details = {
                userId:user._id,
                desc:desc.current.value,
                city:city.current.value,
                from:country.current.value,
                profilePicture:base64.toString()
            }

            try {
                await axios.patch(`/users/${user._id}`,details)
                navigate("/")
            } catch (error) {
                console.log(error);
            }
        }

        else{
            const details = {
                userId:user._id,
                desc:desc.current.value,
                city:city.current.value,
                from:country.current.value
            }

            try {
                await axios.patch(`/users/${user._id}`,details)
                navigate("/")
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocioLiz</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on SocioLiz.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={submitHandler} >
                        <div className='imgBlock'>
                            <label htmlFor='file'>
                                <img className='loginImg' src={profilePicture ? URL.createObjectURL(profilePicture) : "/assets/person/noAvatar.png"} alt={user.username} />
                                <input style={{display:"none"}} type="file" name='file' id="file" accept='.png, .jpeg, .jpg' onChange={(e)=>setProfilePicture(e.target.files[0])} />
                            </label>
                            <p className='loginName'>{user.username}</p>
                        </div>
                        <input
                            placeholder='A short description of yourself'
                            ref={desc}
                            className='loginInput'
                        />
                        <input
                            placeholder='City'
                            ref={city}
                            className='loginInput'
                        />
                        <input
                            placeholder='Country'
                            ref={country}
                            className='loginInput'
                        />
                        <button className="loginButton" type='submit'>Continue</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Details
