import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainPage from './pages/MainPage';  // Import MainPage
import StatsPage from './pages/StatsPage';  // Import StatsPage
import './styles/index.css'; // Updated import for styling
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />

        {/* Main page route (Map and tracking functionality) */}
        <Route path="/main" element={<MainPage />} />

        {/* Stats page route */}
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
