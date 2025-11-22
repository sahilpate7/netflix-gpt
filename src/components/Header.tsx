import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            console.log(error);
            navigate("/error");
        });
    }

    return (
        <div className={'absolute px-8 py-2 bg-gradient-to-b from-black w-screen flex justify-between'}>
            <img
                className={'w-44'}
                src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="user picture"
            />
            <div className="flex items-center gap-4">
                <img className="w-10 h-10 rounded-full" src={user?.photoURL ? user.photoURL : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} alt="user icon" />
                {user && (
                    <>
                        {user.displayName && <span className="text-white">{user.displayName}</span>}
                        <button className="p-2 bg-red-700 rounded-sm cursor-pointer text-white" onClick={handleSignOut}>Sign Out</button>
                    </>
                )}
            </div>
        </div>
    )
}
export default Header
