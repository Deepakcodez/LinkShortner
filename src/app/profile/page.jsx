"use client"
import React from 'react';
import { getSession, useSession } from 'next-auth/react';


const Profile = () => {
  const session = useSession()
  return (
    <>
      <div className="h-screen max-h-[auto] w-full bg-slate-800 pt-3">
        <div className=" px-3 mx-4  border-l-4 border-l-red-500">
          <h1 className=" text-white  font-semibold text-3xl"> Hello {session?.data?.user.name || "..........."}</h1>
        </div>
    {/* //card */}
        <div className='flex justify-center items-center w-full mt-[10rem]'>

          <div className='bg-violet-500/25 py-5 px-3 rounded-lg w-[90%] md:w-[70%] ring-violet-500 ring-1 sm:ps-10 sm:pe-5 flex justify-between'>
            <h1 className='text-white text-xs sm:text-base truncate'>hello</h1>

          </div>

        </div>      </div>
    </>
  );
}

export default Profile;