import React from 'react'
import { useGameContext } from '../providers'
import { Grid } from '../components';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';
import { createConsumer } from '@rails/actioncable';

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
        // Establish Action Cable connection
        const cable = createConsumer('ws://localhost:3000/cable');
        const channel = cable.subscriptions.create(
          { channel: 'GameChannel', game_id: gameId },
          {
            received: (data) => {
              console.log('Received data:', data);
              // Handle received data, update game state, etc.
              setGame(data);
              if (data.end_game) {
                // Optionally, clear interval or perform any cleanup
              }
            },
          }
        );
  
        return () => {
          // Unsubscribe from Action Cable channel when component unmounts
          channel.unsubscribe();
        };
      }
    }, [gameId, isEnd]);


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

            <p>Game active: {game?.end_game ? 'Other player leave the game!' : 'Playing!'}</p>
            {game?.message ? <p>Winner: {game.message}</p> : null}
            <button onClick={handleExit} style={{ marginTop: 24 }}>Exit</button>
        </div>
    )
}