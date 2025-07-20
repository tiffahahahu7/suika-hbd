import './App.css'
import FruitGame from './components/FruitGame';
import Fireworks from './components/Fireworks';

function App() {

  return (
    <>
      <h1>🍉 合成大西瓜 🍉</h1>
      <FruitGame />
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
  )
}

export default App
