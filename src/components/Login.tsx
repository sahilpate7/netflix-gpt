import Header from "./Header.tsx";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validation.ts";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase.ts';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.ts";
import { USER_AVATAR } from "../utils/constants.ts";

const Login = () => {

    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {

        const message = checkValidData(email.current?.value, password.current?.value);
        setErrorMessage(message);

        if (message) return;

        if (!isSignInForm) {
            // sign up logic here
            createUserWithEmailAndPassword(auth, email.current?.value || '', password.current?.value || '')
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current?.value || '', photoURL: USER_AVATAR
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser!;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                        setErrorMessage(null);
                    }).catch((error) => {
                        setErrorMessage(error);
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });

        } else {
            // sign in logic here
            signInWithEmailAndPassword(auth, email.current?.value || '', password.current?.value || '')
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    setErrorMessage(null);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    }

    const inputFieldStyle = "p-2 my-2 w-full border-1 border-gray-400 placeholder:text-gray-400 bg-gray-900 rounded-sm";

    return (
        <div className={'relative'}>
            <Header />
            <div>
                <img src={'https://assets.nflxext.com/ffe/siteui/vlv3/58622d3e-49bc-482d-8b16-bddc4b672e8e/web/IN-en-20251110-TRIFECTA-perspective_281b0878-5972-49a4-9956-3f0cb5eb039b_small.jpg'} alt="netflix backgorund" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className={'absolute p-12 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white max-w-3/12 rounded-lg'}>
                <h1 className={'text-3xl font-bold m-0 mb-6'}>
                    {isSignInForm ? "Sign In" : "Sign up"}
                </h1>
                {!isSignInForm && <input
                    type="text"
                    placeholder="Full Name"
                    className={inputFieldStyle}
                    ref={name}
                />}
                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className={inputFieldStyle}
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className={inputFieldStyle}
                />
                <p className={'text-sm text-red-700'}>{errorMessage}</p>
                <button
                    className={'p-2 mt-4 bg-red-700 w-full rounded-sm cursor-pointer'}
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign up"}
                </button>
                <p
                    className={'text-sm font-normal m-0 mt-3 cursor-pointer'}
                    onClick={toggleSignInForm}
                >
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already have an account? Sign in now"}
                </p>
            </form>
        </div>
    )
}
export default Login
