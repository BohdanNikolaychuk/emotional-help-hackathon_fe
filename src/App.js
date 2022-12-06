import { Routes, Route, Navigate } from 'react-router-dom';

import Registration from "./pages/Registration/Registration";
import SelfTest from './pages/SelfTest/SelfTest';
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selftest" element={<SelfTest />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div >
  );
}

export default App;
