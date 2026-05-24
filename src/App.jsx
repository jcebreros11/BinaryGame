import './styles/App.css'
import BinaryGame from './components/BinaryGame';
import BinaryGameLogo from './assets/BinaryGame.png';

function App() {
  return (
    <div className="app">
      <div
        className="title-logo"
        style={{
          backgroundImage: `url(${BinaryGameLogo})`
        }}
      />
      <BinaryGame />
    </div>
  )
}

export default App