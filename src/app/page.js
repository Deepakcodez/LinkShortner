import Image from "next/image";
import Mainpg from "./_components/Mainpg";
import vidBG from  './../../public/video3.mp4'
export default function Home() {
  return (
   <>
   <div className="relative z-10 w-full h-screen relative bg-slate-800">
    
   <video className="absolute -z-10 object-cover h-full w-full opacity-20 " src={'https://cdn.pixabay.com/video/2017/11/02/12716-241674181_large.mp4' || vidBG} autoPlay muted loop />
   <Mainpg/>
   </div>
   </>
  );
}
