import React from "react";
import { Fa1 } from "react-icons/fa6";
import { useCollege } from "../utils/GlobalContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const UpdateStudent = ({ currentUser }) => {
  const [formsData, setFormsData] = React.useState({
    name: currentUser?.name,
    password: "",
    email: currentUser?.email,
    mobileNumber: currentUser?.mobileNumber,
    address: currentUser?.address,
    role: currentUser?.role,
    image: "",
    department: currentUser?.department,
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormsData({ ...formsData, [name]: value });
    if (files) {
      setFormsData({ ...formsData, [name]: files[0] });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!formsData.name) newErrors.name = "Name is required";

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formsData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formsData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Mobile Number Validation
    if (!formsData.mobileNumber) {
      newErrors.mobileNumber = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(formsData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    }

    // Password Validation
    if (!formsData.password) {
      newErrors.password = "Password is required";
    } else if (formsData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Role Validation
    if (!formsData.role) {
      newErrors.role = "Please select a role";
    }

    // Image Validation (optional check for image file type)
    if (formsData.image && !/\.(jpg|jpeg|png)$/i.test(formsData.image.name)) {
      newErrors.image =
        "Please select a valid image file (jpg, jpeg, png, gif)";
    }

    // Address Validation
    if (!formsData.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, form is valid
  };
  const { bearerHeader, getAllStudents } = useCollege();
  const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // If form is invalid, do not submit

    const formData = new FormData();
    formData.append("fullName", formsData.name);
    formData.append("email", formsData.email);
    formData.append("password", formsData.password);
    formData.append("mobileNumber", formsData.mobileNumber);
    formData.append("address", formsData.address);
    formData.append("role", formsData.role);
    formData.append("image", formsData.image);
    formData.append("department", formsData.department);

    try {
      api
        .put(`/college/update/${currentUser?.id}`, formData, bearerHeader)
        .then((res) => {
          toast.success(res.data.msg);
          getAllStudents();
        })
        .catch((err) => toast.error(err.response.data.msg));
      setFormsData({
        name: "",
        password: "",
        email: "",
        mobileNumber: "",
        address: "",
        role: "",
        image: "",
        department: "",
      });
      setErrors({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className=" w-full">
        <h1 className="text-center font-bold text-3xl mt-5">Update </h1>
        <div className="min-h-screen w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col border rounded-lg border-gray-300 p-6 shadow-lg shadow-gray-300">
              <div className="">
                <label htmlFor="name" className="block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name e.g John Doe"
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
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  type="email"
                  onChange={handleChange}
                  id="email"
                  value={formsData.email}
                  placeholder="Enter email e.g user@gmail.com"
                  name="email"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <div className="block">
                <label htmlFor="mobileNumber" className="block">
                  Mobile Number
                </label>
                <input
                  type="number"
                  id="mobileNumber"
                  value={formsData.mobileNumber}
                  placeholder="Mobile Number e.g 9876543210"
                  onChange={handleChange}
                  name="mobileNumber"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.mobileNumber ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.mobileNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.mobileNumber}
                  </span>
                )}
              </div>
              <div className="block">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  id="password"
                  value={formsData.password}
                  placeholder="Minimum 6 characters"
                  name="password"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="block">
                <label htmlFor="role" className="block">
                  Role
                </label>
                <select
                  onChange={handleChange}
                  id="role"
                  value={formsData.role}
                  name="role"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                >
                  <option value="">--select role--</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
                {errors.role && (
                  <span className="text-red-500 text-sm">{errors.role}</span>
                )}
              </div>
              <div className="">
                <label htmlFor="department" className="block">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  placeholder="e.g CSE MECH"
                  name="department"
                  value={formsData.department}
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
                <label htmlFor="image" className="block">
                  Photo
                </label>
                <input
                  type="file"
                  onChange={handleChange}
                  id="image"
                  name="image"
                  accept=".png, .jpg, .jpeg"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.image && (
                  <span className="text-red-500 text-sm">{errors.image}</span>
                )}
              </div>
              <div className="block">
                <label htmlFor="address" className="block">
                  Address
                </label>
                <textarea
                  onChange={handleChange}
                  id="address"
                  value={formsData.address}
                  placeholder="e.g 123, ABC Street, XYZ City"
                  name="address"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">{errors.address}</span>
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

export default UpdateStudent;
