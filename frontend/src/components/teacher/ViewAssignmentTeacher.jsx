import React from "react";
import { FaFileDownload, FaPlusCircle, FaRegPlusSquare } from "react-icons/fa";
import { FaArrowDownLong, FaPlugCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCollege } from "../utils/GlobalContext";
import { backend_url } from "../utils/api";

const ViewAssignmentTeacher = () => {
  const { assignments,role } = useCollege();
  return (
    <div>
      <div className="container">
       { <div className="flex justify-end">
          <Link to={"/teacher/add-assignment"}>
            <FaRegPlusSquare className=" h-12 w-12 text-indigo-700" />
          </Link>
        </div>}
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Download
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Due Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments?.map((item) => {
              const {
                description,
                assignmentType,
                dueDate,
                department,
                pdfFile,
                title,
              } = item;
              return (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{title}</div>
                  </td>
                  <td className="px-6 py-4 ">
                    <a
                      href={`${backend_url}/documents/${pdfFile}`}
                      target="_blank"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaFileDownload className=" h-8 w-8 " />
                    </a>
                  </td>
                  <td className="px-6 py-4  text-sm text-gray-500">
                    {description}
                    {/* concat ... after one line then show more */}
                  </td>{" "}
                  {/* <td className="px-6 py-4 ">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td> */}
                  <td className="px-6 py-4  text-sm text-gray-500">20-01-01</td>
                  <td className="px-6 py-4   text-sm font-medium">
                    <Link
                      to={`/teacher/submissions/${item.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Submissions
                    </Link>
                    {/* <a href="#" className="ml-2 text-red-600 hover:text-red-900">
                  Reject
                </a> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAssignmentTeacher;
