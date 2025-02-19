import React, { useState } from "react";
import { FaTrash, FaUserEdit, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Modal } from 'react-responsive-modal';
import UpdateStudent from "./UpdateStudent";
import { useCollege } from "../utils/GlobalContext";
import api, { backend_url } from "../utils/api";
const ViewStudents = () => {
  // const [students, setStudents] = useState([
  //   {
  //     id
  //     name
  //     email
  //     mobileNumber
  //     address
  //     image
  //   },
  // ]);
  const [open, setOpen] = useState(false);
const {students,getAllStudents,bearerHeader,role}=useCollege()
const [currentUser,setCurrentUser]=useState({})
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const deleteStudent = async(id) => {
    try {
    await  api.delete(`/college/delete/${id}`,bearerHeader );
      getAllStudents()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="container">
        <div className="text-center text-2xl font-bold">All Students</div>
       {role==="Admin"&& <div className="flex justify-end items-center mb-5">
          <Link
            to={"/admin/add-student"}
            className=" text-xl  bg-blue-500 text-white rounded-lg p-3"
          >
            <FaUserPlus className=" h-8 w-8  " />
          </Link>
        </div>}
        <div className="flex flex-wrap gap-5">
          {students?.map((item, index) =>{
            const { id,
                  name,
                  email,
                  mobileNumber,
                  address,
                  image}=item
            return(
            <motion.div 
              drag
              key={item.id}
            //   dragElastic={0.2}
            //   dragConstraints={{ left: 0, top: 300, right: 300, bottom: 300 }}
            >
              {" "}
              <div className="bg-gray-100 min-w-72 min-h-72 p-3 rounded-lg hover:bg-gray-200">
                <div className=" flex justify-center items-center mb-5">
                  <img
                    src={`${backend_url}/images/${image}`}
                    className="rounded-full w-36 h-36"
                    alt=""
                  />
                </div>
                <div className=" flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span>Name</span>
                    <span>{name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Email</span>
                    <span>{email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mobile Number</span>

                    <span>{mobileNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Address</span>
                    <span>{address}</span>
                  </div>

                 {role==="Admin"&& <div className="flex justify-between items-center">
                    <span>
                      <button onClick={()=>{
                        setCurrentUser(item)
                        onOpenModal()
                        }}>
                        <FaUserEdit className="text-green-500 h-8 w-8" />
                      </button>
                    </span>
                    <button className="" onClick={()=>deleteStudent(id)}>
                      <FaTrash className="text-red-500 h-6 w-6" />
                    </button>
                  </div>}
                </div>
              </div>
            </motion.div>
          )})}

        </div>
      </div>
      
      <Modal open={open} onClose={onCloseModal} center>
        <UpdateStudent currentUser={currentUser}/>
      </Modal>
    </div>
  );
};

export default ViewStudents;
