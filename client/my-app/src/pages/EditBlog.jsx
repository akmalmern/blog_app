import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


const EditBlog = ()=>{

    const {id} = useParams()
    const [title,setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const navigate = useState()

       //show post by Id
       const singlePostById = async () => {
        // console.log(id)
        try {
            const { data } = await axios.get(`http://localhost:5000/singlepost/${id}`,{withCredentials:true});
            console.log(data)
            setTitle(data.onepost.title);
            setContent(data.onepost.content);
            setImagePreview(data.onepost.image);

        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    useEffect(() => {
        singlePostById()
    }, [])


const handleSubmit = ()=>{

}

    return(
        <>
             <div className="w-full bg-white rounded-lg items-center justify-center shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700 ">
           <div className="p-6 space-y-4 md:space-y-6 sm:p-8 items-center justify-center" >
               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ">
                  Blog qoshish
               </h1>
               <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit} > 
                   <div>
                       <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                       <input type="text" 
                        value={title}
                         onChange={(e) => {
                           setTitle(e.target.value);
                         }}
                       id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="blog title" required=""/>
                   </div>
                   <div>
                     
<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
<textarea id="message"   
value={content}
onChange={(e) => {
                           setContent(e.target.value);
                         }} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                      
                   </div>
                   <div>
                     
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
<img className="w-full"
                  src={`http://localhost:5000/${imagePreview}`}
                  alt="Sunset in the mountains"/>
<input  className=" p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" 
value={image}
onChange={(e) => {
                           setImage(e.target.files[0])
                         }} />

                   </div>
                 
                
                   <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> Blog +</button>
                 
               </form>
           </div>
       </div>
 
        </>
    )
}

export default EditBlog