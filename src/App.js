import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import SelfTest from './pages/SelfTest/SelfTest';

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/selftest">About</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selftest" element={<SelfTest />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
