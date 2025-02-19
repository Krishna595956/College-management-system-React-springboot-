import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineNoteAdd } from "react-icons/md";
import { useCollege } from "../utils/GlobalContext";
import Modal from "react-responsive-modal";
import api from "../utils/api";

const ViewAcademicsTeacher = () => {
  // const [academics, setAcademics] = React.useState([
  //   {
  //     name: "",
  //     price: "",
  //     description: "",
  //     instructor: "",
  //     startDate: "",
  //     endDate: "",
  //     category: "",
  //     duration: "",
  //   },
  // ]);
  const { academics,bearerHeader } = useCollege();
  const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  const [currentUser,setCurrentUser]=useState({})
  const deleteAcademy = async(id) => {
    try {
     await api.delete(`/college/delete/${id}`,bearerHeader );
      getAllStudents()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
        <div className="">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            View Academics
          </h1>
          {/* <div className="flex justify-end">
            <Link
              to="/admin/add-academics"
              className=" mt-4 text-sm font-medium leading-5  text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
             <MdOutlineNoteAdd className="h-14 w-14 "/>
            </Link>
          </div> */}
       
        </div>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Course Name</th>
                  <th className="px-4 py-3">Total Fee</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Category</th>
                  {/* <th className="px-4 py-3">Actions</th> */}
                </tr>
              </thead>
              <tbody className="bg-white">
               {academics?.map((item,index)=> {
              const  {name,
                price,
                description,
                instructor,
                startDate,
                endDate,
                category,
                duration,}=item;
                return(<tr key={item.id} className="text-gray-700 hover:bg-gray-50">
                  <td className="px-4 py-3 border">{index+1}</td>
                  <td className="px-4 py-3 border">{name}</td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      {price}₹
                    </span>
                  </td>
                  
                 
                  <td className="px-4 py-3 text-sm border">
                    <p>
                      {description}
                    </p>
                  </td> <td className="px-4 py-3 text-ms font-semibold border">{duration} months <span className="font-medium">(From {startDate} to {endDate})</span></td>
                  <td className="px-4 py-3 text-ms font-semibold border">{category}</td>
                  {/* <td className="px-4 py-3 text-ms font-semibold border">
                    <button onClick={()=>{setCurrentUser(item);onOpenModal()}} className="bg-indigo-500 hover:bg-indigo-700 m-2 text-white font-bold py-2 px-4 rounded">
                     <FaEdit/>
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 m-2 text-white font-bold py-2 px-4 rounded">
                      <FaTrash />
                    </button>
                  </td> */}

                </tr>)})}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    
    </div>
  );
};

export default ViewAcademicsTeacher;
