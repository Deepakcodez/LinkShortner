"use client"
import axios from "axios";
import { useEffect } from "react";
import Lottie from "lottie-react";
import loader from "../../../../public/loader.json";

const Redirector = (props) => {
  const shortId = props.params.shortid;

  useEffect(() => {
    const redirector = async () => {
      try {
        const resp = await axios.post("/api/r", { shortId: shortId });
        console.log("Redirecting...");
        window.location.href = resp.data.redirectTo; // Redirect to the URL provided in the response
      } catch (error) {
        console.error("Error redirecting:", error);
        // Handle error if needed
      }
    };

    redirector();
  }, []);

  return (
    <>
    <div className="w-full h-screen bg-slate-900 flex flex-col justify-center items-center ">
      <Lottie animationData={loader} loop={true}/>

    </div>
    </>
  );
};

export default Redirector;
