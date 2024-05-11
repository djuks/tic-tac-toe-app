import React, { useState } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';
import { useGameContext } from '../providers';

export const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const { nickname, setNickname, setGame } = useGameContext()
  const blocker = useBlocker();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ game: { nickname } }),
      });
      if (response.ok) {
        const game = await response.json()
        console.log('Nickname sent successfully!', game);
        setGame(game);
        navigate(`/games/${game.id}`)
        // Optionally, close the modal or navigate to another page
      } else {
        console.error('Failed to send nickname');
      }
    } catch (error) {
      console.error('Error sending nickname:', error);
    }
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <h1>React Modal Form</h1>
      <button onClick={toggleModal}>Enter Nickname</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label>
                Nickname:
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
              </label>
              <button>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
