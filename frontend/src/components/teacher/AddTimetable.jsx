import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCollege } from "../utils/GlobalContext";
import api from "../utils/api";

const AddTimetable = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    subject: "",
    location: "",
    date: "",
    status: "Scheduled",
    students: [],
  });
  const { students, bearerHeader, currentUser } = useCollege();
  const [students1, setStudents1] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch teacher and students (this would be based on your authentication system)
  useEffect(() => {
    // const currentTeacher = JSON.parse(localStorage.getItem('user')); // Assuming teacher data is stored in localStorage
    // setTeacher(currentTeacher);

    // Fetch students (replace this with actual API call)
    const fetchedStudents = [
      { id: 1, name: "Alice Smith" },
      { id: 2, name: "Bob Johnson" },
      { id: 3, name: "Charlie Lee" },
    ];
    setStudents1(fetchedStudents);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" || type === "radio") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "select-multiple") {
      const selectedStudents = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({
        ...formData,
        students: selectedStudents,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const validationErrors = {};

    if (!formData.dayOfWeek)
      validationErrors.dayOfWeek = "Day of the week is required";
    if (!formData.startTime)
      validationErrors.startTime = "Start time is required";
    if (!formData.endTime) validationErrors.endTime = "End time is required";
    if (!formData.subject) validationErrors.subject = "Subject is required";
    if (!formData.location) validationErrors.location = "Location is required";
    if (!formData.date) validationErrors.date = "Date is required";
    if (formData.students.length === 0)
      validationErrors.students = "Please select at least one student";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare data for API call
    const payload = {
      dayOfWeek: formData.dayOfWeek,
      startTime: formData.startTime,
      endTime: formData.endTime,
      subject: formData.subject,
      location: formData.location,
      teacher: { id: currentUser?.id },
      students: formData.students?.map((id) => ({ id })),
      date: formData.date,
      status: formData.status,
    };
    const formData2 = new FormData();
    formData2.append("dayOfWeek", formData.dayOfWeek);
    formData2.append("startTime", formData.startTime);
    formData2.append("endTime", formData.endTime);
    formData2.append("subject", formData.subject);
    formData2.append("location", formData.location);
    // formData2.append('teacher', currentUser?.id);
    formData2.append("studentId", formData.students.join(","));
    // formData2.append('date', formData.date);
    formData2.append("status", formData.status);
    try {
      const response = await api.post(
        "/college/add/timetables",
        formData2,
        bearerHeader
      );
      setMessage("Time Table Created Successfully");
      setFormData({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        subject: "",
        location: "",
        students: [],
        date: "",
        status: "",
      });
    } catch (error) {
      setMessage("Failed to add timetable");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Timetable</h2>

      {message && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Day of the Week */}
        <div>
          <label className="block text-sm font-medium">Day of the Week</label>
          <select
            name="dayOfWeek"
            value={formData.dayOfWeek}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
          {errors.dayOfWeek && (
            <p className="text-red-500 text-xs mt-1">{errors.dayOfWeek}</p>
          )}
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <input
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.startTime && (
            <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
          )}
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium">End Time</label>
          <input
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.endTime && (
            <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium">Subject</label>
          <input
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        {/* Students */}
        <div>
          <label className="block text-sm font-medium">Students</label>
          <select
            name="students"
            multiple
            value={formData.students}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
          >
            {students?.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          {errors.students && (
            <p className="text-red-500 text-xs mt-1">{errors.students}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Create Timetable
        </button>
      </form>
    </div>
  );
};

export default AddTimetable;
