import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";


function App() {
  return (
    <>
    <ToastContainer />
    <Routes>
     
      {/* <Route path="/home" element={<Home/>} /> */}
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<PrivateRoute>
        <Home/>
      </PrivateRoute>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<NotFound/>} />
  
    </Routes>
   
    </>
  );
}

export default App;
