import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVATAR, LOGO } from "../utils/constants";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser({}));
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, [])

    return (
        <div className={'absolute px-8 py-2 bg-linear-to-b from-black  flex justify-between w-full'}>
            <img
                className={'w-44'}
                src={LOGO}
                alt="logo"
            />
            <div className="flex items-center gap-4">
                <img
                    className="w-10 h-10 rounded-full"
                    src={user?.photoURL ? user.photoURL : USER_AVATAR}
                    alt="user icon"
                />
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
