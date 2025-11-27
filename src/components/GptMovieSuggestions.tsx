import { useSelector } from "react-redux"
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {

    const { movieNames, movieResults } = useSelector((state: any) => state.gpt);

    if (!movieNames && !movieResults) return null;

    return (
        <div className="bg-black/80">
            {movieNames.map((movie: string, index: number) => (
                <MovieList key={index} title={movie} movies={movieResults[index]} />
            ))}
        </div>
    )
}

export default GptMovieSuggestions