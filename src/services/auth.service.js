import axios from "../utils/axios";
import {useCallback, useState} from "react";
import getCookie from "../utils/getCookie";

const useAuthService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loginUser = async ({username, password}) => {
        setLoading(true);

        try {
            const { data } = await axios.post(`/auth/sign-in?username=${username}&password=${password}`);
            setLoading(false);

            return data
        }  catch(error) {
            setLoading(false);
            setError(error.response.data)
            throw new Error(error.message);
        }
    }

    const registerUser = async (body) => {
        setLoading(true);

        try {
            const anonymousId = getCookie('anonymous');
            const { data } = await axios.post(`/auth/sign-up?anonymousUuid=${anonymousId}`, body);
            setLoading(false);

            return data;

        }  catch(error) {
            setLoading(false);
            setError(error.response.data);
            throw new Error(error);
        }
    }

    const getUserInfo = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(`/users/current`);

            setLoading(false);


            return data;

        } catch (err) {
            if( err.response?.status && err.response.status === 401) {
                setLoading(false);
                return err.response;
            }
            setLoading(false);
            setError(error.response.data)
        }
    }

    const clearError = useCallback(() => {
      setError('');
    }, []);


    return {
        error,
        loading,
        loginUser,
        registerUser,
        getUserInfo,
        clearError
    };
}

export default useAuthService;

