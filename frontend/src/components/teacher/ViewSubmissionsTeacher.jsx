import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { backend_url } from "../utils/api";
import { useCollege } from "../utils/GlobalContext";
import { FaFileDownload } from "react-icons/fa";

const ViewSubmissionsTeacher = () => {
  const { assignmentId } = useParams();
  const { bearerHeader } = useCollege();
  const [submissions, setSubmissions] = useState([]);

  const getSubmissionsById = async () => {
    try {
      const response = await api.get(
        `college/get/submissions/${assignmentId}`,
        bearerHeader
      );
      if (response.data.success) {
        setSubmissions(response.data.submissions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSubmissionsById();
  }, [assignmentId]);
const updateGrade = async (submissionId, grade) => {
    try {
      const response = await api.put(
        `college/update/evaluate/assignmentSubmission/${submissionId}?grade=${grade}`,
        { grade },
        bearerHeader
      );
      if (response.data.success) {
        getSubmissionsById();
      }
    } catch (error) {
      console.error(error);
    }
}
  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
      <h1>Submissions for Assignment ID: {assignmentId}</h1>
      {submissions.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto ">
          <thead className="bg-gray-50  ">
            <tr>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Submission ID
              </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Student Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Submission Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PDF File
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Grade
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Evaluated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions?.map((submission) => (
              <tr key={submission.id} className={`${submission.evaluated ? "bg-green-100 line-through" : ""}`}>
                {/* <td className="px-6 py-4  text-sm text-gray-500">
                  {submission.id}
                </td> */}
                <td className="px-6 py-4  text-sm text-gray-500">
                  {submission.student.name}
                </td>
                <td className="px-6 py-4  text-sm text-gray-500">
                  {submission.submissionDate}
                </td>
                <td className="px-6 py-4  text-sm text-gray-500">
                  <a
                    href={`${backend_url}/documents/${submission.pdfFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFileDownload className="h-10 w-10 text-green-500" />
                  </a>
                </td>
                <td className="px-6 py-4  text-sm text-gray-500">
                 <select name="grade" id="grade" disabled={submission.evaluated} value={submission.grade} onChange={(e)=>updateGrade(submission.id, e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                
                    <option value="S">S</option>
                    <option value="O">O</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">Fail</option>

                 </select>
                </td>
                <td className="px-6 py-4  text-sm text-gray-500">
                  {submission.evaluated !== null ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
};

export default ViewSubmissionsTeacher;
