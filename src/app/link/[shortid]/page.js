"use client"

import { useState } from "react"

const Redirector = (props) => {
    const [shortId, setShortId] = useState(props.params.shortid);


    return ( 

        <>
        <h1>redirector to {shortId}</h1>
        </>
     );
}
 
export default Redirector 