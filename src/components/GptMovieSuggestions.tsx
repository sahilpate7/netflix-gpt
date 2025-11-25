import { useSelector } from "react-redux"

const GptMovieSuggestions = () => {

    const { movieNames, movieResults } = useSelector((state: any) => state.gpt);
    console.log(movieNames, movieResults);

    return (
        <div>GptMovieSuggestions</div>
    )
}

export default GptMovieSuggestions