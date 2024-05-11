import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { LayoutPage } from "../pages/LayoutPage";
const Router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage />,
        children: [
            {
                path: '/',
                lazy: async () => {
                    const { HomePage } = await import('../pages/HomePage')
                    return {
                        Component: HomePage
                    }
                },
            },
            {
                path: '/games/:id',
                lazy: async () => {
                    const { LobbyPage } = await import('../pages/LobbyPage')
                    return {
                        Component: LobbyPage
                    }
                }
            },
        ]
    },
])

export default Router;
