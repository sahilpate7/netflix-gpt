import { IMAGE_CDN_URL } from "../utils/constants";

interface MovieCardProps {
    posterPath: string;
    name: string;
}

const MovieCard = ({ posterPath, name }: MovieCardProps) => {

    if (!posterPath) return null;
    return (
        <div className="w-48 shrink-0">
            <img className="w-full h-auto" src={IMAGE_CDN_URL + posterPath} alt={name} />
        </div>
    )
}

export default MovieCard
