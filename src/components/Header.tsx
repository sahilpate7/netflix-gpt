import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVATAR, LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { RiShutDownLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { MdMenu, MdClose } from "react-icons/md";
import { toggleGptSearch } from "../utils/gptSlice";
import { setLang } from "../utils/configSlice";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <header className={'absolute px-8 py-2 bg-linear-to-b from-black flex justify-between items-center w-full z-50'}>
            <img
                className={'w-44'}
                src={LOGO}
                alt="logo"
            />
            {user && (
                <>
                    <button
                        className="text-white md:hidden z-50"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
                    </button>

                    <div className={`flex flex-col md:flex-row items-center gap-4 absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden md:flex'}`}>
                        <select
                            onChange={(e) => dispatch(setLang(e.target.value))}
                            className="p-2 bg-gray-900 text-white rounded-sm cursor-pointer w-full md:w-auto">
                            {SUPPORTED_LANGUAGES.map((language) => (
                                <option key={language.value} value={language.value}>
                                    {language.flag} {language.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleGptSearch}
                            className="p-2 bg-purple-700 rounded-sm cursor-pointer text-white inline-flex items-center justify-center gap-2 w-full md:w-auto">

                            {gptSearch ? "Home" : <><IoSearchOutline /> GPT Search</>}
                        </button>
                        <div className="flex items-center gap-2">
                            <img
                                className="w-10 h-10 hidden md:block"
                                src={user?.photoURL ? user.photoURL : USER_AVATAR}
                                alt="user icon"
                            />
                            {user.displayName && <span className="text-white font-bold md:font-normal">{user.displayName}</span>}
                        </div>
                        <button className="p-1 bg-red-700 rounded-full cursor-pointer text-white mt-2 md:mt-0" onClick={handleSignOut}>
                            <RiShutDownLine size={24} />
                        </button>
                    </div>
                </>
            )}
        </header>
    )
}
export default Header
