"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";
import { FaCopy } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import Link from "next/link";

const Profile = () => {
  const { data: session, status } = useSession(); // Destructure session and status from useSession
  const [urls, setUrls] = useState([]);
  const router = useRouter();

  const fetchUrls = async () => {
    try {
      const resp = await axios.get("/api/getuserlinks");

      // Check if response or resp.data.urls is null or undefined
      if (resp && resp.data && resp.data.urls) {
        setUrls(resp.data.urls); // Set the URLs if they exist
      } else {
        setUrls([]); // Set an empty array if no URLs are found
        console.warn("No URLs found in the response");
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
      setUrls([]); // Optionally set to an empty array in case of an error
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUrls(); // Fetch URLs only when the session is authenticated
    } else if (status === "unauthenticated") {
      router.push("/auth/signin"); // Push to sign-in page if unauthenticated
    }
  }, [status]);

  const redirectToShortURL = (shortId) => {
    window.open(`ls/${shortId}`, "_blank"); // Open short URL in a new tab
  };

  // Copy short URL
  const copyToClipboard = async (id) => {
    try {
      const shortUrl = `https://urlss.vercel.app/ls/${id}`;
      await navigator.clipboard.writeText(shortUrl);
    } catch (error) {
      console.error("Failed to copy URL to clipboard:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="h-screen w-full bg-slate-800 flex justify-center items-center text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      {session?.user ? (
        <div className="h-screen max-h-[auto] w-full bg-slate-800 pt-3">
          <div className="px-3 mx-4 border-l-4 border-l-red-500 flex justify-between items-center">
            <div>
              <h1 className="text-white font-semibold text-3xl">
                {" "}
                Hello {session?.user.name || "..........."}
              </h1>
              <p className="text-white/75 text-sm">Welcome to your Profile</p>
            </div>
            <Link href="/">
              <Home color="#ffff" />
            </Link>
          </div>
          {/* //card */}
          <div className="flex flex-col gap-6 justify-center items-center w-full mt-[10rem]">
            {urls &&
              urls?.map((url) => (
                <div
                  key={url}
                  className="bg-violet-500/25 py-5 px-3 rounded-lg w-[90%] md:w-[70%] ring-violet-500 ring-1 sm:ps-10 sm:pe-5 flex justify-between"
                >
                  <h1 className="text-white text-xs sm:text-base truncate">{`https://urlss.vercel.app/ls/${url}`}</h1>
                  <div className="flex gap-2">
                    <motion.div
                      whileTap={{ scale: 0.85 }}
                      onClick={() => copyToClipboard(url)}
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
                        className="text-violet-200 text-2xl h-full"
                      />
                    </motion.div>
                    <h1>{}</h1>
                  </div>
                </div>
              ))}
          </div>{" "}
        </div>
      ) : (
        <div className="h-screen w-full bg-slate-800 flex justify-center items-center text-white">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
};

export default Profile;
