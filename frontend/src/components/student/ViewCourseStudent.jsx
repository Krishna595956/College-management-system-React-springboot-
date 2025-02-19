import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useCollege } from "../utils/GlobalContext";
import Modal from "react-responsive-modal";
import MakePayment from "./MakePayment";
import api from "../utils/api";
import { toast } from "react-toastify";

const ViewCourseStudent = () => {
  const { academics,bearerHeader } = useCollege();
  const [open, setOpen] = useState(false);
  // const {students,getAllStudents,bearerHeader,role}=useCollege()
  const [currentUser,setCurrentUser]=useState({})
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const registerCourse = async (item) => {
      try {
        await api.post(`/college/make/payment/${item.id}/student`,{amount:item.price, paymentMethod:"Offline"},bearerHeader)
toast.success("Payment Successful")     
      } catch (error) {
        
      }
    }
  return (
    <div>
   
      <div className="container mx-auto p-6 font-mono">
        <ul>
        {academics?.map((item,index)=> {
              const  {name,
                price,
                description,
                instructor,
                startDate,
                endDate,
                category,
                duration,}=item;
                return(  <li className="border rounded-lg hover:bg-gray-100 p-3 border-gray-200 m-3">
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-gray-600">{price}₹</p>
                <p className="text-gray-600">{duration} months, from {startDate} to {endDate}</p>
                <p className="text-gray-600">{category}</p>
              </div>
              <div className="flex-1 items-center">
                <p>
                {description}
                </p>
              </div>
              <div className="flex items-center">
                <button onClick={()=>{
registerCourse(item)
                  // setCurrentUser(item)
                  // onOpenModal()
                }} className="bg-indigo-500 hover:bg-indigo-700 m-2 text-white font-bold py-2 px-4 rounded">
                  Pay
                </button>
                {/* <button className="bg-red-500 hover:bg-red-700 m-2 text-white font-bold py-2 px-4 rounded">
                            <FaTrash />
                        </button> */}
              </div>
            </div>
          </li>)})}
          {/* <li className="border rounded-lg hover:bg-gray-100 p-3 border-gray-200 m-3">
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold">Javascript Bootcamp</h2>
                <p className="text-gray-600">12000₹</p>
                <p className="text-gray-600">6 months</p>
                <p className="text-gray-600">Category</p>
              </div>
              <div className="flex-1 items-center">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Consequatur, necessitatibus fugiat? Hic voluptates laboriosam
                  nesciunt modi nihil possimus id cumque sit molestias quis
                  corrupti, rerum voluptatibus tempore architecto, vero aut!
                </p>
              </div>
              <div className="flex items-center">
                <button className="bg-indigo-500 hover:bg-indigo-700 m-2 text-white font-bold py-2 px-4 rounded">
                  Register
                </button>
                <button className="bg-red-500 hover:bg-red-700 m-2 text-white font-bold py-2 px-4 rounded">
                            <FaTrash />
                        </button>
              </div>
            </div>
          </li> */}
        </ul>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <MakePayment currentUser={currentUser}/>
      </Modal>
    </div>
  );
};

export default ViewCourseStudent;
