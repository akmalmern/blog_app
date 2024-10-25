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
import PrivateRoute from "./pages/PrivateRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <>
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
        <Route path="/login" element={<Login />} />
        <Route path="/single/:id" element={<SinglePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
