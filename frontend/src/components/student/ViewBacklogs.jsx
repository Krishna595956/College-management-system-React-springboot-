import React, { useEffect } from 'react'
import { useCollege } from '../utils/GlobalContext'
import api from '../utils/api';

const ViewBacklogs = () => {
    const {bearerHeader}=useCollege();
    const [backlogs,setBacklogs]=React.useState()
    const getBackLogs=async()=>{
        try {
            const res= await api.get(`college/student/get/his/backlogs`,bearerHeader);
            setBacklogs(res.data.backlogs)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getBackLogs();
    },[])
  return (
    <div>
        <h1>View Backlogs</h1>
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto ">
    <thead className="bg-gray-50  ">
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
                SUBJECT
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                GRADE
              </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
   {backlogs?.map ((item,index)=><tr key={item.id}>
   <td className="px-6 py-4  text-sm text-gray-500">
{index+1}
    </td>
    <td className="px-6 py-4  text-sm text-gray-500">
{item.subjectName}
    </td>
    <td className="px-6 py-4  text-sm text-gray-500">
{item.grade}
    </td>
    </tr>)}

    </tbody>

    </table>
    </div>

    </div>
  )
}

export default ViewBacklogs