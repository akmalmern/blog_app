import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SinglePage from "./components/SinglePage";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import PrivateRoute from "./pages/PrivateRoute"
import UserProfile from "./pages/user-profile/UserProfile";
import EditBlog from "./pages/EditBlog";
=======
import PrivateRoute from "./pages/PrivateRoute";
import Footer from "./components/Footer";
>>>>>>> fc57a5d0facf280d12c6c5d7d074f3e873e5e572

function App() {
  return (
    <>
<<<<<<< HEAD
    <ToastContainer />
    <Navbar/>
    <Routes>
 
      {/* <Route path="/home" element={<Home/>} /> */}
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<PrivateRoute>
        <Home/>
      </PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute>
        <UserProfile/>
      </PrivateRoute>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path = "/edit/:id" element={<EditBlog/>}/>
      <Route path="/single/:id" element={<SinglePage/>} />
      <Route path="*" element={<NotFound/>} />
   
    </Routes>

=======
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* <Route path="/home" element={<Home/>} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/single/:id" element={<SinglePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
>>>>>>> fc57a5d0facf280d12c6c5d7d074f3e873e5e572
    </>
  );
}

export default App;
