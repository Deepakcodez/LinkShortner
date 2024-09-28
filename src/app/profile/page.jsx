"use client";
import React from "react";
import {  useSession } from "next-auth/react";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";
import { FaCopy } from "react-icons/fa";

const Profile = () => {
  const session = useSession();
  const [urls, setUrls] = React.useState([]);

  const fetchUrls = async () => {
    const resp = await axios.get("/api/getuserlinks");
    setUrls(resp.data.urls);
  };

  React.useEffect(() => {
    fetchUrls();
  }, []);
  const redirectToShortURL = (shortId) => {
    window.open(`ls/${shortId}`, "_blank"); // Open short URL in a new tab
  };
   //copy short url
   const copyToClipboard = async (id) => {
    try {
      const shortUrl = `https://urlss.vercel.app/ls/${id}`
      await navigator.clipboard.writeText(shortUrl);
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
    }
  };


  return (
    <>
      <div className="h-screen max-h-[auto] w-full bg-slate-800 pt-3">
        <div className=" px-3 mx-4  border-l-4 border-l-red-500">
          <h1 className=" text-white  font-semibold text-3xl">
            {" "}
            Hello {session?.data?.user.name || "..........."}
          </h1>
        </div>
        {/* //card */}
        <div className="flex flex-col gap-6 justify-center items-center w-full mt-[10rem]">
          {urls &&
            urls?.map((url) => (
              <>
                <div className="bg-violet-500/25 py-5 px-3 rounded-lg w-[90%] md:w-[70%] ring-violet-500 ring-1 sm:ps-10 sm:pe-5 flex justify-between">
                  <h1 className="text-white text-xs sm:text-base truncate">{`https://urlss.vercel.app/ls/${url}`}</h1>
                  <div className="flex gap-2">
                    
                    <motion.div
                      whileTap={{ scale: 0.85 }}
                      onClick={()=>copyToClipboard(url)}
                      className="text-violet-200 text-lg h-full"
                    >
                      <FaCopy />
                    </motion.div>
                    <motion.div
                      whileTap={{ scale: 0.85 }}
                      onClick={redirectToShortURL}
                      className="text-violet-300 text-xl h-full"
                    >
                      <IoIosSend
                        onClick={() => redirectToShortURL(url)}
                        className=" text-violet-200 text-2xl h-full"
                      />
                    </motion.div>
                  </div>
                </div>
              </>
            ))}
        </div>{" "}
      </div>
    </>
  );
};

export default Profile;
