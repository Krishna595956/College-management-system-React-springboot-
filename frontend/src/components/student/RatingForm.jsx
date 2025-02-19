import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useCollege } from "../utils/GlobalContext";
import api from "../utils/api";
import { toast } from "react-toastify";

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
const [description,setDescription]=useState("")
const [teacher,setTeacher]=useState("")
const {teachers,bearerHeader,currentUser}=useCollege();
const handleSubmit=async(e)=>{
  e.preventDefault();
 try {
  const res = await api.post(`/college/add/feedbacks/${teacher}`, {
    rating:rating,
    description:description,
    teacherId:teacher,
    studentId:currentUser.id
  }, bearerHeader);
  toast.info('Thank you for your valueable feedback');
  setDescription("")
  setRating(0)
  setTeacher("")
 } catch (error) {
  console.log(error);
 }
}
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Rate Your Teacher</h1>

        <form onSubmit={handleSubmit}>
          {/* Teacher Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="teacher">
              Teacher
            </label>
            <select
            onChange={(e)=>setTeacher(e.target.value)}
            value={teacher}
              className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="teacher"
            >
              <option value="">--Select--</option>
              {teachers?.map((teacher)=><option key={teacher.id} value={teacher.id}>{teacher.name}</option>)  
              }
            </select>
          </div>

          {/* Rating Stars */}
          <div className="mb-6 flex justify-center items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
              >
                <FaStar
                  className={`h-10 w-10 transition-colors duration-200 ease-in-out transform ${
                    rating >= star || hover >= star
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* <p className="text-center text-xl font-semibold text-gray-700 mb-4">
            Rating: {rating}
          </p> */}

          {/* Description Textarea */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              onChange={(e)=> setDescription(e.target.value)}
              className="w-full p-4 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
              placeholder="Write your experience"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-md w-full hover:bg-indigo-600 transition-colors duration-300"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingForm;
