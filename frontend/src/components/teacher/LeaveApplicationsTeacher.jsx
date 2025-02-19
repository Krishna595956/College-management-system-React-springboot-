import React from "react";
import { useCollege } from "../utils/GlobalContext";
import { CiCircleCheck } from "react-icons/ci";
import { FaCheck, FaXbox } from "react-icons/fa";
import { FaCross, FaX, FaXing } from "react-icons/fa6";
import api from "../utils/api";
const LeaveApplicationsTeacher = () => {
  const { allLeaves,bearerHeader,getAllLeaves } = useCollege();
  const sendStatus=async(id,status)=>{
try {
  await api.put(`/college/update/leave/status/${id}?status=${status}`,{id,status},bearerHeader)
  getAllLeaves()
} catch (error) {
  console.error(error);
}
  }
  return (
    <div>
      <div className="container">
       
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Subject
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reason
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
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
                Duration
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allLeaves?.map((items, index) => {
              const {
                reason,
                status,
                description,
                startDate,
                endDate,
                subject,
                id,
              } = items;

              return (
                <tr key={id}>
                  <td className="px-6 py-4 ">
                    <div className="text-sm text-gray-900">{index+1}.</div>
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="text-sm text-gray-900">{subject}</div>
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="text-sm text-gray-900">{reason}</div>
                    {/* <div className="text-sm text-gray-500">Optimization</div> */}
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4  text-sm text-gray-500">
                    {description}
                  </td>
                  <td className="px-6 py-4  text-sm text-gray-500">
                    from {startDate} to {endDate}
                  </td>
                  <td className="px-6 py-4  text-sm text-gray-500 flex gap-2">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold  rounded-full" title="accept" onClick={() => sendStatus(id, "Accepted")}><FaCheck className="w-8 h-8"/></button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded-full" title="reject" onClick={() => sendStatus(id, "Rejected")}><FaX  className="w-8 h-8"/></button>
                  </td>
                </tr>
              );
            })}

            {/* More rows... <tr>
      <td className="px-6 py-4 ">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src="https://i.pravatar.cc/150?img=1"
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
            <div className="text-sm text-gray-500">jane.cooper@example.com</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          Regional Paradigm Technician
        </div>
        <div className="text-sm text-gray-500">Optimization</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        Admin
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        jane.cooper@example.com
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
        <a href="#" className="ml-2 text-red-600 hover:text-red-900">
          Delete
        </a>
      </td>
    </tr>
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src="https://i.pravatar.cc/150?img=1"
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
            <div className="text-sm text-gray-500">jane.cooper@example.com</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          Regional Paradigm Technician
        </div>
        <div className="text-sm text-gray-500">Optimization</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        Admin
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        jane.cooper@example.com
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
        <a href="#" className="ml-2 text-red-600 hover:text-red-900">
          Delete
        </a>
      </td>
    </tr>
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src="https://i.pravatar.cc/150?img=1"
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
            <div className="text-sm text-gray-500">jane.cooper@example.com</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          Regional Paradigm Technician
        </div>
        <div className="text-sm text-gray-500">Optimization</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        Admin
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        jane.cooper@example.com
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
        <a href="#" className="ml-2 text-red-600 hover:text-red-900">
          Delete
        </a>
      </td>
    </tr>*/}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default LeaveApplicationsTeacher;
