import Mainpg from "./_components/Mainpg";
import vidBG from  './../../public/video3.mp4'
import { auth } from "../auth";


export default async function Home() {
  const session = await auth()
  console.log('>>>>>>>>>>>user deatil', session)
  return (
    
   <>
   <div className="relative z-10 w-full h-screen  bg-slate-800">
    
   <video className="absolute -z-10 object-cover h-full w-full opacity-20 " src={'https://cdn.pixabay.com/video/2017/11/02/12716-241674181_large.mp4' || vidBG} autoPlay muted loop />
   <Mainpg/>

   </div>
   <div>

   </div>
   </>
  );
}
