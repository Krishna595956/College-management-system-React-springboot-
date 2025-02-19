import React, { useState } from "react";
import axios from "axios";
import { useCollege } from "../utils/GlobalContext";
import api from "../utils/api";
import { toast } from "react-toastify";

const AttendanceTeacher = () => {
  const students1 = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mary Johnson" },
    { id: 4, name: "James Brown" },
  ];
const {students,bearerHeader}=useCollege()
  const [attendance, setAttendance] = useState(
    students?.reduce((acc, student) => {
      acc[student.id] = "absent"; // Initialize all students as absent
      return acc;
    }, {})
  );

  const handleAttendanceChange = (id, status) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const submitAttendance = async (studentId, attendance) => {
    // Prepare the data to send to the backend
    const attendanceData = students?.map((student) => ({
      studentId: student.id,
      status: attendance[student.id],
    }));

    try {
      // Make a POST request to the backend
      const response = await api.post(`/college/mark/${studentId}?present=${attendance}`, {present:attendanceData},bearerHeader);
toast.success("Attendance submitted successfully");
      // Handle the response (e.g., show a success message)
      console.log("Attendance submitted successfully:", response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error submitting attendance:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Student Attendance</h1>
      <div className="bg-white p-4 rounded shadow-lg">
        <ul className="space-y-4">
          {students?.map((student) => (
            <li key={student.id} className="flex justify-between items-center">
              <span className="text-lg">{student.name}</span>
              <div className="space-x-4">
                <button
               onClick={() => submitAttendance(student.id, true)}
                  // className={`px-4 py-2 rounded ${
                  //   attendance[student.id] === "present"
                  //     ? "bg-green-500 text-white"
                  //     : "bg-gray-200 text-gray-700"
                  // } hover:bg-green-400`}
                  className={`bg-green-500 px-4 py-2 rounded text-white`}
                >
                  Present
                </button>
                <button
                                 onClick={() => submitAttendance(student.id, false)}
                                 className={`bg-red-500 px-4 py-2 rounded text-white`}
                  // className={`px-4 py-2 rounded ${
                  //   attendance[student.id] === "absent"
                  //     ? "bg-red-500 text-white"
                  //     : "bg-gray-200 text-gray-700"
                  // } hover:bg-red-400`}
                >
                  Absent
                </button>
              </div>
            </li>
          ))}
        </ul>
        {/* <button
          onClick={submitAttendance}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
        >
          Submit Attendance
        </button> */}
      </div>
    </div>
  );
};

export default AttendanceTeacher;
