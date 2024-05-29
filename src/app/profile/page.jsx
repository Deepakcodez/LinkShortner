"use client"
import React from 'react';
import { getSession, useSession } from 'next-auth/react';
import { auth } from '../../auth';
import Userlinks from '../_components/UserLinks';


const Profile =  () => {
  const session = useSession()
  console.log('>>>>>>>>>>>user deatil profile', session?.data?.user?.name)
  return (
    <>
      <div className="h-screen max-h-[auto] w-full bg-slate-800 pt-3">
        <div className=" px-3 mx-4  border-l-4 border-l-red-500">
          <h1 className=" text-white  font-semibold text-3xl"> Hello {session?.data?.user.name||"..........."}</h1>
        </div>
        
  <Userlinks/>
      </div>
    </>
  );
}

export default Profile;