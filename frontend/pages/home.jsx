import React, { useState } from "react";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [semester, setSemester] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send data using FormData to backend here
    console.log({ semester, title, description, file });
    setShowModal(false); // close after submit
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to CSE - A Portal</h1>

      <div className="flex space-x-10 m-10">
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

      {/* Modal */}
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
    </div>
  );
}

export default Home;
