import Image from "next/image";
import Mainpg from "./_components/Mainpg";
import Navbar from "./_components/Navbar";
export default function Home() {
  return (
   <>
   <div className="w-full h-screen bg-slate-800">
   <Navbar/>
   <Mainpg/>

   </div>
   </>
  );
}
