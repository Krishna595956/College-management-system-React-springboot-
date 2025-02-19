import React, { useState } from "react";
import { useCollege } from "../utils/GlobalContext";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddAssignmentsTeacher = () => {
  const [data, setData] = useState({
    description: "",
    assignmentType: "",
    dueDate: "",
    department: "",
    pdfFile: "",
    title: "",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdfFile") {
      setData({ ...data, [name]: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };
  const { teachers, bearerHeader } = useCollege();
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const formData = new FormData();
    formData.append("pdfFile", data.pdfFile);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("dueDate", data.dueDate);
    formData.append("assignmentType", data.assignmentType);
    formData.append("department", data.department);
    try {
      await api
        .post("/college/add/assignment", formData, bearerHeader)
        .then((res) => {
          console.log(res);
          toast.success("Assignment added successfully");
          navigate("/teacher/assignments")
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="flex flex-col justify-center items-center bg-gray-100 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid border rounded-md p-3 shadow-md shadow-slate-400">
              <h1 className="text-3xl font-bold mb-4">Add Assignment</h1>
              <div className="">
                <label htmlFor="title" className="text-gray-500 block">
                  Title
                </label>
                <input
                  type="text"
                  onc
                  id="title"
                  name="title"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="">
                <label htmlFor="assignmentType" className="text-gray-500 block">
                Assignment Type
                </label>
                <input
                  type="text"
                  onc
                  id="assignmentType"
                  name="assignmentType"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="">
                <label htmlFor="department" className="text-gray-500 block">
                  Department
                </label>
                <input
                  type="text"
              
                  id="department"
                  name="department"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="">
                <label htmlFor="file" className="text-gray-500 block">
                  Select File
                </label>
                <input
                  type="file"
                  id="file"
                  name="pdfFile"
                  accept=" .pdf"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="">
                <label htmlFor="dueDate" className="text-gray-500 block">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  onChange={handleChange}
                  name="dueDate"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="">
                <label htmlFor="description" className="text-gray-500 block">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2  w-full"
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="bg-purple-500 text-center w-full text-white px-4 py-2 rounded-md mt-4"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAssignmentsTeacher;
