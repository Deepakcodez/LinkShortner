"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { ShortURLCard } from "./ShortURLCard"
import ProfileButton from './Profilebutton'
const Mainpg = () => {

    const [URL, setURL] = useState({ URL: "" })
    const [shortURL, setShortURL] = useState("")
    const [redirectURL, setRedirectURL] = useState(null)
    const [clicks, setClicks] = useState(Number)
    const [shortId, setShortId] = useState(null)
    const [loader, setLoader] = useState(false)
    const changehandler = (e) => {
        e.preventDefault()
        setURL({ URL: e.target.value })
    }

    const convert = () => {
        if (!URL.URL || URL.URL.trim() === "") {
            console.log('No URL provided');
            return;
        }
        setLoader(true);
        axios.post("/api/url", URL)
            .then(resp => {
                const respShortURL = resp.data.savedURL.shortURL;
                const shortURLTEMPLATE = `urlss.vercel.app/ls/${respShortURL}`;
                setShortURL(shortURLTEMPLATE);
                setRedirectURL(resp.data.savedURL.redirectURL);
                setClicks(resp.data.savedURL.clickes);
                setShortId(resp.data.savedURL.shortURL);
                setURL({ URL: "" });
                setLoader(false);
            })
            .catch(error => {
                console.log(error);
                setLoader(false);
            });
    };

    return (
        <>
            <div className="w-full  ">
                <ProfileButton />
                <h1 className=" text-4xl md:text-7xl font-medium text-white text-center pt-20">URL<span className="italic font-medium text-violet-500">SHORTNER</span></h1>

                <div className=" w-full flex flex-col md:flex-row  items-center justify-center mt-[3rem] gap-3">

                    <input
                        className="rounded-md w-[90%] md:w-[50%] h-9 px-3  "
                        type="text"
                        value={URL.URL || ""}
                        onChange={changehandler}
                        placeholder="Paste Url" />
                    <button
                        onClick={convert}
                        className="px-2 w-[8rem] h-9 text-violet-200 hover:text-violet-100 hover:bg-violet-600 bg-violet-500 rounded-lg ring-violet-300 ring-1">

                        {
                            loader ?
                                <h1>Converting...</h1> :
                                <h1>Convert</h1>
                        }

                    </button>
                </div>
                <ShortURLCard shortId={shortId} shortURL={shortURL} redirectURL={redirectURL} clicks={clicks} />
            </div>
        </>
    );
}

export default Mainpg;

