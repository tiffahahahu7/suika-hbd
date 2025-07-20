import { useState } from 'react';
import './App.css';
import './styles/Entry.css';
import FruitGame from './components/FruitGame';
import Entry from './components/Entry';
import Fireworks from './components/Fireworks';
import replay from './assets/replay.png';
import bubble from './assets/bubble.png';

function App() {
  const [showGame, setShowGame] = useState(false);
  const [gameKey, setGameKey] = useState(Date.now());
  const [gameOver, setGameOver] = useState(false);

  // Callback for FruitGame to notify game over
  const handleGameOver = () => {
    setGameOver(true);
  };

  // Replay handler
  const handleReplay = () => {
    setGameKey(Date.now()); // force FruitGame to re-mount for next game
    setGameOver(false);
    setShowGame(false); // Go back to entry page
  };

  return (
    <>
      <h1>🍉 合成大西瓜 🍉</h1>
      {!showGame ? (<Entry setShowGame={setShowGame} />) : (
        <>
          <FruitGame key={gameKey} onGameOver={handleGameOver} />
          {gameOver && (
            <button className="replay-btn" onClick={handleReplay} aria-label="Replay">
              <img src={bubble} alt="replay background" className="replay-bubble" />
              <img src={replay} alt="Replay" className="replay-icon" />
            </button>
          )}
        </>
      )}
      <Fireworks />
      <footer className="footer">
        <div className="footer-content">
          <p>
            Made with <span role="img" aria-label="love">❤️</span> by 
            <a href="https://www.gigigatgat.ca/" target="_blank" rel="noopener noreferrer"> Avocado</a>
            <span className="aka"> (aka Affogato)</span>
          </p>
          <p className="copyright">
            © 2025 合成大西瓜（伪） · version 0q7y2f3
          </p>
        </div>
      </footer>
    </>
  );
}

export default App
