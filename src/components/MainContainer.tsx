import { useSelector } from "react-redux"
import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"

const MainContainer = () => {
    const movies = useSelector((store: any) => store.movies?.nowPlayingMovies)

    if (!movies) return null;

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    const { original_title, overview, id } = randomMovie;

    return (
        <div className="relative">
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground movieId={id} />
        </div>
    )
}

export default MainContainer