const Mainpg = () => {
    return (  
        <>
        <div className="w-full ">
            <h1 className=" text-4xl md:text-7xl font-medium text-white text-center pt-20">URL<span className="italic font-medium text-violet-500">SHORTNER</span></h1>
       
       <div className=" w-full  flex justify-center">
        <input 
        className="rounded-md w-[80%] md:w-[50%] h-9 px-3 mt-4 border-violet-400 focus:ring-violet-300 focus:border-violet-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
        type="text" 
        placeholder="Enter Url" />
        </div>
        </div>
        </>
    );
}
 
export default Mainpg;