import { useRef } from "react";
import lang from "../utils/languageConstants"
import { useSelector } from "react-redux"
import openAiClient from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const langKey = useSelector((state: any) => state.config.lang) as keyof typeof lang;
    const searchText = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch();

    const serachMovieTMDB = async (movie: string) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        return json.results;
    }

    const handleGptClickSearch = async () => {
        const gptQuery = "Act as a movie recommendation system and suggest some movies based on the query." + searchText.current?.value + "Only give me the list of 5 movies, comma seperated like the result given ahead. Example: movie1 name, movie2 name, movie3 name, movie4 name, movie5 name";

        const getResult = await openAiClient.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'user', content: gptQuery },
            ],
        });

        if (!getResult.choices[0].message.content) {
            // TODO: show error
            return;
        };
        const gptMovies = getResult.choices[0].message.content.split(",");
        const data = gptMovies.map((movie) => serachMovieTMDB(movie));
        const results = await Promise.all(data);
        dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: results }));
    }

    return (
        <div className="flex mx-auto justify-center mb-5">
            <form className="grid grid-cols-12 bg-black p-2 w-full" onSubmit={(e) => e.preventDefault()}>
                <input type="text" className="py-2 px-4 m-0 bg-white col-span-10 w-full" placeholder={lang[langKey].gptSearchPlaceholder} ref={searchText} />
                <button className="py-2 px-4 m-0 bg-blue-500 text-white cursor-pointer col-span-2" onClick={handleGptClickSearch}>
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar