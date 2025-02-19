import React from "react";
import { FaFileDownload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { useCollege } from "../utils/GlobalContext";
import { backend_url } from "../utils/api";

const ViewMaterial = () => {
  const {allMaterial}=useCollege();
  return (
    <div>
      <div className="">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  {/* <thead className="bg-gray-200 border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Course
                      </th>
                      <th

                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Material        </th>
                      <th
                        scope="col  "
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Download
                      </th>
                    </tr>
                  </thead> */}
                  <tbody>
                    {allMaterial?.map((item,index)=>{
                      const { name,
                      file,
                      description}=item;
                      return(<tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {index+1}
                      </td>
                      <td className="text-lg text-indio-900 font-light px-6 py-4">
                        {name}
                      </td>
                      <td className="text-lg text-indio-900 font-light px-6 py-4">
                       {description}
                      </td>
                      <td className="text-lg text-indio-900 font-light px-6 py-4">
                        <a
                          href={`${backend_url}/documents/${file}`}
                          target="_blank"
                        >
                          <FaFileDownload className="h-10 w-10 text-indigo-700" />
                        </a>
                      </td>
                    </tr>)})}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMaterial;
