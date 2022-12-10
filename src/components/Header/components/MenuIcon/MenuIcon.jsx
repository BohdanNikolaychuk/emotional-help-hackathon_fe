import './MenuIcon.css';

function MenuIcon({ onClick }) {
    return (
        <div className='burger-icon'
            onClick={onClick}
        >
            <span></span>
        </div>
    );
}

export default MenuIcon;
