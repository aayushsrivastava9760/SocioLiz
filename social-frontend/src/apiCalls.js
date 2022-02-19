import axios from "axios"


export const loginCall = async (userCredential,dispatch) =>{
    dispatch({type:"LOGIN_START"})
    try {
        const res = await axios.post("http://localhost:8800/api/auth/login",userCredential)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        // axios({
        //     url: "http://localhost:8800/api/auth/login",
        //     method: 'post',
        //     data: userCredential,
        // }).then(function({res, status}){
        //     dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        //   }).catch(function(err) {
        //     dispatch({type:"LOGIN_FAILURE",payload:err})
        //   })
        
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE",payload:error})
    }
}

export const logoutCall = (dispatch) =>{
    dispatch({type:"LOGOUT"})
}