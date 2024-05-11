import { useGrid } from '../../hooks';
import { useGameContext } from '../../providers';

import './Grid.scss';

export default function Grid() {
    const { grid, handleTick } = useGrid();
    const { game, nickname } = useGameContext()

    const handleClick = async (index) => {
        if (game.last_played === nickname || game?.end_game === true || game?.player_2 === null) return;
        await handleTick(index + 1, game?.player_1 === nickname ? 'X' : 'O')
    }
    return (
        <div className="grid">
            {Object.keys(grid).map((gridKey, index) => {
                const element = grid[gridKey];
                return (
                    <div onClick={() => handleClick(index)} key={index} className="grid__cell">{element}</div>
                )
            })}
        </div>
    )
}