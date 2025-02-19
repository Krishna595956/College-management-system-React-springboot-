import React from 'react'
import api from '../utils/api'
import { useCollege } from '../utils/GlobalContext'
import { toast } from 'react-toastify'

const SubmitAssignment = ({data,onClose}) => {
    const [pdfFile,setPdfFile] = React.useState(null)
    const {bearerHeader}=useCollege()
    const submitAssignment=async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('pdfFile',pdfFile)
        formData.append('assignmentId',data.id)
        try {
            await api.post(`/college/submit/student/assignments/${data.id}`,formData,bearerHeader)
           toast.success('Assignment Submitted Successfully')
            onClose()
        } catch (error) {
            toast.error(error.response.data.err)
            console.error(error);
        }
      
    }
  return (
    <div>
        <div className="w-full">
            <div className="flex flex-col  items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Submit Assignment</h2>
                <div className="flex items-center">
                    <input type="file" className='border w-full p-2 rounded' accept=' .pdf' onChange={(e)=>setPdfFile(e.target.files[0])}/>
                    <button onClick={submitAssignment} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SubmitAssignment