import MovieCard from "./MovieCard";

interface MovieListProps {
    title: string;
    movies: Movie[];
}

interface Movie {
    poster_path: string;
    title: string;
    overview: string;
    id: number;
    original_title: string;
    backdrop_path: string;
    vote_average: number;
    adult: boolean;
    release_date: string;
    original_language: string;
    video: boolean;
    vote_count: number;
}

const MovieList = ({ title, movies }: MovieListProps) => {

    return (
        <div className="px-6 pt-5">
            <h2 className="text-2xl font-bold m-0 mb-5 text-white">{title}</h2>
            <div className="overflow-x-scroll no-scrollbar">
                <div className="gap-3 flex">
                    {movies && movies.map((movie) => (
                        <MovieCard posterPath={movie.poster_path} name={movie.title} key={movie.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieList
