import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVATAR, LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { RiShutDownLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { toggleGptSearch } from "../utils/gptSlice";
import { setLang } from "../utils/configSlice";

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

    const handleGptSearch = () => {
        // navigate("/gpt");
        dispatch(toggleGptSearch(true));
    }

    const gptSearch = useSelector((state: any) => state.gpt.showGptSearch);

    return (
        <div className={'absolute px-8 py-2 bg-linear-to-b from-black  flex justify-between w-full z-50'}>
            <img
                className={'w-44'}
                src={LOGO}
                alt="logo"
            />
            {user && <div className="flex items-center gap-4">
                <select
                    onChange={(e) => dispatch(setLang(e.target.value))}
                    className="p-2 bg-black text-white rounded-sm cursor-pointer">
                    {SUPPORTED_LANGUAGES.map((language) => (
                        <option key={language.value} value={language.value}>
                            {language.flag} {language.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleGptSearch}
                    className="p-2 bg-purple-700 rounded-sm cursor-pointer text-white inline-flex items-center gap-2">

                    {gptSearch ? "Home" : <><IoSearchOutline /> GPT Search</>}
                </button>
                <img
                    className="w-10 h-10"
                    src={user?.photoURL ? user.photoURL : USER_AVATAR}
                    alt="user icon"
                />
                {user.displayName && <span className="text-white">{user.displayName}</span>}
                <button className="p-1 bg-red-700 rounded-full cursor-pointer text-white" onClick={handleSignOut}>
                    <RiShutDownLine />
                </button>
            </div>}
        </div>
    )
}
export default Header
