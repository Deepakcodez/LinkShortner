"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [errorMsg, setErrorMsg] = useState("error message");
  const [inputValue, setInputValue] = useState({
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

  const navigateToSignUp = () => {
    router.push("/auth/signup");
  };

  return (
    <>
      <div className="grid place-items-center h-screen w-full bg-violet-50 ">
        <div className="shadow-lg border-t-8 border-violet-500 rounded-md p-5 w-[90%] sm:w-[25rem]">
          <h1 className="text-center font-semibold text-xl">Login</h1>
          <form className="flex gap-4 flex-col mt-5">
           
            <input
              type="text"
              value={inputValue.email}
              name="email"
              onChange={onchangeHandler}
              placeholder="Enter Your Email"
              className="block flex-1 text-black border-0 bg-violet-100 py-1.5 px-2 rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 focus:border-0 sm:text-sm sm:leading-6"
            />
            <input
              type="text"
              value={inputValue.password}
              name="password"
              onChange={onchangeHandler}
              placeholder="Enter Your password"
              className="block flex-1 text-black border-0 bg-violet-100 py-1.5 px-2 rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 focus:border-0 sm:text-sm sm:leading-6"
            />
            <button className="bg-violet-500 py-2 rounded-md text-white font-semibold hover:bg-violet-600">
              Login
            </button>
          </form>
          <div className="mt-2">
            <h1 className="text-sm text-violet-700/50">{errorMsg}</h1>
          </div>
          <div className="mt-2">
            <h1 className="text-sm text-center cursor-pointer">
              Haven't any account?{" "}
              <span className="text-violet-500" onClick={navigateToSignUp}>
                Create
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
