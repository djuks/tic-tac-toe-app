import React, { createContext } from "react";

const Context = createContext({})

const Provider = ({ children }) => {
    const [game, setGame] = React.useState(undefined);
    const [nickname, setNickname] = React.useState('');
    return (
        <Context.Provider value={{ game, setGame, nickname, setNickname }}>
            {children}
        </Context.Provider>
    )
}

export function useGameContext() {
    return React.useContext(Context);
}

export default Provider;
