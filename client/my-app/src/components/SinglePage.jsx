import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
const socket = io('/', {
    reconnection: true
})



const SinglePage = ()=>{
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  // const [createdAt, setCreatedAt] = useState('');
  // const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsRealTime, setCommentsRealTime] = useState([]);




  const { id } = useParams();

  const singlePost = async()=>{
    try {
      const {data} = await axios.get(`http://localhost:5000/singlepost/${id}`) 
      setTitle(data.onepost.title);
       console.log(data)
      setContent(data.onepost.content);
      setImage(data.onepost.image);
      // setCreatedAt(data.post.createdAt);
      setComments(data.onepost.comments);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(()=>{
singlePost()
},[]);


useEffect(() => {
  // console.log('SOCKET IO', socket);
  socket.on('new-comment', (newComment) => {
      setCommentsRealTime(newComment);
  })
}, [])



   // add comment
   const addComment = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.put(`http://localhost:5000/comment/post/${id}`, { comment },{
          withCredentials: true
        });
        if (data.success === true) {
            setComment('');
            toast.success("comment added");
            singlePost();
            socket.emit('comment', data.post.comments);
        }
        console.log("comment post", data.post)
    } catch (error) {
      if (error.response) {
        // So'rov muvaffaqiyatsiz bo'ldi, va serverdan javob olindi
        console.log("Error data:", error.response.data.error);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);}
        console.log(error);
        toast.error(error.response.data.error);
    }
}

let uiCommentUpdate = commentsRealTime.length > 0 ? commentsRealTime : comments;


    return(
        <>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-10  mt-20">
       
            <div
              className="rounded md:container md:mx-auto  overflow-hidden shadow-lg flex flex-col"
           
            >
              <div>
              <div className="relative">
               
                  <img
                    src={`http://localhost:5000/${image}`}
                    alt="Blog Image"
                  />
               
                  <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            
              
              </div>
              <div className="px-6 py-4 mb-auto">
                <a
                  href="#"
                  className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                >
                 {title}
                </a>
                <p className="text-gray-500 text-sm">{content}</p>
            
             
              </div>
              </div>
         

<section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
  <div className="max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Commentlar {comments.length}</h2>
    </div>
    {
userInfo ? (<div>
<form className="mb-6" onSubmit={addComment}>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea 
            onChange={(e)=> setComment(e.target.value)}
            value={comment}
            name="comment"
             id="comment" rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
        </div>
        <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>
    </form>
</div>) : (<div>
                                                <Link to='/login'> Log In to add a comment</Link>
                                            </div>)
    }
    
   {
    uiCommentUpdate.map((comment,index) => (
      <article key={index +1} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough"/>
                      {comment.postedBy.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400"><time  dateTime="2022-02-08"
                      title="February 8th, 2022">Feb. 8, 2022</time></p>
          </div>
        
  
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
  
  </article>
    ))
   }

  </div>
</section>

            </div>
        
        </div>
        </>
    )
}


export default SinglePage