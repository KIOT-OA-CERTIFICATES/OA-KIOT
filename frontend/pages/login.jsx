import React, { useState } from 'react';
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  function handleLogin(e) {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    axios.post("http://localhost:8080/login",{email, password}, {withCredentials:true})
    .then(res=>{
      // console.log(res)
      if(res.status == 201){
        toast.error(res.data)
      }
      else if(res.status == 200){
        toast.success(res.data, {autoClose:1500}),
        setTimeout(()=>{
          navigate("/home")
        },2000)


      }
      
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <ToastContainer/>
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8  border-2 border-purple-300">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Login</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded-xl hover:bg-purple-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
