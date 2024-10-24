// import { Navigate } from "react-router-dom"

// const PrivateRoute = ({children})=> {
//     const token = JSON.parse(localStorage.getItem("userInfo"))
//     console.log(token)
// return token.role ==="user"  ? children : <Navigate to="/login"/>
// }

// export default PrivateRoute

import { Navigate, useLocation } from "react-router-dom";

const UserRoute = ({ children }) => {
  //   const { userInfo } = useSelector((state) => state.signIn);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const location = useLocation();

  if (!userInfo || userInfo.role !== "user") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default UserRoute;
