import './styles/App.css'
import BinaryGame from './pages/BinaryGame';
import Welcome from './pages/Welcome'
import Settings from './pages/Settings'
import BinaryGameLogo from './assets/BinaryGame.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MatrixBackground from './components/MatrixBackground';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div
          className="title-logo"
          style={{
            backgroundImage: `url(${BinaryGameLogo})`
          }}
        />
        {/* <MatrixBackground /> */}
      </div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/game" element={<BinaryGame />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App