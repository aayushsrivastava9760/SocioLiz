import axios from './utils/axios'


export const loginCall = async (userCredential,dispatch) =>{
    dispatch({type:"LOGIN_START"})
    try {
        const res = await axios.post("/auth/login",userCredential)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE",payload:error})
    }
}

export const logoutCall = (dispatch) =>{
    dispatch({type:"LOGOUT"})
}


export const updateCall = (userInfo,dispatch) =>{
    dispatch({type:"LOGIN_SUCCESS",payload:userInfo})
}