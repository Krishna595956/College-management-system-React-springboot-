import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import AdminHomePage from "./components/admin/AdminHomePage";
import ErrorPage from "./components/utils/ErrorPage";
import StudentHomePage from "./components/student/StudentHomePage";
import TeacherHomePage from "./components/teacher/TeacherHomePage";
import AddStudent from "./components/admin/AddStudent";
import ViewStudents from "./components/admin/ViewStudents";
import OverViewAnalytics from "./components/admin/OverViewAnalytics";
import 'react-responsive-modal/styles.css';
import AddNotification from "./components/admin/AddNotification";
import AddBooks from "./components/admin/AddBooks";
import ViewBooksAdmin from "./components/admin/ViewBooksAdmin";
import AdminProfile from "./components/admin/AdminProfile";
import ViewTransactionAdmin from "./components/admin/ViewTransactionAdmin";
import AttendanceTeacher from "./components/teacher/AttendanceTeacher";
import UploadMaterial from "./components/teacher/UploadMaterial";
import LeaveApplicationsTeacher from "./components/teacher/LeaveApplicationsTeacher";
import ViewNotificationsTeacher from "./components/teacher/ViewNotificationsTeacher";
import AddAssignmentsTeacher from "./components/teacher/AddAssignmentsTeacher";
import ViewAssignmentTeacher from "./components/teacher/ViewAssignmentTeacher";
import ViewMaterial from "./components/student/ViewMaterial";
import RatingForm from "./components/student/RatingForm";
import StudentAttendanceCalendar from "./components/student/StudentAttendanceCalendar";
import MakePayment from "./components/student/MakePayment";
import AddAcademics from "./components/admin/AddAcademics";
import ViewAcademicsAdmin from "./components/admin/ViewAcademicsAdmin";
import ViewCourseStudent from "./components/student/ViewCourseStudent";
import LeaveApplication from "./components/student/LeaveApplication";
import ViewLeaveApplicationsStudent from "./components/student/ViewLeaveApplicationsStudent";
import ViewNotificationsStudent from "./components/student/ViewNotificationsStudent";
import ViewBooksStudent from "./components/student/ViewBooksStudent";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewTeachers from "./components/admin/ViewTeachers";
import ViewAcademicsTeacher from "./components/teacher/ViewAcademicsTeacher";
import ViewTransactionStudent from "./components/student/ViewTransactionStudent";
import ViewAssignmentStudent from "./components/student/ViewAssignmentStudent";
import GenerateReport from "./components/admin/GenerateReport";
import AddTimetable from "./components/teacher/AddTimetable";
import ViewTimetableTeacher from "./components/teacher/ViewTimetableTeacher";
import ViewSubmissionsTeacher from "./components/teacher/ViewSubmissionsTeacher";
import ViewBacklogs from "./components/student/ViewBacklogs";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Whether animation should happen only once (default is false)
    });
  }, []);
  
  return (
    <div className="overflow-y-auto h-screen scrollbar-custom " >
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/admin" element={<AdminHomePage />}>
            <Route path="*" element={<ErrorPage />} />
            <Route path="profile" element={<AdminProfile />} />generate
            <Route path="generate" element={<GenerateReport />} />
            <Route path="add-student" element={<AddStudent />} />
            <Route path="academic" element={<ViewAcademicsAdmin />} />
            <Route path="add-books" element={<AddBooks />} />
            <Route path="add-academics" element={<AddAcademics />} />
            <Route path="library" element={<ViewBooksAdmin />} />
            <Route path="fees" element={<ViewTransactionAdmin />} />
            <Route path="student" element={<ViewStudents />} />
            <Route path="notifications" element={<AddNotification />} />
            <Route path="faculty" element={<ViewTeachers />} />
            <Route path="overview" element={<OverViewAnalytics />} />
          </Route>



          <Route path="/student" element={<StudentHomePage />}>
            <Route path="profile" element={<AdminProfile />} />
            <Route path="course" element={<ViewCourseStudent />} />
            <Route path="library" element={<ViewBooksAdmin />} />
            <Route path="notifications" element={<ViewNotificationsStudent />} />
            <Route path="material" element={<ViewMaterial />} />
            <Route path="assignment" element={<ViewAssignmentStudent />} />
            <Route path="attendence" element={<StudentAttendanceCalendar />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="leave-applications" element={<ViewLeaveApplicationsStudent />} />
            <Route path="application" element={<LeaveApplication />} />
            <Route path="fees" element={<ViewTransactionStudent />} />
            <Route path="timetable" element={<ViewTimetableTeacher />} />

            <Route path="make-payment" element={<MakePayment />} />
            <Route path="backlogs" element={<ViewBacklogs />} />
            <Route path="feedback" element={<RatingForm />} />
          </Route>




          <Route path="/teacher" element={<TeacherHomePage />}>
            <Route path="*" element={<ErrorPage />} />
            <Route path="add-assignment" element={<AddAssignmentsTeacher />} />
            <Route path="assignments" element={<ViewAssignmentTeacher />} />
            <Route path="notifications" element={<ViewNotificationsTeacher />} />
            <Route path="leave-applications" element={<LeaveApplicationsTeacher />} />
            <Route path="upload-material" element={<UploadMaterial />} />
            <Route path="student" element={<ViewStudents />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="attendance" element={<AttendanceTeacher />} />
            <Route path="academic" element={<ViewAcademicsTeacher />} />
            <Route path="add-time-table" element={<AddTimetable />} />
            <Route path="time-table" element={<ViewTimetableTeacher />} />
            <Route path="submissions/:assignmentId" element={<ViewSubmissionsTeacher />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
