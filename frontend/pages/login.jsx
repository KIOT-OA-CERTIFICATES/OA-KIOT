import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8  border-2 border-purple-300">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Login</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
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
