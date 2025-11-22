import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [username, setusername] = useState();

  useEffect(() => {
    axios.get("http://localhost:8080/check", { withCredentials: true }).then((res) => {
      setusername(res.data.username);
    });
  }, []);

  const [subno, setsubno] = useState(0);
  const [gpa, setgpa] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [semester, setSemester] = useState("");
  // const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [leave, setleave] = useState(false);
  const [showimage, setshowimage] = useState(false);
  const [image, setimage] = useState("");
  const BASE_URL = "http://localhost:8080";
  const [type, settype] = useState();
  const [title, settitle] = useState("Select Certificate Type")
  console.log(title);
  let lastLoggedPercent = 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    let newform = new FormData();

    axios.get(`${BASE_URL}/check`, { withCredentials: true }).then((res) => {
      if (res.data.email) {
        let loading = toast.loading("Processing", { theme: "colored" });
        let username = res.data.username;
        let email = res.data.email;

        newform.append("file", file);
        newform.append("username", username);
        newform.append("email", email);
        newform.append("semester", semester);
        newform.append("title", title);
        newform.append("description", description);
        
        axios
          .post(`${BASE_URL}/upload`, newform, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            transformRequest: [(data) => data],
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );

              // Log only at 10% intervals
              if (percentCompleted - lastLoggedPercent >= 10 || percentCompleted === 100) {
                console.log(`Upload progress: ${percentCompleted}%`);
                lastLoggedPercent = percentCompleted;
              }
            }
          })
          .then((res) => {
            if (res.data) {
              toast.update(loading, {
                autoClose: 2000,
                render: "Success",
                type: "success",
                isLoading: false,
              });
              setshowimage(true);
              setimage(res.data.url);
              settype(res.data.type);
            } else {
              toast.update(loading, {
                autoClose: 2000,
                render: "Something went wrong",
                type: "error",
              });
            }
          });
      } else {
        toast.error(res.data);
      }
    });
  };

  const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    subjects.forEach((subject) => {
      const grade = parseFloat(subject.grade);
      const credit = parseFloat(subject.credit);
      if (!isNaN(grade) && !isNaN(credit)) {
        totalGradePoints += grade * credit;
        totalCredits += credit;
      }
    });

    if (totalCredits === 0) {
      toast.error("Total credits cannot be zero!");
      return;
    }

    const gpa = totalGradePoints / totalCredits;
    toast.success(`Your GPA is ${gpa.toFixed(2)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-4">Welcome - {username}!</h1>

      <div className="flex space-x-10 m-10">
        <button
          className="bg-purple-600 text-white font-semibold p-5 rounded-xl hover:bg-purple-700"
          onClick={() => setShowModal(true)}
        >
          Certificate Upload
        </button>

        <button
          className="bg-purple-600 text-white font-semibold p-5 rounded-xl hover:bg-purple-700"
          onClick={() => setgpa(true)}
        >
          GPA Calculator
        </button>

         <button
          className="bg-purple-600 text-white font-semibold p-5 rounded-xl hover:bg-purple-700"
          onClick={() => setleave(true)}
        >
Leave Request        </button>
      </div>

        {/* ---------------------------------------------------------------- */}
    {/* Leave Request Modal */}
    {leave && (
        <div className="fixed inset-0 bg-blur-medium bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-lg flex flex-col items-center">
                <h1 className="text-2xl font-bold text-purple-700 mb-6">Leave Request - Under Progress</h1>
                <button
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                onClick={() => setleave(false)}>
                    Close
                </button>
            </div>
        </div>
    )}
    {/* ---------------------------------------------------------------- */}

      {/* GPA Calculator Modal */}
      {gpa && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-xl shadow-lg flex flex-col items-center">
            <h1 className="text-2xl font-bold text-purple-700 mb-6">GPA Calculator</h1>

            <div className="w-full">
              <label className="block text-sm font-medium">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-2 mb-5 mt-2"
                required
              >
                <option value="">Select Semester</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i} value={`${i + 1}`}>
                    Semester {i + 1}
                  </option>
                ))}
              </select>

              <label className="block text-sm font-medium">Number of Subjects</label>
              <input
                type="number"
                value={subno}
                onChange={(e) => {
                  const count = parseInt(e.target.value);
                  setsubno(count);
                  const newSubjects = Array.from({ length: count }, () => ({
                    grade: "",
                    credit: "",
                  }));
                  setSubjects(newSubjects);
                }}
                className="w-full border border-gray-300 rounded-xl p-2 mt-2 mb-5"
                required
              />

              {/* Subject Inputs */}
              {subjects.map((subject, index) => (
                <div key={index} className="flex space-x-4 mb-3">
                  <input
                    type="number"
                    placeholder={`Grade Point for Subject ${index + 1}`}
                    className="border border-gray-300 rounded-xl p-2 w-1/2"
                    value={subject.grade}
                    onChange={(e) => {
                      const updatedSubjects = [...subjects];
                      updatedSubjects[index].grade = e.target.value;
                      setSubjects(updatedSubjects);
                    }}
                    required
                  />
                  <input
                    type="number"
                    placeholder={`Credit for Subject ${index + 1}`}
                    className="border border-gray-300 rounded-xl p-2 w-1/2"
                    value={subject.credit}
                    onChange={(e) => {
                      const updatedSubjects = [...subjects];
                      updatedSubjects[index].credit = e.target.value;
                      setSubjects(updatedSubjects);
                    }}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-4 w-full mt-4">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
                onClick={calculateGPA}
              >
                Calculate
              </button>
              <button
                type="button"
                onClick={() => setgpa(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center z-50">
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
                    <option key={i} value={`${i + 1}`}>
                      Semester {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Certificate Title</label>
                {/* <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2"
                  required
                /> */}
                <select name="type" id="" className="w-full border border-gray-300 rounded-xl p-2" value={title} onChange={(e) => settitle(e.target.value)}>
                  <option value="Conference"> Conference</option>
                  <option value="NPTEL">NPTEL</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Paper Presentation">Paper Presentation</option>
                  <option value="Contest">Contest</option>
                  <option value="NonTech">Non Tech</option>
                </select>

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
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
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

      {/* Show Image */}
      {showimage && (
        <div
          className="w-[80%] h-[80%] fixed rounded-3xl border flex items-center justify-center z-50"
          onClick={() => setshowimage(false)}
        >
          <div
            className="w-[70%] min-h-[300px] flex flex-col items-center gap-3 font-bold border rounded-md backdrop-blur-2xl py-10"
            onClick={(e) => e.stopPropagation()}
          >
            {["png", "jpg", "jpeg", "webp"].includes(type) ? (
              <img src={image} alt="" className="w-[60%] h-[60%] object-cover" />
            ) : (
              <iframe src={image} className="w-[60%] h-[80%] object-cover" />
            )}
            <p>Semester: {semester}</p>
            <p>Title: {title}</p>
            <p>Description: {description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
