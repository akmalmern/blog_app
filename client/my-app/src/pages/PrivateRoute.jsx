import { Navigate } from "react-router-dom"



const PrivateRoute = ({children})=> {
    const token = JSON.parse(localStorage.getItem("token"));
return token  ? children : <Navigate to="/login"/>
}

export default PrivateRoute