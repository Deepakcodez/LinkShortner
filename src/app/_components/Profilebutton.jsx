import { CircleUserRound } from 'lucide-react';
import Link from 'next/link';
import { auth } from '../../auth';

const ProfileButton = async() => {
   
    return ( 
        <>
        <Link href={'/auth/signup'} className='bg-gray-800 inline-block p-3 absolute rounded-md  border-t bottom-[4rem] end-10 shadow-lg'>
        <CircleUserRound color='white' />

        </Link>
        </>
     );
}
 
export default ProfileButton;