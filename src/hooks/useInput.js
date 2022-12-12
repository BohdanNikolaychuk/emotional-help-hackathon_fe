import {useValidation} from './useValidation';
import {useState} from "react";

export function useInput(initialValue, validators = {}) {
    const [value, setValue] = useState(initialValue);
    const [touched, setIsTouched] = useState(false);
    const { isValid, errors } = useValidation(value, validators);

    const onBlur = () => {
        setIsTouched(true);
    }

    const onChange = (event) => {
        setValue(event.target.value);
    }

    return {
        value,
        onBlur,
        onChange,
        touched,
        isValid,
        errors
    }
}
