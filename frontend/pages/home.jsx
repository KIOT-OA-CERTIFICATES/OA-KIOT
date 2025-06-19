function Home(){
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

            <h1 className="text-4xl font-bold mb-4">Welcome to CSE - A Portal</h1>

            <div className="flex space-x-10 m-10">
                <button className="w-full bg-purple-600 text-white font-semibold p-5 rounded-xl hover:bg-purple-700 transition duration-300">Certificate</button>
                <button className="w-full bg-purple-600 text-white font-semibold p-5 rounded-xl hover:bg-purple-700 transition duration-300">Leave</button>
            </div>
        </div>
    );
}

export default Home;