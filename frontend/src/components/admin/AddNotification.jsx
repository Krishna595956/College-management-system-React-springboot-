import React from "react";
import { FaBell } from "react-icons/fa";
import { useCollege } from "../utils/GlobalContext";
import api from "../utils/api";
import { toast } from "react-toastify";

const AddNotification = () => {
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const {teachers,bearerHeader}=useCollege()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // handle form submission
    try {
      await api.post(`/college/send/all?title=${title}&message=${message}`, {
        title:title,
        message:message
      },bearerHeader
      )
      toast.info("Notification sent to everyone");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="container bg-gray-100 min-h-screen">
        <h1 className="text-center text-3xl font-semibold p-5 captalize">
          Add Notification
        </h1>
        <div className="flex justify-center items-center p-3">
          <FaBell className="w-12 h-12 text-green-500 bg-gray-200 p-2 rounded-full" />
        </div>

        <div className=" flex flex-col justify-center items-center p-3 mx-auto w-1/2 border rounded-lg">
          <form className="w-full" onSubmit={handleSubmit}>
         
            <div className="w-full">
              <label htmlFor="title" className="block">
                Title
              </label>
              <div className="flex">
                <span className="text-red-500 text-3xl">*</span>{" "}
                <input
                  type="text"
                  className="w-full border border-green-300 p-2 rounded-lg focus:outline-none caret-green-500  "
                  id="title"
                  onChange={(e)=>setTitle(e.target.value)}
                  placeholder="Enter Title"
                />
              </div>{" "}
            </div>
            <div className="w-full">
              <label htmlFor="description" className="block">
                Description
              </label>
              <div className="flex">
                <span className="text-red-500 text-3xl">*</span>{" "}
                <textarea
                  type="text"
                  onChange={(e)=>setMessage(e.target.value)}
                  className="capitalize w-full border border-green-300 p-2 rounded-lg focus:outline-none caret-green-500  "
                  id="description"
                  placeholder="Enter Description"
                />
              </div>{" "}
            </div>
            <div className="flex justify-center items-center mt-5">
            <button type="submit" className="bg-green-500 w-full text-white p-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out">
              Submit
            </button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotification;
