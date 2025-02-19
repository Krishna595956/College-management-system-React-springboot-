import React from 'react'
import api from '../utils/api'
import { useCollege } from '../utils/GlobalContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UploadMaterial = () => {
    const [data, setData] = React.useState(
        {
            
            name: '',
            file: '',
            description: ''
        }
    )
    const handleChange = (e) => {
        const { name, value,files } = e.target
        if (files) {
            setData({ ...data, [name]: files[0] })
        }else{

            setData({ ...data, [name]: value })
        }

    }
    const {teachers,bearerHeader}=useCollege();


    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',data.name);
        formData.append('file',data.file);
        formData.append('description',data.description);
     try {
       await api.post(`/college/upload/materials`,formData,bearerHeader);
       toast.success('Material Uploaded Successfully');
       setData({
        name: '',
        file: '',
        description: ''
       
       })
     } catch (error) {
        console.log(error);
     }   
    }
  return (
    <div>
        <div className="container">
            <div className="flex flex-col justify-center items-center bg-gray-100 p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} >
                    <div className="grid border rounded-md p-3 shadow-md shadow-slate-400">
                        <h1 className="text-3xl font-bold mb-4">Upload Material</h1>
                        <div className="">
                            <label htmlFor="title" className="text-gray-500 block">Title</label>
                            <input type="text" id="title"name='name' value={data.name} onChange={handleChange}  className="border border-gray-300 rounded-md p-2 w-full" />
                        </div>
                        <div className="">
                            <label htmlFor="file" className="text-gray-500 block">Select File</label>
                            <input type="file" id="file" name='file' onChange={handleChange} accept="application/pdf"  className="border border-gray-300 rounded-md p-2 w-full" />
                        </div>
                        
                        <div className="">
                            <label htmlFor="description" className="text-gray-500 block">Description</label>
                            <textarea id="description" name='description' value={data.description} onChange={handleChange} className="border border-gray-300 rounded-md p-2  w-full" />
                        </div>
                        <div className="">
                        <button type="submit" className="bg-purple-500 text-center w-full text-white px-4 py-2 rounded-md mt-4">Upload</button>
                    </div>
</div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UploadMaterial