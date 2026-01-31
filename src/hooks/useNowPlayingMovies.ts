import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector((state: any) => state.movies.nowPlayingMovies);

    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results))
    }
    useEffect(() => {
        if (!nowPlayingMovies) getNowPlayingMovies();
    }, [])
}

export default useNowPlayingMovies;