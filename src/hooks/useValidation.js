import {useEffect, useState} from 'react';

export function useValidation(value, validators) {
    const [maxLengthError, setMaxlengthError] = useState(false);
    const [minLengthError, setMinlengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [requiredError, setRequiredError] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        for (let key in validators) {
            switch (key) {
                case 'maxLength':
                    const maxLength = validators[key] ?? Number.MAX_SAFE_INTEGER;
                    value.toString().length >= maxLength ? setMaxlengthError(true) : setMaxlengthError(false);
                    break;
                case 'minLength': {

                    let minLength = 0;

                    if (validators[key] === undefined) {
                        minLength = 0;
                    } else if (validators['minLength'] && validators['minLength'] < 0) {
                        minLength = 0;
                    } else {
                        minLength = validators['minLength'];
                    }

                    value.toString().length <= minLength ? setMinlengthError(true) : setMinlengthError(false);
                    break;
                }

                case 'email':
                    const regexp = /^\S+@\S+\.\S+$/;
                    regexp.test(value.toString()) ? setEmailError(false) : setEmailError(true);
                    break;

                case 'required':
                    value.toString().length ? setRequiredError(false) : setRequiredError(true);
                    break;

                default:
                    break;
            }
        }
    }, [value]);

    useEffect(() => {

        const errors = [];

        if (requiredError) {
            errors.push('This field is required')
        }

        if (maxLengthError) {
            errors.push(`Length should be less than: ${validators['maxLength']}`)
        }
        if( minLengthError ) {
            errors.push(`Length should be more than: ${validators['minLength']}`)
        }
        if (emailError) {
            errors.push('It should be valid email');
        }

        setErrors(errors);

        const isValid = !( maxLengthError || minLengthError || emailError || requiredError );

        setIsValid(isValid);

    }, [maxLengthError, minLengthError, emailError, requiredError]);

    return {
        errors,
        isValid
    }
}
