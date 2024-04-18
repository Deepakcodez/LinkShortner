import Link from "next/link";
import { buttonVariants,button } from "@/components/ui/button";
const Navbar = () => {
    return ( 
        <>
        <div className="py-2  border-b-[1px] border-slate-200/25 px-5 ">
        <ul>
            <li>
                <Link className="button()" href='auth/signIn'>Login</Link>
            </li>

        </ul>
        </div>
        </>
     );
}
 
export default Navbar;