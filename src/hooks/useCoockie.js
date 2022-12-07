import {useState} from "react";
import getCookie from "../utils/getCookie";

function putCookie(key, value, props={}) {
    let expiresIn = props.expiresIn ?? 1;

    if( expiresIn && typeof expiresIn === "number") {
         const timeInMilliseconds = expiresIn * 24 * 60 * 60 * 1000;
         const expireDate = new Date();
         expireDate.setTime(new Date().getTime() + timeInMilliseconds)
         props.expiresIn = expireDate.toUTCString();
    }

    if( expiresIn && expiresIn instanceof Date) {
        props.expiresIn = expiresIn.toUTCString();
    }

    document.cookie = `${key}=${value}; expires=${props.expiresIn}; path=/`
}

export function useCookie(key, initialValue) {
    const [cookie, setCookie] = useState(() => {
        const cookieByKey = getCookie(key);
        if( cookieByKey ) return cookieByKey;

        if( typeof initialValue !== "string" ) return initialValue?.toString() ?? '';
        return initialValue ?? '';
    });

    const changeCookie = (value, props) => {
        putCookie(key, value, props);
        setCookie(value);
    }

    const removeCookie = () => {
        putCookie(key, '', { expiresIn: -1});
        setCookie(undefined);
    }

    return [cookie, changeCookie, removeCookie];
}
