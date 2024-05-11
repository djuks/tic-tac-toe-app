import { Outlet } from "react-router-dom";
import { GameProvider } from "../providers";

export const LayoutPage = () => {
    return (
        <GameProvider>
        <Outlet />
        </GameProvider>
    )
}