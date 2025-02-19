import React, { useState } from "react";
import pic from "/read-note.svg";
import { Link } from "react-router-dom";
import api from "./utils/api";
import Cookies from "js-cookie";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async(e) => {
    e.preventDefault();
    try {
        const res= await api.post("/auth/login", {
            email,
            password,
        })
        const roles= res.data.role;
        Cookies.set("token", res.data.token);
        Cookies.set('role', roles);
        if (roles === "Admin") {
            window.location.href = "/admin";
        }else if (roles === "Teacher") {
          window.location.href = "/teacher";
      }else if (roles === "Student") {
        window.location.href = "/student";
    }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      
        <div className="flex">
          <div className="w-1/2 mx-auto"  data-aos="fade-right">
            <div className="flex flex-col items-center justify-center">
              <h4 className="p-5">
                <img src={pic} alt="" />
                <h3 className="">
                  <span className="yuji-mai-regular text-emerald-500 text-5xl mb-5 relative bottom-60 left-10">
                    College Management
                  </span>{" "}
                </h3>
              </h4>
            </div>
          </div>
          <div className="w-1/2 border-l border-gray-300"  data-aos="fade-left">
            <div className="flex flex-col items-center justify-center mt-20">
              <div className="bg-white p-10 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-5">Login</h2>
                <form className="w-full" onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Login
                    </button>
                    {/* <Link
                      to={"/forget"}
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                      Forgot Password?
                    </Link> */}
                  </div>
                </form>
              </div>
              {/* <p className="text-sm text-gray-500 mt-5">Don't have an account? <a className="text-blue-500 hover:text-blue-800 font-bold" href="#">Sign up</a></p> */}
            </div>
          </div>
        </div>
   
    </div>
  );
};

export default Login;
