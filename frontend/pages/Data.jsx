import React from 'react'
import { useLocation } from 'react-router-dom'
function Data() {
    let location = useLocation()
    // console.log(location.state)
    let data = location.state.data
    let semester = location.state.semester

  return (
    <div>
      {
        data == "No Uploads" ? <p className='w-full h-full  text-4xl'>No Uploads in Semester {semester}</p> : <ul className='flex flex-col gap-4  font-bebas text-2xl'>
        {
            data.map((item,key)=>(
                <li key={key} className='flex items-center justify-center  gap-2 border bg-gray-300 rounded-4xl overflow-hidden hover:scale-105 transition-all' >
                   <div className=' w-full h-full flex justify-evenly flex-wrap'>
                   <p>{item.username}</p>
                   <p>{item.title}</p>
                    <p>{item.email}</p>
                    <p>Semester: {item.semester}</p>
                   </div>
                    {
                        ['img','png','jpg','jpeg'].includes(item.filetype) ? 
                        <div className='w-[80%] h-full'>
                            <img src={item.file} alt="" className=' w-full h-[400px] object-fill '/>
                        </div>: <div className='w-fit flex items-center justify-center rounded-2xl object-cover border-none'>
                        <iframe
  src={`${item.file}#page=1&view=Fit&zoom=150`}
  className="w-full  max-w-[600px] h-[400px] rounded-2xl border-none"
  title="PDF Preview"
/>

                        </div>
                    }
                </li>
            ))
        }
      </ul>
      }
    </div>
  )
}

export default Data
