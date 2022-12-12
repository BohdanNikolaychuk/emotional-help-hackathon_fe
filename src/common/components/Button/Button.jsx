import './Button.css';

function Button({ buttonText, onClick, style, type='button', disabled=false }) {
    return (
        <button
            style={style}
            className='common-button'
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {buttonText}
        </button>
    );
}

export default Button;
