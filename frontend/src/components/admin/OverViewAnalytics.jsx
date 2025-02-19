import React from "react";
import { FaBook, FaUser } from "react-icons/fa";
import { FaBookOpenReader, FaUserGraduate } from "react-icons/fa6";
import { useCollege } from "../utils/GlobalContext";

const OverViewAnalytics = () => {
  const { students, teachers, academics,allBooks,allMaterial } = useCollege();
  return (
    <div>
      <div className="flex flex-row gap-4 ">
        <div className="w-60 h-60 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 ">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center justify-center w-20 h-20  mb-4 bg-blue-500 rounded-full ">
              <FaUser className="text-white w-16 h-16" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 yuji-mai-regular">
              Total Students
            </h2>
            <p className="text-2xl font-bold text-gray-900 yuji-mai-regular">
              {students?.length}
            </p>
          </div>
        </div>
        <div className="w-60 h-60 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center justify-center w-20 h-20  mb-4 bg-blue-500 rounded-full">
              <FaUserGraduate className="text-white w-16 h-16" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 yuji-mai-regular">
              Total Teachers
            </h2>
            <p className="text-2xl font-bold text-gray-900 yuji-mai-regular">
              {teachers?.length}
            </p>
          </div>
        </div>
        <div className="w-60 h-60 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center justify-center w-20 h-20  mb-4 bg-blue-500 rounded-full">
              <FaBookOpenReader className="text-white w-16 h-16" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 yuji-mai-regular">
              Total Courses
            </h2>
            <p className="text-2xl font-bold text-gray-900 yuji-mai-regular">
              {academics?.length}
            </p>
          </div>
        </div>
        <div className="w-60 h-60 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center justify-center w-20 h-20  mb-4 bg-blue-500 rounded-full">
              <FaBook className="text-white w-16 h-16" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 yuji-mai-regular">
              Total Books
            </h2>
            <p className="text-2xl font-bold text-gray-900 yuji-mai-regular">
              {allBooks?.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewAnalytics;
