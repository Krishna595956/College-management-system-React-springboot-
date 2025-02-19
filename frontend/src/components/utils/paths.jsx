import {
  MdAdminPanelSettings,
  MdOutlineAnalytics,
  MdOutlineAssessment,
  MdOutlineAssignment,
  MdOutlineCalendarMonth,
  MdOutlineRateReview,
} from "react-icons/md";
import {
  FaBell,
  FaBook,
  FaBookReader,
  FaFileDownload,
  FaFileUpload,
  FaMoneyBill,
  FaRegFileAlt,
  FaRegUserCircle,
  FaUserGraduate,
} from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";

export const teacherPaths = [
  //   {
  //     path: '/admin',
  //     name: 'Admin',
  //     icon: <MdAdminPanelSettings />
  //   },
  {
    path: "attendance",
    name: "Post Attendance",
    icon: <FaListCheck className="h-8 w-8" />,
  },
  {
    path: "profile",
    name: "Profile",
    icon: <FaRegUserCircle className="h-8 w-8" />,
  },
  //   {
  //     path: 'books',
  //     name: 'Books'
  //   },
  {
    path: "upload-material",
    name: "Upload Material",
    icon: <FaFileUpload className="h-8 w-8" />,
  },
  {
    path: "student",
    name: "Students",
    icon: <FaUserGraduate className="h-8 w-8" />,
  },
  {
    path: "leave-applications",
    name: "Leave Applications",
    icon: <FaRegFileAlt className="h-8 w-8" />,
  },
  {
    path: "time-table",
    name: "Time Table",
    icon: <MdOutlineCalendarMonth className="h-8 w-8" />,
  },

  // {
  //   path: "assessment",
  //   name: "Assessments Grading",
  //   icon: <MdOutlineAssessment className="h-8 w-8" />,
  // },
  {
    path: "academic",
    name: "Academics",
    icon: <FaBookReader className="h-8 w-8" />,
  },
  {
    path: "notifications",
    name: "Event & Notifications",
    icon: <FaBell className="h-8 w-8" />,
  },
  {
    path: "assignments",
    name: "Assignments",
    icon: <MdOutlineAnalytics className="h-8 w-8" />,
  },
  {
    path: "logout",
    name: "Logout",
    icon: <CiLogout className="h-8 w-8" />,
  },
];
export const adminPaths = [
  //   {
  //     path: '/admin',
  //     name: 'Admin',
  //     icon: <MdAdminPanelSettings />
  //   },
  {
    path: "profile",
    name: "Profile",
    icon: <FaRegUserCircle className="h-8 w-8" />,
  },
  //   {
  //     path: 'books',
  //     name: 'Books'
  //   },
  {
    path: "overview",
    name: "Overview & Analytics",
    icon: <DiGoogleAnalytics className="h-8 w-8" />,
  },
  {
    path: "student",
    name: "Students",
    icon: <FaUserGraduate className="h-8 w-8" />,
  },
  {
    path: "faculty",
    name: "Faculties",
    icon: <PiStudent className="h-8 w-8" />,
  },
  {
    path: "library",
    name: "Library",
    icon: <FaBook className="h-8 w-8" />,
  },

  {
    path: "academic",
    name: "Academics",
    icon: <FaBookReader className="h-8 w-8" />,
  },
  {
    path: "fees",
    name: "Fees",
    icon: <FaMoneyBill className="h-8 w-8" />,
  },
  {
    path: "notifications",
    name: "Event & Notifications",
    icon: <FaBell className="h-8 w-8" />,
  },
  {
    path: "generate",
    name: "Generate Reports",
    icon: <MdOutlineAnalytics className="h-8 w-8" />,
  },
  {
    path: "logout",
    name: "Logout",
    icon: <CiLogout className="h-8 w-8" />,
  },
];
export const studentPaths = [
  //   {
  //     path: '/admin',
  //     name: 'Admin',
  //     icon: <MdAdminPanelSettings />
  //   },
  {
    path: "profile",
    name: "Profile",
    icon: <FaRegUserCircle className="h-8 w-8" />,
  },
  //   {
  //     path: 'books',
  //     name: 'Books'
  //   },
  {
    path: "attendence",
    name: "Attendence",
    icon: <FaListCheck className="h-8 w-8" />,
  },
  {
    path: "timetable",
    name: "Time Table",
    icon: <MdOutlineCalendarMonth className="h-8 w-8" />,
  },
  {
    path: "backlogs",
    name: "Backlogs",
    icon: <PiStudent className="h-8 w-8" />,
  },
  {
    path: "fees",
    name: "Fees",
    icon: <FaMoneyBill className="h-8 w-8" />,
  },
  {
    path: "leave-applications",
    name: "Leave Applications",
    icon: <FaRegFileAlt className="h-8 w-8" />,
  },
  {
    path: "notifications",
    name: "Event & Notifications",
    icon: <FaBell className="h-8 w-8" />,
  },

  {
    path: "library",
    name: "Library",
    icon: <FaBook className="h-8 w-8" />,
  },
  {
    path: "course",
    name: "Course Registration",
    icon: <FaBookReader className="h-8 w-8" />,
  },

  {
    path: "material",
    name: "Material Downlaod",
    icon: <FaFileDownload className="h-8 w-8" />,
  },
  {
    path: "assignment",
    name: "Assignments",
    icon: <MdOutlineAssignment className="h-8 w-8" />,
  },
  {
    path: "feedback",
    name: "Feedbacks",
    icon: <MdOutlineRateReview className="h-8 w-8" />,
  },
  {
    path: "logout",
    name: "Logout",
    icon: <CiLogout className="h-8 w-8" />,
  },
];
