import { FaPlay } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";

interface VideoTitleProps {
    title: string;
    overview: string;
}

const VideoTitle = ({ title, overview }: VideoTitleProps) => {
    return (
        <div className="w-full aspect-video py-10 px-12 absolute top-1/2 -translate-y-1/2 text-white bg-linear-to-r from-black to-black/30">
            <div className="absolute top-1/2 -translate-y-1/2">
                <h1 className="text-5xl font-bold">{title}</h1>
                <p className="text-lg mt-2 w-1/3">{overview}</p>
                <div className="flex gap-2 mt-4">
                    <button className="bg-white text-black px-4 py-2 rounded-sm inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-white/60"><FaPlay />Play</button>
                    <button className="bg-gray-500/60 text-white px-4 py-2 rounded-sm inline-flex justify-center items-center gap-2 cursor-pointer"><IoInformationCircleSharp />
                        More Info</button>
                </div>
            </div>
        </div>
    )
}

export default VideoTitle