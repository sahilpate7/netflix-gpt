import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useSelector } from "react-redux";

const useMovieTrailer = (movieId: string) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector((state: any) => state.movies.trailerVideo);
    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
        const response = await data.json();
        const filteredVideos = response.results.filter((video: any) => video.type === "Trailer");
        const trailer = filteredVideos.length > 0 ? filteredVideos[0] : response.results[0];
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        if (!trailerVideo) getMovieVideos();
    }, [movieId]);
}

export default useMovieTrailer