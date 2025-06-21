import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function Admin() {
  let BASE_URL = "http://localhost:8080"
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addUser, setAddUser] = useState(false);
  const [viewUser, setviewUser] = useState(false)
  const [semester, setsemester] = useState(1)
  let navigate = useNavigate()
  const handleAddUser = (e) => {
    e.preventDefault();
    // console.log("User Name:", userName);
    // console.log("Email:", email);
    // console.log("Password:", password);

    axios.post(`${BASE_URL}/newuser`,{userName, email, password})
    .then(res=>{
      console.log(res.data)
      if(res.status == 201){
        toast.error(res.data)
      }
      else{
        toast.success(res.data)
      }
    })

    // setAddUser(false); // Close modal
    // setUserName("");
    // setEmail("");
    // setPassword("");

  };
  // console.log(semester)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer/>
      <h1 className="text-3xl m-10 font-bold">Welcome Admin!</h1>

      <div>
        <button
          className="bg-purple-600 text-white font-semibold p-5 rounded-xl hover:bg-purple-700 transition duration-300 m-10"
          onClick={() => setAddUser(true)}
        >
          Add User
        </button>

        <button className="bg-purple-600 text-white font-semibold p-5 rounded-xl hover:bg-purple-700 transition duration-300 m-10"
          onClick={() => setviewUser(true)}>
          View Certificates
        </button>
      </div>

      {/* Modal */}
      {addUser && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Add User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border-2 border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-2 rounded-xl hover:bg-purple-700 transition duration-300"
              >
                Add User
              </button>

              <button
                type="button"
                onClick={() => setAddUser(false)}
                className="w-full bg-gray-300 text-black font-semibold py-2 rounded-xl hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
         {viewUser && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">View Certificates</h2>
            <div  className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  placeholder='Enter your username'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border-2 border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
              <label className="block text-sm font-medium">Semester</label>
              <div>
                <select name="sem" value={semester} id="" className="px-10 py-2 rounded-xl outline-1" onChange={(e)=>setsemester(e.target.value)}>
                  {
                    [...Array(8)].map((_, key)=>(
                      <option key={key} value={key + 1}>
                        Semester {key + 1}
                      </option>
                    ))
                  }
                </select>
                
                
              </div>

              <button
                
                className="w-full bg-purple-600 text-white font-semibold py-2 rounded-xl hover:bg-purple-700 transition duration-300"
                onClick={() =>{
                  axios.post(`${BASE_URL}/finddata`,{username:userName, semester:semester})
                  .then(res=>{
                    // console.log(res.data.length)
                    if(res.status !=201){
                      if(res.data.length>0){
                        navigate("/data",{state:{
                          data:res.data
                        }})
                      }
                      else{
                        navigate("/data",{state:{
                          data:"No Uploads",
                          semester: semester
                        }})
                      }
                    }else{
                      toast.error(res.data)
                    }
                  })
                }}
              >
                Submit
              </button>

              <button
                type="button"
               
                className="w-full bg-gray-300 text-black font-semibold py-2 rounded-xl hover:bg-gray-400 transition duration-300"
                onClick={()=>setviewUser(!viewUser)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
