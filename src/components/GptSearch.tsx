import GptSearchBar from "./GptSearchBar"
import GptMovieSuggestions from "./GptMovieSuggestions"
import { BG_URL } from "../utils/constants"

const GptSearch = () => {
    return (
        <div className="relative">
            <div>
                <img src={BG_URL} alt="netflix backgorund" />
            </div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    )
}

export default GptSearch