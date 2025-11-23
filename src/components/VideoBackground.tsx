import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

interface VideoBackgroundProps {
    movieId: string;
}

const VideoBackground = ({ movieId }: VideoBackgroundProps) => {
    const trailerVideo = useSelector((store: any) => store.movies?.trailerVideo)
    useMovieTrailer(movieId);

    return (
        <div>
            {trailerVideo && (
                <iframe
                    className="w-full aspect-video"
                    src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen

                ></iframe>
            )}
        </div>
    )
}

export default VideoBackground