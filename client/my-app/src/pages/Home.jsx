import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Blog from "./Blog";

const Home = () => {
  const navigate = useNavigate();
  const logOut = () => {
    axios
      .get("http://localhost:5000/logout")
      .then((result) => {
        localStorage.removeItem("token");

        toast.success(result.data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar />

      <Blog />
    </>
  );
};

export default Home;
