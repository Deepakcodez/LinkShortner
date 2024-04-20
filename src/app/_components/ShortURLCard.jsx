import React from 'react'
import { FaCopy } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoIosSend } from "react-icons/io";

export const ShortURLCard = (props) => {
  console.log('>>>>>>>>>>>', props)
  const { shortURL, redirectURL, clicks } = props;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortURL);
      console.log('URL copied to clipboard:', shortURL);
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
    }
  };

  const redirectToShortURL = () => {
    window.open(shortURL, '_blank'); // Open short URL in a new tab
  };


  return (
    <>
    {
      shortURL&&
      <div className='flex justify-center items-center w-full mt-[5rem]'>

      <div className='bg-violet-500/25 py-5 px-3 rounded-lg w-[90%] md:w-[70%] ring-violet-500 ring-1 sm:ps-10 sm:pe-5 flex justify-between'>
        <h1 className='text-white text-xs sm:text-base truncate'>{shortURL}</h1>
        <div className='flex gap-4'>
        <div 
        onClick={redirectToShortURL}
        className='text-violet-300 text-xl h-full'>
        <IoIosSend />
        </div>
        <motion.div 
        whileTap={{ scale: 0.85 }}
        onClick={copyToClipboard}
        className='text-violet-200 text-lg h-full'>
          <FaCopy />
        </motion.div>
          </div>
      </div>

    </div>
    }
     
    </>
  )
}
