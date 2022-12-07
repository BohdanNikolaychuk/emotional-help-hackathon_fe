import axios from "../utils/axios";
import {useState} from "react";
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
            setError(error.message)
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
            setError(error.message)
            throw new Error(error.message);
        }
    }

    const getUserInfo = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(`users/current`);

            setLoading(false);

            return data;

        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    }

    return {error, loading, loginUser, registerUser, getUserInfo};
}

export default useAuthService;

