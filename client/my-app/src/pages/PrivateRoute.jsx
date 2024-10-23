import { Navigate } from "react-router-dom"



const PrivateRoute = ({children})=> {
    const token = JSON.parse(localStorage.getItem("userInfo"))
    console.log(token)
return token.role ==="user"  ? children : <Navigate to="/login"/>
}

export default PrivateRoute