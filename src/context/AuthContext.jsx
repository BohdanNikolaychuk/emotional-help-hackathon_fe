import {createContext, useContext, useState} from "react";
import {useCookie} from "../hooks/useCoockie";
import useAuthService from "../services/auth.service";
import {v4} from "uuid";


const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

const initialState = {
    user: null,
    isLoading: false,
    error: ''
}

export function AuthProvider({ children }) {
    const [token, setToken, removeToken] = useCookie('token');
    const [anonymousToken,setAnonymousToken,removeAnonymousToken] = useCookie('anonymous');
    const [userState, setUserState] = useState(initialState);
    const { loginUser, registerUser, getUserInfo, clearError, error } = useAuthService();

    const getUser = async () => {
        const user = await getUserInfo();

        if( user) { setUserState({...userState, user }) }
    }

    const signUp = async (body) => {
        const token = await registerUser(body);

        if(typeof token === "string") {
            setToken(token);
            removeAnonymousToken();
            await getUser();
        }
    }

    const logIn = async (body) => {
        const token = await loginUser(body);

        if(typeof token === "string") {
            setToken(token);
            removeAnonymousToken();
            await getUser();
        }
    }

    const logOut = () => {
        removeToken();
        setAnonymousToken(v4());
        setUserState(() => initialState);
    }

    return (
        <AuthContext.Provider value={{
            anonymousAuth: !!anonymousToken,
            isTokenAuth: !!token,
            userState: userState,
            user: userState.user,
            signUp,
            logIn,
            logOut,
            getUser,
            error,
            clearError
        }}>
            {children}
        </AuthContext.Provider>
    )
}
