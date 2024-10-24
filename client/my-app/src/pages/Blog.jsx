import { useEffect, useState } from "react";
import PostCard from "../components/PostCard"
import { io } from "socket.io-client";
import axios from "axios";
const socket = io("/", {
    reconnection: true,
  });
  

const Blog = ()=> {
    const [posts, setPosts] = useState([]);
    const [postAddLike, setPostAddLike] = useState([]);
    const [postRemoveLike, setPostRemoveLike] = useState([]);
  
    //display posts
    const showPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/posts");
        setPosts(data.posts);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
  
    useEffect(() => {
      showPosts();
    }, []);
  
    useEffect(() => {
      socket.on("add-like", (newPosts) => {
        setPostAddLike(newPosts);
        setPostRemoveLike("");
      });
      socket.on("remove-like", (newPosts) => {
        setPostRemoveLike(newPosts);
        setPostAddLike("");
      });
    }, []);
  
    let uiPosts =
      postAddLike.length > 0
        ? postAddLike
        : postRemoveLike.length > 0
        ? postRemoveLike
        : posts;
  console.log(uiPosts)
    return(
        <>
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">

<div className="border-b mb-5 flex justify-between text-sm">
    <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
      aaa
        <a href="#" className="font-semibold inline-block">Cooking BLog</a>
    </div>
    <a href="#">See All</a>
</div>


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">


   
    
{
    uiPosts.map((post,index)=>(
        <PostCard
        key={index+1}
        id = {post._id}
        title={post.title}
        content={post.content}
        image={post.image ? `http://localhost:5000/${post.image}`: "aaa"}
        comments={post.comments.length}
        likes={post.likes.length}
        likesId={post.likes}
        showPosts={showPosts}
        />
    ))
}


   

    
    

</div>

</div>
        </>
    )
}

export default  Blog