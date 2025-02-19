import React, { useState } from "react";
import { FaRegEdit, FaTrash, FaUserEdit, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Modal } from "react-responsive-modal";
import UpdateStudent from "./UpdateStudent";
import { useCollege } from "../utils/GlobalContext";
import api, { backend_url } from "../utils/api";
import UpdateBooks from "./UpdateBooks";
const ViewBooksAdmin = () => {
  const [open, setOpen] = useState(false);
  const [currentBook,setCurrentBook] = useState(null)
  const { getAllBooks, allBooks,bearerHeader,role } = useCollege();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const deleteBook = async(id) => {
    try {
   await   api.delete(`/college/delete/book/${id}`,bearerHeader);
      getAllBooks();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="container">
        <div className="text-center text-2xl font-bold">All Books</div>
       { role==="Admin"&&<div className="flex justify-end items-center mb-5">
          <Link
            to={"/admin/add-books"}
            className=" text-xl  bg-blue-500 text-white rounded-lg p-3"
          >
            <FaUserPlus className=" h-8 w-8  " />
          </Link>
        </div>}
        <div className="flex flex-wrap gap-5">
          {allBooks?.map((item, index) => {
            const { bookName, description, isbnNumber, category, book } = item;
            return (
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
                      src={`${backend_url}/books/${book}`}
                      className="h-64 w-64 rounded-lg"
                      alt=""
                    />
                  </div>
                  <div className=" flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span>Book Name</span>
                      <span>{bookName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Category</span>
                      <span>{category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ISBN</span>

                      <span>{isbnNumber}</span>
                    </div>
                    <div className="flex justify-between items-center text-wrap w-72">
                      <span>Description</span>
                      <span className="text-wrap">{description}</span>
                    </div>

                    <div className="flex justify-end ">
                      {/* <span>
                        <button onClick={()=> {setCurrentBook(item)
                          onOpenModal()}}>
                          <FaRegEdit className="text-green-500 h-8 w-8" />
                        </button>
                      </span> */}
                     { role==="Admin"&&<button className="" onClick={() => deleteBook(item.id)}>
                        <FaTrash className="text-red-500 h-6 w-6" />
                      </button>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Modal open={open} onClose={onCloseModal} center>
        <UpdateBooks currentBook={currentBook} />
      </Modal>
    </div>
  );
};

export default ViewBooksAdmin;
