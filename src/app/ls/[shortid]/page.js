"use client"
import axios from "axios";
import { useEffect } from "react";

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
      <h1>Redirector</h1>
    </>
  );
};

export default Redirector;
