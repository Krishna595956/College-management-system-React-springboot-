import React, { useState } from "react";
import { FaRegEdit, FaTrash, FaUserEdit, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Modal } from 'react-responsive-modal';
// import UpdateStudent from "./UpdateStudent";
const ViewBooksStudent = () => {
  const [students, setStudents] = useState([
    {
      id: "",
      name: "",
      email: "",
      mobileNumber: "",
      address: "",
      image: "",
    },
  ]);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <div>
      <div className="container">
        <div className="text-center text-2xl font-bold">All Books</div>
        <div className="flex justify-end items-center mb-5">
        
        </div>
        <div className="flex flex-wrap gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <motion.div
              drag
              key={index}
            //   dragElastic={0.2}
            //   dragConstraints={{ left: 0, top: 300, right: 300, bottom: 300 }}
            >
              {" "}
              <div className="bg-gray-100 min-w-72 min-h-72 p-3 rounded-lg hover:bg-gray-200">
                <div className=" flex justify-center items-center mb-5">
                  <img
                    src="https://placeholder.pics/svg/150x150/6c757d/343a40?text=No+Image"
                    className="w-full h-full"
                    alt=""
                  />
                </div>
                <div className=" flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span>Book Name</span>
                    <span>Fluid Mechanics</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Author</span>
                    <span>R.K Bansal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ISBN</span>

                    <span>99-885454-451220</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Description</span>
                    <span>Book Description</span>
                  </div>

                  {/* <div className="flex justify-between items-center">
                    <span>
                      <button onClick={onOpenModal}>
                        <FaRegEdit className="text-green-500 h-8 w-8" />
                      </button>
                    </span>
                    <button className="">
                      <FaTrash className="text-red-500 h-6 w-6" />
                    </button>
                  </div> */}
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
      
      {/* <Modal open={open} onClose={onCloseModal} center>
        <UpdateStudent/>
      </Modal> */}
    </div>
  );
};

export default ViewBooksStudent;
