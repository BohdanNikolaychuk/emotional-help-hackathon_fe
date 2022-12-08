import { Routes, Route, Navigate } from 'react-router-dom';

import {useCookie} from "./hooks/useCoockie";
import {useEffect} from "react";

import {v4} from 'uuid';

import Registration from "./pages/Registration/Registration";
import SelfTest from './pages/SelfTest/SelfTest';
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import {useAuth} from "./context/AuthContext";

function App() {
    const [anonymousCookie,setAnonymousCookie] = useCookie('anonymous');
    const [token] = useCookie('token');
    const {getUser, isTokenAuth} = useAuth();

    useEffect(() => {
        if( !anonymousCookie && !token ) setAnonymousCookie(v4());
        if( token ) getUser();
    }, []);

    const getRoutes = (isAuth) => {
        if( isAuth ) return <Route path="/profile" element={<Profile />} />

        return (
            <>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
            </>
        )
    }

    const additionalRoutes = getRoutes(isTokenAuth);

    return (
        <div className="App">
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/selftest" element={<SelfTest />} />
                {additionalRoutes}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div >
    );
}

export default App;
