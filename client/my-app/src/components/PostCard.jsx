import axios from "axios";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

const PostCard = ({
    id,
    title,
    image,
    content,
    likes,
    likesId,
    showPosts,
    comment,
    comments,
  })=>{

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userID = userInfo.id;
  
    // Like qo'shish funksiyasi
    const addLike = async () => {
      try {
        const { data } = await axios.put(
          `http://localhost:5000/like/post/${id}`,
          {}, // Bodyda ma'lumot yo'q, shuning uchun bo'sh object
          {
            withCredentials: true, // Cookie'larni yuborish uchun kerak
          }
        );
        if (data.success ===true) {
          showPosts(); // Postlarni yangilash funksiyasi
        }
      } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      }
    };
  
    // Like olib tashlash funksiyasi
    const removeLike = async () => {
      try {
        const { data } = await axios.put(
          `http://localhost:5000/like/post/delete/${id}`,
          {}, // Bodyda ma'lumot yo'q
          {
            withCredentials: true, // Cookie'larni yuborish
          }
        );
        if (data.success === true) {
          showPosts(); // Postlarni yangilash funksiyasi
        }
      } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      }
    };
  
    return(
        <>
        <div className="rounded overflow-hidden shadow-lg flex flex-col">
       
        <div className="relative">
                <img className="w-full"
                    src={image}
                    alt="Sunset in the mountains"/>
                <div
                    className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                </div>
           
            <Link >
                <div
                    className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                    Cooking
                </div>
            </Link>
        </div>
        <div className="px-6 py-4 mb-auto">
            <a href="#"
                className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{title}</a>
            <p className="text-gray-500 text-sm">
              {content}
            </p>
        </div>
        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
            <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          {
            likesId.includes(userID) ? (
                <div onClick={removeLike}>

<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="red" />
</svg>

                </div>
            ): (
               <div onClick={addLike}>
             <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" stroke="red" strokeWidth="2"/>
</svg>

               </div>
            )
          }

                <span className="ml-1" style={{fontSize:"16px"}}>{likes}</span>
            </span>
            <span  className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
               <Link to={`/single/${id}`}>
               <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                    </path>
                </svg>

                </Link>

                <span className="ml-1  " style={{fontSize:"16px"}} >{comments} </span>
              
            </span>
        </div>
    </div>       
        </>
    )
}

export default PostCard