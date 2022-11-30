import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import SelfTest from './pages/SelfTest/SelfTest';
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selftest" element={<SelfTest />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div >
  );
}

export default App;
