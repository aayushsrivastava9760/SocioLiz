import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user:null,
    isFetching:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE)

    return(
        <AuthContext.Provider 
            value={{
                user:state.user,
                isFetching:state.isFetching,
                error:state.error,
                dispatch
                }} 
        >
            {children}
        </AuthContext.Provider>
    )
}

// {
//     _id:"61df462bfeb57b81f8d9b21f",
//     username:"shyam",
//     email:"shyam@gmail.com",
//     password:"$2b$10$lsYICbywg5EWrJpDi6xReu2BqjZs/mTMiWJrHMVZOU/06DUL5brKK",
//     profilePicture:"",
//     coverPicture:"",
//     followers:[],
//     following:["61dd468ac7bf8f654a96490a","61dd91d8fbf48156ebac8dbd"],
//     isAdmin:false,
//     createdAt:"2022-01-12T21:20:43.454+00:00",
//     updatedAt:"2022-01-12T21:26:14.821+00:00"
// }