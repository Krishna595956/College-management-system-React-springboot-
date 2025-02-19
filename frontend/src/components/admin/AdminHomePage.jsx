import React from "react";

import { NavLink, Outlet } from "react-router-dom";
import { adminPaths } from "../utils/paths";
import { CiMenuBurger } from "react-icons/ci";
import { useCollege } from "../utils/GlobalContext";
import { backend_url } from "../utils/api";
import Cookies from "js-cookie";

const AdminHomePage = () => {
 const {currentUser,logout}=useCollege()
  const [showSideBar, setShowSideBar] = React.useState(true);
  return (<div>
    <div className="grid grid-cols-12">
   {showSideBar&& <div className=" col-span-3 bg-slate-100 overflow-y-auto h-screen" data-aos="fade-right">
        <div className="">
            {/* rounded w3 user logo */}
            <img src={`${backend_url}/images/${currentUser?.image}`} onError={(e)=>{e.target.src="https://cdn-icons-png.flaticon.com/512/149/149071.png"}} alt="user" className="rounded-full mx-auto w-32 h-32 mb-4" />
            <h1 className="text-center text-xl font-bold yuji-mai-regular">{currentUser?.name}</h1>
        </div>
    <div className="flex flex-col justify-between ">
      {adminPaths.map(
        (path) =>
          path.name !== "Logout" &&
          <NavLink
            to={path.path}
            className=
            "flex items-center gap-4 p-5 hover:bg-slate-200 border-b   yuji-mai-regular"
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
        {adminPaths.find((path) => path.name === "Logout").icon}
        <span className="text-lg font-medium">Logout</span>
      </button>
    </div>
  </div>}
  <div className={`${showSideBar?"col-span-9":"col-span-12"}`} data-aos="fade-left">
<header>
    <div className="flex justify-between items-center p-4">
   <button onClick={()=>setShowSideBar(!showSideBar)}>  <CiMenuBurger/></button> <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
    <div className="p-4" data-aos="fade-right">
      
    
    <Outlet />
    </div>

    </div>
    </div>
  </div>);
};

export default AdminHomePage;
