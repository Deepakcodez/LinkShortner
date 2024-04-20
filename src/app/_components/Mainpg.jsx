"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import {ShortURLCard} from "./ShortURLCard"
const Mainpg = () => {

    const [URL, setURL] = useState({URL:""})
    const [shortURL, setShortURL] = useState("")
    const [redirectURL, setRedirectURL] = useState(null)
    const [clicks, setClicks] = useState(Number)
    const changehandler = (e) => {
        e.preventDefault()
        setURL({URL : e.target.value})
    }

    const convert = async () => {
        try {

            const resp = await axios.post("/api/url", URL)
            console.log('>>>>>>>>>>>', resp.data.savedURL)
            const respShortURL = resp.data.savedURL.shortURL;
            const shortURLTEMPLATE = `http://localhost:3000/ls/${respShortURL}`;
            setShortURL(shortURLTEMPLATE)
            setRedirectURL(resp.data.savedURL.redirectURL)
            setClicks(resp.data.savedURL.clickes)
            setURL({url : ""})

        } catch (error) {
            console.log('>>>>>>>>>>>', error)
        }

    }
    useEffect(()=>{
        console.log('>>>>>>>>>>>', shortURL)
    },[])
    return (
        <>
            <div className="w-full ">
                <h1 className=" text-4xl md:text-7xl font-medium text-white text-center pt-20">URL<span className="italic font-medium text-violet-500">SHORTNER</span></h1>

                <div className=" w-full flex flex-col md:flex-row  items-center justify-center mt-4 gap-3">

                    <input
                        className="rounded-md w-[90%] md:w-[50%] h-9 px-3  "
                        type="text"
                        value={URL.URL || ""}
                        onChange={changehandler}
                        placeholder="Enter Url" />
                    <button
                        onClick={convert}
                        className="px-2 h-9 hover:bg-violet-300 bg-violet-200 rounded-lg ring-violet-500 ring-1">Convert</button>
                </div>
             <ShortURLCard shortURL={shortURL} redirectURL={redirectURL} clicks={clicks} />
            </div>
        </>
    );
}

export default Mainpg;

