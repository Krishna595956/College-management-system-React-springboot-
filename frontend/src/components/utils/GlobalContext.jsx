import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import api, { backend_url } from "./api";

const GlobalContext = createContext();
const CollegeProvider = ({ children }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const bearerHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [currentUser, setCurrentUser] = useState(null);
  const [students, setStudents] = useState();
  const [teachers, setTeachers] = useState();
  const [notification, setNotification] = useState();
  const [allBooks, setAllBooks] = useState();
  const [allLeaves, setAllLeaves] = useState();
  const [allMaterial, setAllMaterial] = useState();
 const [academics, setAcademics] = useState();
 const [assignments, setAssignments] = useState();
 const [payments,setPayments] = useState();
 const [allPayments, setAllPayments] = useState();
 const [timetable, setTimetable] = useState();
 
 const getUser = async () => {
    try {
      const res = await api.get("/college/user/get/token", bearerHeader);
      setCurrentUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [token, role]);
  const getAllStudents = async () => {
    try {
      const res = await api.get("/college/get/students/all", bearerHeader);
      setStudents(res.data.students);
      const res2 = await api.get("/college/get/teachers/all", bearerHeader);
      setTeachers(res2.data.teachers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllStudents();
    getAllBooks();
    getNotification();
    getAllLeaves();
    getAllMaterial();
    getAcademics();
    getAssignments();
    getPayments();
    getAllPayments();
    getTimetable();
  }, [token, role]);
  const getAllBooks = async () => {
    try {
      const res = await api.get("/college/get/all/books", bearerHeader);
      setAllBooks(res.data.libraries);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      const res = await api.post("/auth/logout", bearerHeader);
    } catch (error) {
      console.log(error);
    }
  };
  const getNotification = async () => {
    try {
      const res = await api.get(
        "/college/user/get/notification/userId",
        bearerHeader
      );
      console.log(res.data);
      setNotification(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllLeaves = async () => {
    try {
      const res = await api.get("/college/all/leave", bearerHeader);
      console.log(res.data);
      setAllLeaves(res.data.leaves);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllMaterial = async () => {
    try {
      const res = await api.get("/college/get/all/documents", bearerHeader);
      setAllMaterial(res.data.materials);
    } catch (error) {
      console.log(error);
    }
  }
const getAcademics=async()=>{
  try {
    const res=await api.get("/college/get/academics",bearerHeader)
    setAcademics(res.data)

  } catch (error) {
    console.log(error)
  }
};
const getAssignments=async()=>{
  try {
    const res=await api.get("/college/get/assignments/all",bearerHeader)
    setAssignments(res.data.assignments)

  } catch (error) {
    console.log(error)
  }
}
const getPayments=async()=>{
  try {
    const res=await api.get("/college/get/payments/student/id",bearerHeader)
    setPayments(res.data.payments)

  } catch (error) {
    console.log(error)
  }
}
const getAllPayments=async()=>{
  try {
    const res=await api.get("/college/get/all/payments",bearerHeader)
    setAllPayments(res.data.payments)

  } catch (error) {
    console.log(error)
  }
};
const getTimetable=async()=>{
  try {
    const res=await api.get("/college/get/all/timetables",bearerHeader)
    setTimetable(res.data.timetables)

  } catch (error) {
    console.log(error)
  }
}
// const getSubmissions=async()=>{
//   try {
//     const res=await api.get("/college/get/all/submissions",bearerHeader)
//     setSubmissions(res.data.submissions)

//   } catch (error) {
//     console.log(error)
//   }
// }
  return (
    <GlobalContext.Provider
      value={{
        token,
        role,
        notification,
        bearerHeader,
        currentUser,
        logout,
        students,
        teachers,
        getAllStudents,
        getAllBooks,
        allBooks,
        getNotification,
        allLeaves,
        allMaterial,
        academics,
        getAllLeaves,
        assignments,
        payments,
        allPayments,
        timetable
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useCollege = () => {
  return useContext(GlobalContext);
};
export default CollegeProvider;
