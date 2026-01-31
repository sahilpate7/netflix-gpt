import {render, screen} from "@testing-library/react";
import VideoTitle from "../components/VideoTitle.tsx";
import '@testing-library/jest-dom'

test("should render a VideoTitle component ", ()=>{
    render(<VideoTitle title={"Hello"} overview={"description"} />);
    const title = screen.getByText("Hello");

    expect(title).toBeInTheDocument();
})