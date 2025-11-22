import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser({}));
                navigate("/");
            }
        });
    }, [])

    return (
        <div className={'absolute px-8 py-2 bg-linear-to-b from-black  flex justify-between w-full'}>
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
