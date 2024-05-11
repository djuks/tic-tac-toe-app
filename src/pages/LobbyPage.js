import React from 'react'
import { useGameContext } from '../providers'
import { Grid } from '../components';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';

export const LobbyPage = () => {
    const { id: gameId } = useParams();

    const { nickname, game, setGame, setNickname } = useGameContext();

    const isEnd = Boolean(game?.end_game);

    const navigate = useNavigate()

    const handleExit = () => {
        fetch(`http://localhost:3000/games/${gameId}/end`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(async resp => {
            if (!resp.ok) throw new Error(resp)
            setGame(undefined);
            setNickname('');
            navigate('/');
          })
    }

    React.useEffect(() => {
        if (isEnd) return;
        if (gameId) {
            const intervalId = setInterval(() => {
                fetch(`http://localhost:3000/games/${gameId}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }).then(async resp => {
                    if (!resp.ok) throw new Error(resp)
                    const response = await resp.json();
                if (response?.end_game) {
                    clearInterval(intervalId)
                }
                    setGame(response)
                  }).catch(e => {
                    console.log(e)
                    clearInterval(intervalId)
                  });
            }, 1000)
        }
    }, [gameId, isEnd])


    React.useEffect(() => {
        if (!nickname) {
            navigate('/')
        }
    }, [nickname])
    return (
        <div>
            <p>Player 1: {nickname}</p>
            {game?.player_2 && <p>Player 2: {game?.player_2 === nickname ? game?.player_1: game?.player_2}</p>}
            {!game?.player_2 ? <p>Player 2: Waiting to join</p>: null}
            <Grid />

            <p>Game active: {game?.end_game ? 'False' : 'True'}</p>
            {game?.message ? <p>Winner: {game.message}</p> : null}
            <button onClick={handleExit} style={{ marginTop: 24 }}>Exit</button>
        </div>
    )
}