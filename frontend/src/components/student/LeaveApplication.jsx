import React, { useState } from "react";
import api from "../utils/api";
import { useCollege } from "../utils/GlobalContext";
import { toast } from "react-toastify";

const LeaveApplication = () => {
const [leaveApplication, setLeaveApplication] = useState({
  
 
     reason:"",
     subject:"",
     description:"",
     startDate:"",
     endDate:"",
    //  status:"",
})
const {bearerHeader,currentUser}=useCollege()
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLeaveApplication({ ...leaveApplication, [name]: value });
  }
  const handleSubmit =async(event) => {
    event.preventDefault();
    try {
      await api.post(`/college/apply/leave/${currentUser?.id}`, leaveApplication, bearerHeader);
      toast.success("Leave application submitted successfully");
      // Reset the form fields after submission
      setLeaveApplication({
        reason:"",
        subject:"",
        description:"",
        startDate:"",
        endDate:"",
       // status:"",
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields for leave application */}
        <div className="flex flex-col justify-center  border p-10 m-10 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Leave Application
          </h1>
          <div className="mx-10 my-2">
            <label htmlFor="subject" className="block">
              Subject
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              name="subject"
              id="subject"
              value={leaveApplication.subject}
              className="border rounded-lg w-full p-2 caret-green-500 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mx-10 my-2">
            <label htmlFor="reason" className="block">
              Reason for Applying
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              name="reason"
              id="reason"
              value={leaveApplication.reason}
              className="border rounded-lg w-full p-2 caret-green-500 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mx-10 my-2">
            <label htmlFor="description" className="block">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleInputChange}
              value={leaveApplication.description}
              id="description"
              className="border rounded-lg w-full p-2 caret-green-500 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mx-10 my-2">
            <label htmlFor="fromDate" className="block">
              {" "}
              From Date
            </label>
            <input
              type="date"
              name="startDate"
              onChange={handleInputChange}
              value={leaveApplication.startDate}

              id="fromDate"
              className="border rounded-lg w-full p-2 caret-green-500 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mx-10 my-2">
            <label htmlFor="endDate" className="block">
              {" "}
              To Date
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handleInputChange}
              value={leaveApplication.endDate}
              id="endDate"
              className="border rounded-lg w-full p-2 caret-green-500 focus:outline-none focus:border-green-500"
            />
          </div>{" "}
          <div className="mx-10 my-2 flex justify-center">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 w-1/2">Submit</button>
        </div></div>
      </form>
    </div>
  );
};

export default LeaveApplication;
