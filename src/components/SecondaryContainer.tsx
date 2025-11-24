import MovieList from "./MovieList"
import { useSelector } from "react-redux"

const SecondaryContainer = () => {
    const movies = useSelector((store: any) => store.movies);

    return (
        <div className=" -mt-28 relative z-10 pb-20">
            <MovieList title={"Now Playings"} movies={movies.nowPlayingMovies} />
            <MovieList title={"Popular"} movies={movies.popularMovies} />
            <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
            <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
        </div>
    )
}

export default SecondaryContainer