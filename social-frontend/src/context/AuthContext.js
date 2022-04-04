import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE)

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])

    const convertBase64 = (imgFile) =>{
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(imgFile)
  
            fileReader.onload = () =>{
              resolve(fileReader.result)
            }
  
            fileReader.onerror = (error) =>{
              reject(error)
            }
        })
    } 

    return(
        <AuthContext.Provider 
            value={{
                user:state.user,
                isFetching:state.isFetching,
                error:state.error,
                dispatch,
                convertBase64
                }} 
        >
            {children}
        </AuthContext.Provider>
    )
}