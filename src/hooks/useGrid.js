import React from "react"
import { useGameContext } from "../providers"
export default function useGrid() {
    const { game, nickname } = useGameContext()
    const [grid, setGrid] = React.useState(game)

    React.useEffect(() => {
        if (!game) return;
        setGrid({
            field_1: game.field_1,
            field_2: game.field_2,
            field_3: game.field_3,
            field_4: game.field_4,
            field_5: game.field_5,
            field_6: game.field_6,
            field_7: game.field_7,
            field_8: game.field_8,
            field_9: game.field_9,
        })
    }, [game])

    const handleTick =async (id, value) => {
        const response = await fetch(fetch(`http://localhost:3000/games/${game.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ game: { ...game, [`field_${id}`]: value, last_played: nickname } })
          }))
        if (!response.ok) {
            throw new Error('failed')
        }
        setGrid(state => {
            return {...state, [`field_${id}`]: value }
        })
    }

    return {
        grid,
        handleTick
    }
}