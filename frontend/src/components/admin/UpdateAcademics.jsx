import React from "react";
import { useCollege } from "../utils/GlobalContext";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateAcademics = ({data}) => {
  const [formsData, setFormsData] = React.useState({
    name:data?.name,
    description:data?.description,
    duration:data?.duration,
    category:data?.category,
     startDate:data?.startDate,
   endDate:data?.endDate,
     price:data?.price,
   instructor:data?.instructor,
    // status:""
  });

  const [errors, setErrors] = React.useState({
    name: "",
    price: "",
    description: "",
    instructor: "",
    startDate: "",
    endDate: "",
    category: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormsData({ ...formsData, [name]: value });
  }; 
const {teachers,bearerHeader}=useCollege()
  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!formsData.name) newErrors.name = "Course Name is required";

    // Email Validation

    if (!formsData.description) {
     
      newErrors.description = "Description is required";
    } else if (formsData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formsData.instructor) newErrors.instructor = "Instructor is required";

    if (!formsData.startDate) newErrors.startDate = "Start Date is required";

    if (!formsData.endDate) newErrors.endDate = "End Date is required";

    if (!formsData.category) newErrors.category = "Category is required";
    if (!formsData.duration) newErrors.duration = "Duration is required";

    if (!formsData.price) newErrors.price = "Price is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, form is valid
  };
const navigateTo=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // If form is invalid, do not submit

    const formData = {
      name: formsData.name,
      price: formsData.price,
      description: formsData.description,
      // instructor: {
      //   id: formsData.instructor // assuming formsData.instructor holds the selected instructor's ID
      // },
      startDate: formsData.startDate,
      endDate: formsData.endDate,
      category: formsData.category,
      duration: formsData.duration
    };
    try {
     await api.post(`/college/academy/add/${formsData.instructor}`,formsData,bearerHeader)
    toast.success("Academic Course Added Successfully");
    navigateTo('/admin/academic')
    } catch (error) {
      console.log(error);
    }

   
  };

  return (
    <div>
      <div className=" w-full">
        <h1 className="text-center font-bold text-3xl mt-5">
          Update Academic Course
        </h1>
        <div className="min-h-screen  p-4 animating">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col border rounded-lg border-gray-300 p-6 shadow-lg shadow-gray-300">
              <div className="">
                <label htmlFor="name" className="block">
                  Course Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="e.g B.Tech CSE III sem "
                  name="name"
                  value={formsData.name}
                  onChange={handleChange}
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
              <div className="block">
                <label htmlFor="duration" className="block">
                  Duration in Months
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  id="duration"
                  value={formsData.duration}
                  placeholder="e.g 30"
                  name="duration"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.duration ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.duration && (
                  <span className="text-red-500 text-sm">
                    {errors.duration}
                  </span>
                )}
              </div>
              <div className="block">
                <label htmlFor="price" className="block">
                  Fee Amount
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  id="price"
                  value={formsData.price}
                  placeholder="e.g 3000000"
                  name="price"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">
                    {errors.price}
                  </span>
                )}
              </div>
              <div className="block">
                <label htmlFor="category" className="block">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  value={formsData.category}
                  placeholder="e.g. Academic subject "
                  onChange={handleChange}
                  name="category"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.category && (
                  <span className="text-red-500 text-sm">
                    {errors.category}
                  </span>
                )}
              </div>
              <div className="block">
                <label htmlFor="instructor" className="block">
                  Instructor
                </label>
                <select
                  type="text"
                  onChange={handleChange}
                  id="instructor"
                  value={formsData.instructor}
                  placeholder=""
                  name="instructor"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                >
                  <option value="">--select instructor--</option>
                  {teachers?.map((teacher)=><option value={teacher.id} key={teacher.id}>{teacher.name}</option>)}
                </select>
                {errors.instructor && (
                  <span className="text-red-500 text-sm">
                    {errors.instructor}
                  </span>
                )}
              </div>
              <div className="block">
                <label htmlFor="startDate" className="block">
                  Start Date
                </label>
                <input
                  type="date"
                  onChange={handleChange}
                  id="instructor"
                  value={formsData.startDate}
                  placeholder=""
                  name="startDate"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.startDate ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.startDate && (
                  <span className="text-red-500 text-sm">
                    {errors.startDate}
                  </span>
                )}
              </div>
              <div className="block">
                <label htmlFor="endDate" className="block">
                  End Date
                </label>
                <input
                  type="date"
                  onChange={handleChange}
                  id="endDate"
                  value={formsData.endDate}
                  placeholder=""
                  name="endDate"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.startDate ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.endDate && (
                  <span className="text-red-500 text-sm">{errors.endDate}</span>
                )}
              </div>
              {/* <div className="block">
                <label htmlFor="role" className="block">Role</label>
                <select
                  onChange={handleChange}
                  id="role"
                  value={formsData.role}
                  name="role"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                >
                  <option value="">--select role--</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
                {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}
              </div>
              <div className="block">
                <label htmlFor="image" className="block">Photo</label>
                <input
                  type="file"
                  onChange={handleChange}
                  id="image"
                  name="image"
                  accept=".png, .jpg, .jpeg"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${errors.image ? 'border-red-500' : 'border-gray-300'} focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
              </div> */}
              <div className="block">
                <label htmlFor="description" className="block">
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  id="description"
                  value={formsData.description}
                  placeholder="e.g. course description"
                  name="description"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="p-3 rounded-lg bg-green-400 text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAcademics;

//
