import axios from "axios";
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify";


const PostCard = ({id,title,image,content,likes,likesId,showPosts,comment,comments})=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userID = userInfo.id
    console.log("aaaaaaaaaaa" + userInfo.id)

//add like
// const addLike = async () => {
//     try {
//         const { data } = await axios.put(`http://localhost:5000/like/post/${id}`);
//         console.log("likes", data.post);
//         if (data.success == true) {
//             showPosts();
//         }
//     } catch (error) {
//         console.log(error.response.data.error);
//         toast.error(error.response.data.error)
//     }
// }
const addLike = async () => {
    try {
    
        const { data } = await axios.put(`http://localhost:5000/like/post/${id}`);
        // if (data.success) {
        //     showPosts(); // postlarni yangilash
        // }
    } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
    }
}



//remove like
const removeLike = async () => {
    try {
        const { data } = await axios.put(`http://localhost:5000/like/post/delete/${id}`);
        console.log("remove likes", data.post);
        // if (data.success == true) {
        //     showPosts();
        // }
    } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error)
    }
}


    return(
        <>

<div
      className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16"
      style={{ marginTop: "60px" }}
    >
      {/* Blog bo'limi */}
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
          <svg className="h-6 mr-3" viewBox="0 0 455.005 455.005">
            {/* SVG content */}
          </svg>
          <Link to="#" className="font-semibold inline-block">
            Cooking Blog
          </Link>
        </div>
        {title}
        <div>
            <div>
            {
                           likesId.includes(userID) ?
                                <div onClick={removeLike} aria-label="add to favorites">
                                    del
                                </div>
                                :
                                <div onClick={addLike} aria-label="add to favorites">
                                    add
                                </div>
                        }

                        {likes} Like(s)
            </div>

            <div>{comments}</div>
        </div>
      </div>

   
    </div>
        
        </>
    )
}

export default PostCard