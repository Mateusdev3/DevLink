import { BiLogOut } from "react-icons/bi";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import { Link } from "react-router";

export function Header(){

    async function handleLogout(){
        await signOut(auth);
    }
    return(
        <header className=" w-full  mt-4 px-1 flex justify-center" >
            <nav className="bg-white h-12 flex justify-between items-center px-4 rounded-lg shadow-md w-full max-w-3xl">
                <div className="flex gap-4 font-medium">
                    <Link to ="/"> Home </Link>
                    <Link to ="/admin"> Links </Link>
                    <Link to ="/admin/social"> Redes Sociais </Link>
                </div>
            <button onClick={handleLogout}>
                <BiLogOut size={28} color="#db2629" className="cursor-pointer" />
            </button>
            </nav>
        </header>
     
    )
}