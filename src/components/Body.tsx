import Login from "./Login.tsx";
import Browse from "./Browse.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ])

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}
export default Body
