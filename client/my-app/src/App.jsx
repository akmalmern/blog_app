import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

function App() {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
   
    </>
  );
}

export default App;
