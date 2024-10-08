"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const createUser = async (e) => {
    e.preventDefault()
    try {
      // Check if required fields are filled
      if (!inputValue.name || !inputValue.email || !inputValue.password) {
        throw new Error("Please fill in all fields");
      }
  
      // Make POST request to create user
      const resp = await axios.post("/api/signup", inputValue);
      // Check if request was successful
      if (resp.status === 200) {
        // Redirect to login page after successful signup
        router.push("/auth/signin");
      } else {
        // Display error message if request was not successful
        setErrorMsg("Failed to sign up. Please try again later.");
      }
    } catch (error) {
      // Display error message if an error occurs during signup
      setErrorMsg(error.message);
    }
  };
  
  const navigator = () => {
    router.push("/auth/signin ");
  };

  
  return (
    <>
      <div className="grid place-items-center h-screen w-full bg-violet-50 ">
        <div className="shadow-lg border-t-8 border-violet-500 rounded-md p-5 w-[90%] sm:w-[25rem]">
          <h1 className="text-center font-semibold text-xl">Register</h1>
          <form className="flex  gap-4 flex-col mt-5">
            <input
              type="text"
              value={inputValue.name}
              name="name"
              onChange={onchangeHandler}
              placeholder="Enter Your Name"
              className="block flex-1 text-black border-0 bg-violet-100 py-1.5 px-2   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 focus:border-0 sm:text-sm sm:leading-6"
            />
            <input
              type="text"
              value={inputValue.email}
              name="email"
              onChange={onchangeHandler}
              placeholder="Enter Your Email"
              className="block flex-1 text-black border-0 bg-violet-100 py-1.5 px-2   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 focus:border-0 sm:text-sm sm:leading-6"
            />
            <input
              type="text"
              value={inputValue.password}
              name="password"
              onChange={onchangeHandler}
              placeholder="Enter Your password"
              className="block flex-1 text-black border-0 bg-violet-100 py-1.5 px-2   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 focus:border-0 sm:text-sm sm:leading-6"
            />
            <button
              onClick={createUser}
              className="bg-violet-500 py-2 rounded-md text-white font-semibold hover:bg-violet-600"
            >
              Register
            </button>
          </form>
          <div className=" mt-2">
            <h1 className="text-sm text-violet-700/50">{errorMsg}</h1>
          </div>
          <div className="mt-2">
            <h1 className="text-sm text-center cursor-pointer">
              Have an account?
              <span className="text-violet-500" onClick={navigator}>
                {" "}
                Login
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
