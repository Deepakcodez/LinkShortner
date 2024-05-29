import { getSession } from 'next-auth/react';
import { auth } from '../../auth';

const Profile =async () => {
    const session = await auth()
  console.log('>>>>>>>>>>>user deatil s', session.user.name)
    return ( 
        <>
        <div className="h-screen max-h-[auto] w-full bg-slate-800 pt-3">
            <div className=" px-3 mx-4  border-l-4 border-l-red-500">

          <h1 className=" text-white  font-semibold text-3xl">Hello {session.user.name}</h1>
            </div>
        </div>
        </>
     );
}
 
export default Profile;