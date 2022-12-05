import './Button.css';

function Button({ buttonText, onClick, style, type='button' }) {
    return (
        <button
            style={style}
            className='common-button'
            onClick={onClick}
            type={type}
        >
            {buttonText}
        </button>
    );
}

export default Button;
