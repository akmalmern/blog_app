import axios from "axios";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import PostCard from "../components/PostCard";

const socket = io('/', {
    reconnection: true
})





const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postAddLike, setPostAddLike] = useState([]);
  const [postRemoveLike, setPostRemoveLike] = useState([]);
  
    //display posts

    const showPosts = async () => {
      try {
          const { data } = await axios.get('http://localhost:5000/posts');
          setPosts(data.posts);
      } catch (error) {
          console.log(error.response.data.error);
      }
  }

  useEffect(() => {
      showPosts();
  }, []);

  useEffect(() => {
      socket.on('add-like', (newPosts) => {
          setPostAddLike(newPosts);
          setPostRemoveLike('');
      });
      socket.on('remove-like', (newPosts) => {
          setPostRemoveLike(newPosts);
          setPostAddLike('');
      });
  }, [])

  let uiPosts = postAddLike.length > 0 ? postAddLike : postRemoveLike.length > 0 ? postRemoveLike : posts;
  console.log(uiPosts)

  return (
    <>
   
   <div >
               
                <div >
                    <div >
                        <div>

                            {
                               

                                    uiPosts.map((post, index) => (
                                        <div  key={index+1}>
                                            <PostCard
                                                id={post._id}
                                                title={post.title}
                                                content={post.content}
                                                // image={post.image ? post.image.url : ''}
                                                // subheader={moment(post.createdAt).format('MMMM DD, YYYY')}
                                                comments={post.comments.length}
                                                likes={post.likes.length}
                                                likesId={post.likes}
                                                showPosts={showPosts}
                                            />
                                        </div>
                                    ))
                            }

                        </div>
        </div>            </div>
        </div>           
     
    </>
  );
};

export default Home;
