import React, { useState } from "react";
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
function Home() {
  const [showModal, setShowModal] = useState(false);
  const [semester, setSemester] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [leave , setleave] = useState(false);
  const[user,setuser] = useState()
  const [showimage, setshowimage] = useState(false)
  const [image, setimage] = useState("")
  const BASE_URL = "http://localhost:8080"
  const handleSubmit = (e) => {
    e.preventDefault();
    let newform = new FormData()

    axios.get(`${BASE_URL}/check`,{withCredentials:true})
    .then(res=>{
      // console.log(res.data.email)
      if(res.data.email){
        let loading = toast.loading("Processing",{theme:"colored"})
        let username = res.data.username
        let email = res.data.email
        newform.append("file",file),
        newform.append("username", username)
        newform.append("email", email)
        newform.append("semester", semester)
        newform.append("title",title)
        newform.append("description", description)
        axios.post(`${BASE_URL}/upload`,newform,{
          headers:{
            "Content-Type":"multipart/formdata"
          }
        })
        .then(res=>{
          if(res.data){
            toast.update(loading, {autoClose:2000, render:"Success", type:"success", isLoading:false})
            setshowimage(true)
            setimage(res.data)
          }
          else{
            toast.update(loading, {autoClose:2000, render:"Something went wrong", type:"error"})
          }
        })
      }
      else{
        toast.error(res.data)
      }
    })
   

    // console.log(newform)

   
    // You can send data using FormData to backend here
    // console.log({  file });
    // setShowModal(false); // close after submit
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 z-0">
     <ToastContainer/>
      <h1 className="text-4xl font-bold mb-4">Welcome to CSE - A Portal</h1>

      <div className="flex space-x-10 m-10 z-30">
        <button
          className="bg-purple-600 text-white font-semibold p-5 rounded-xl hover:bg-purple-700 transition duration-300"
          onClick={() => setShowModal(true)}
        >
          Certificate Upload
        </button>

        <button className="bg-purple-600 text-white font-semibold p-5 rounded-xl hover:bg-purple-700 transition duration-300">
          Leave Request
        </button>
      </div>

    {/* Leave Request Modal */}
    {leave && (
        <div className="fixed inset-0 bg-blur-medium bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-lg flex flex-col items-center">
                <h1 className="text-2xl font-bold text-purple-700 mb-6">Under Progress</h1>
                <button
                    type="button"
                    onClick={() => setleave(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                >
                    Close
                </button>
            </div>
        </div>
    )}
      {showModal && (
        <div className="fixed inset-0 bg-blur-medium bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-lg">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Upload Certificate</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2"
                  required
                >
                  <option value="">Select Semester</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i} value={`Semester ${i + 1}`}>
                      Semester {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Certificate Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Upload File</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full"
                  required
                />
              </div>

              <div className="flex justify-between mt-6">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-600  text-white px-4 py-2 rounded-xl hover:bg-red-700"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                >
                  Submit
                </button>
                
              </div>
            </form>
          </div>
          
        </div>
        
      )}
      {showimage ? 
      <div className="w-[80%] h-[80%] z-50 fixed  rounded-3xl borderf flex items-center justify-center  " onClick={()=>{
        setshowimage(!showimage)
      }}>
        <div className=" w-[50%] object-cover flex items-center flex-col justify-center gap-3 font-bold z-50 border rounded-md backdrop-blur-2xl py-10" 
        
          onClick={(e)=>
           e.stopPropagation()
          }
        >
          <img src={image} alt="" className="w-[50%] h-[50%]" 
          />
          <p>{semester}</p>
          <p>Title: {title}</p>
          <p>Description: {description}</p>

        </div>
      </div> :""}
    </div>
  );
}

export default Home;
