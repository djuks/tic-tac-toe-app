import { RouterProvider as ReactRouterRouterProvider } from "react-router-dom";
import { Router } from '../router';

export default function RouterProvider() {
    return (
        <ReactRouterRouterProvider router={Router} />
    )
}