import './Input.css';
import {useId} from "react";

function Input({ labelText, onChange, style, type ='text', value }) {

    const id = useId();

    const getLabel = (labelText) => {
        if( !labelText ) return;

        return <label className='common-input-label' htmlFor={id}>{labelText}</label>

    }

    const label = getLabel(labelText);

    return (
        <div
            className='input-container'
        >
            <input
                id={id}
                className='common-input'
                style={style}
                type={type}
                placeholder={' '}
                onChange={onChange}
                value={value}
            />
            {label}
        </div>
    );
}

export default Input;
