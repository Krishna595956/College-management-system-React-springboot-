import React from "react";
import { useCollege } from "../utils/GlobalContext";
import api from "../utils/api";

const ViewNotificationsTeacher = () => {
  const { notification,bearerHeader,getNotification } = useCollege();
  // console.log(notifications);
 const markAsRead=async(id)=>{
  try {
    await api.put(`college/read/${id}`,{},bearerHeader)
    getNotification()
  } catch (error) {
    console.error(error);
  }
 }
  return (
    <div>
      <div className="">
        <ul>
         {notification?.map((item)=> <li className="border p-3 text-justify rounded-md m-2">
            <p className="text-xl font-semibold text-gray-600">
             {item.title} {" "}<span className="float-right">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={item.read}
                  onChange={()=>markAsRead(item.id)}
                  className="w-5 h-5 outline-none rounded-full"
                />
              </span>
            </p>
            <p>
            {item.message}
            </p>
            <p className="text-right">{item.createdAt}</p>
          </li>)}
          {/* <li className="border p-3 text-justify rounded-md m-2">
            <p className="text-xl font-semibold text-gray-600">
              One Day leave for all on Christmas{" "}
              <span className="float-right">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-5 h-5 outline-none rounded-full"
                />
              </span>
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
              vero quisquam incidunt alias! Unde tenetur qui necessitatibus
              nulla, odio maiores officia quasi ex atque sint magnam nisi maxime
              et sequi.
            </p>
            <p className="text-right">06 dec 2024</p>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default ViewNotificationsTeacher;
