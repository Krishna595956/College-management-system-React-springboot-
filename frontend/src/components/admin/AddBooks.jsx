import React from "react";
import { Fa1 } from "react-icons/fa6";
import api from "../utils/api";
import { useCollege } from "../utils/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const [formsData, setFormsData] = React.useState({
    bookName: "",
    description: "",
    isbnNumber: "",
    category: "",
    book: "",
  });

  const [errors, setErrors] = React.useState({});
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormsData({ ...formsData, [name]: value });
    if (files) {
      setFormsData({ ...formsData, [name]: files[0] });
    }
  };
  const navigateTo=useNavigate();
const {bearerHeader,getAllBooks}=useCollege();
  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!formsData.bookName) newErrors.bookName = "Book Name is required";
if (!formsData.description) newErrors.description = "Description is required";
if (!formsData.isbnNumber) newErrors.isbnNumber = "ISBN Number is required";
if (!formsData.category) newErrors.category = "Category is required";
if (!formsData.book) newErrors.book = "Book is required";

    if (Object.keys(newErrors).length === 0) {
      setErrors(newErrors);
      return true;  // Form is valid
    }

   
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // If no errors, form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;  // If form is invalid, do not submit

    const formData = new FormData();
    formData.append("bookName", formsData.bookName);
    formData.append("description", formsData.description);
    formData.append("isbnNumber", formsData.isbnNumber);
    formData.append("category", formsData.category);
    formData.append("book", formsData.book);

    try {
   await  api.post("/college/library/add/books", formData,bearerHeader );
        toast.success("Book Added Successfully");
        setFormsData({
          bookName: "",
          description: "",
          isbnNumber: "",
          category: "",
          book: "",
     
        });
        getAllBooks()
        navigateTo("/admin/library");
    }
  
   catch (error) {
      console.error("Error:", error);
   }
  };

  return (
    <div>
      <div className=" w-full">
        <h1 className="text-center font-bold text-3xl mt-5">Add Books</h1>
        <div className="min-h-screen md:w-3/4 lg:w-1/2 sm:w-full xl:w-1/2 mx-auto p-4 animating">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col border rounded-lg border-gray-300 p-6 shadow-lg shadow-gray-300">
              <div className="">
                <label htmlFor="name" className="block">Book Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="e.g. Fluid Mechanics, Engineering Mechanics"
                  name="bookName"
                  value={formsData.bookName}
                  onChange={handleChange}
                  className={`w-full border p-2 rounded-lg focus:outline-none ${errors.bookName ? 'border-red-500' : 'border-gray-300'} focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.bookName && <span className="text-red-500 text-sm">{errors.bookName}</span>}
              </div>
             
              <div className="block">
                <label htmlFor="isbn" className="block">ISBN Number</label>
                <input
                  type="text"
                  id="isbn"
               value={formsData.isbnNumber}
                  placeholder="e.g. 978-0-13-601926-4"
                  onChange={handleChange}
                  name="isbnNumber"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${errors.isbnNumber ? 'border-red-500' : 'border-gray-300'} focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.isbnNumber && <span className="text-red-500 text-sm">{errors.isbnNumber}</span>}
              
              </div>
              <div className="block">
                <label htmlFor="category" className="block">Category</label>
                <input
                  type="text"
                  id="category"
               value={formsData.category}
                  placeholder="e.g. Research, Engineering"
                  onChange={handleChange}
                  name="category"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${errors.isbnNumber ? 'border-red-500' : 'border-gray-300'} focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
              
              </div>
              <div className="block">
                <label htmlFor="image" className="block">Photo</label>
                <input
                  type="file"
                  onChange={handleChange}
                  id="image"
                  name="book"
                  accept=".png, .jpg, .jpeg"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${errors.image ? 'border-red-500' : 'border-gray-300'} focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.book&& <span className="text-red-500 text-sm">{errors.book}</span>}
              </div>
              <div className="block">
                <label htmlFor="description" className="block">Description</label>
                <textarea
                  onChange={handleChange}
                  id="description"
                 value={formsData.description}
                  placeholder="e.g. This book is about fluid mechanics"
                  name="description"
                  className={`w-full border p-2 rounded-lg focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:bg-purple-100 focus:border-green-300 caret-green-400`}
                />
                {errors.description&& <span className="text-red-500 text-sm">{errors.description}</span>}
              </div>
              <button type="submit" className="p-3 rounded-lg bg-green-400 text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
