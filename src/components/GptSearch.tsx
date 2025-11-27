import GptSearchBar from "./GptSearchBar"
import GptMovieSuggestions from "./GptMovieSuggestions"
import { BG_URL } from "../utils/constants"

const GptSearch = () => {
    return (
        <div className="relative">
            <div className="fixed z-0">
                <img src={BG_URL} alt="netflix backgorund" />
            </div>
            <div className="top-[200px] mx-auto max-w-10/12 px-10 w-full relative z-10">
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </div>
    )
}

export default GptSearch