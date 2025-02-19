import React from 'react';
import { useCollege } from '../utils/GlobalContext';
import { Link } from 'react-router-dom';
import { FaRegPlusSquare } from 'react-icons/fa';

const ViewTimetableTeacher = () => {
    const {timetable,role}=useCollege();
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-cente"> Timetable</h1>
           {role==='Teacher'&& <h2> <div className="flex justify-end">
          <Link to={"/teacher/add-time-table"}>
            <FaRegPlusSquare className=" h-12 w-12 text-indigo-700" />
          </Link>
        </div></h2>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Day</th>
                            <th className="py-3 px-6 text-left">Start Time</th>
                            <th className="py-3 px-6 text-left">End Time</th>
                            <th className="py-3 px-6 text-left">Date</th>
                            <th className="py-3 px-6 text-left">Subject</th>
                            <th className="py-3 px-6 text-left">Location</th>
                            {/* <th className="py-3 px-6 text-left">Teacher</th> */}
                            <th className="py-3 px-6 text-left">Students</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {timetable?.map((timetable) => (
                            <tr key={timetable.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{timetable.id}</td>
                                <td className="py-3 px-6">{timetable.dayOfWeek}</td>
                                <td className="py-3 px-6">{timetable.startTime}</td>
                                <td className="py-3 px-6">{timetable.date}</td>
                                <td className="py-3 px-6">{timetable.endTime}</td>
                                <td className="py-3 px-6">{timetable.subject}</td>
                                <td className="py-3 px-6">{timetable.location}</td>
                                {/* <td className="py-3 px-6">{timetable.teacher.name}</td> */}
                                <td className="py-3 px-6">
                                    {timetable.students.map(student => (
                                        <div key={student.id}>{student.name}</div>
                                    ))}
                                </td>
                                <td className="py-3 px-6"><span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{timetable.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewTimetableTeacher;