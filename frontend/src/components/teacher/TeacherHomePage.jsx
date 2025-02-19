import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { teacherPaths } from "../utils/paths";
import { NavLink, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useCollege } from "../utils/GlobalContext";
import { backend_url } from "../utils/api";


const TeacherHomePage = () => {
 
  const [showSideBar, setShowSideBar] = React.useState(true);
  const {logout,currentUser}=useCollege()
  return (<div>
    <div className="grid grid-cols-12">
   {showSideBar&& <div className=" overflow-y-auto h-screen col-span-3 bg-slate-100 " data-aos="fade-right">
        <div className="">
            {/* rounded w3 user logo */}
            <img src={`${backend_url}/images/${currentUser?.image}`} onError={(e)=>{e.target.src="https://cdn-icons-png.flaticon.com/512/149/149071.png"}}  alt="user" className="rounded-full mx-auto w-32 h-32 mb-4" />
            <h1 className="text-center text-xl font-bold yuji-mai-regular">{currentUser?.name}</h1>
        </div>
    <div className="flex flex-col justify-between ">
      {teacherPaths.map(
        (path) =>
          path.name !== "Logout" &&
          <NavLink
          key={path.name}
            to={path.path}
            className=
            "flex items-center gap-4 p-5 hover:bg-slate-200 hover: border-b   yuji-mai-regular"
          >
            {path.icon}
            <span className="text-lg font-medium">{path.name}</span>
          </NavLink>
      )}
      <button
         onClick={() => {
          Cookies.remove("token");
          Cookies.remove("role");
          window.location.href = "/";
          logout()
        }
        }
        className="flex items-center gap-4 p-4 hover:bg-slate-200 "
      >
        {teacherPaths.find((path) => path.name === "Logout").icon}
        <span className="text-lg font-medium">Logout</span>
      </button>
    </div>
  </div>}
  <div className={`${showSideBar?"col-span-9":"col-span-12"}`} data-aos="fade-right">
<header>
    <div className="flex justify-between items-center p-4">
   <button onClick={()=>setShowSideBar(!showSideBar)}>  <CiMenuBurger/></button> <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
      {/* <div className="flex items-center gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
      </div> */}
    </div>
    <hr className="border-gray-300" />
   
        
</header>
    <div className="p-4">
      
    
    <Outlet/>
    </div>

    </div>
    </div>
  </div>);
};

export default TeacherHomePage;
