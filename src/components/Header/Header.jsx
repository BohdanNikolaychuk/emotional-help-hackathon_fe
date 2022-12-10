import './Header.css';
import {createRef, useCallback, useState} from "react";
import Logo from "./components/Logo/Logo.jsx";
import RoundedLink from "./components/RoundedLink/RoundedLink.jsx";
import CommonLink from "./components/CommonLink/CommonLink.jsx";
import Menu from "./components/Menu/Menu.jsx";
import MenuIcon from "./components/MenuIcon/MenuIcon.jsx";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

const links = [
    {
        path: '/',
        label: 'Home'
    },
    {
        path: '/selftest',
        label: 'Self-Test'
    },
]


function Header() {

    const {isTokenAuth, logOut} = useAuth();
    const [showMenu, setShowMenu] = useState(false);


    const handleLogOut = () => {
        logOut();
    }

    const getListItems = (items, className) => {
        return items.map((item) => (
            <li key={Math.random()} className={className}>
                <Link className='header-link' to={item.path}>{item.label}</Link>
            </li>
        ))
    }

    const getNavButtons = (isAuth) => {
        if( isAuth ) {
            return (
                <>
                    <button className='header-logout' onClick={handleLogOut}>Logout</button>
                    <div className='divider'></div>
                    <RoundedLink content='Profile' to='/profile'/>
                </>
            )
        }

        return (
            <>
                <CommonLink content='Login' to='/login'/>
                <div className='divider'></div>
                <RoundedLink content='Register' to='/registration'/>
            </>
        )
    }

    const closeBurgerMenu = () => {
        setShowMenu(false);
    }

    const toggleMenuOpen = (event) => {
        event.stopPropagation();
        setShowMenu(prev => !prev)
    }

    const navListItems = getListItems(links, 'header-list-item');
    const menuListItems = getListItems(links, 'popup-menu-list-item');
    const navButtons = getNavButtons(isTokenAuth);

    return (
        <header className='header'>
            <div className='container'>
                <nav className='header-nav'>
                    <div className='header-burger'>
                        <MenuIcon
                            onClick={toggleMenuOpen}
                        />
                        <Menu
                            open={showMenu}
                            closeMenu={closeBurgerMenu}
                        >
                            {menuListItems}
                        </Menu>
                    </div>

                    <div className='header-logo'>
                        <Logo />
                    </div>

                    <ul className='header-list'>
                        {navListItems}
                    </ul>

                    <div className='header-buttons'>
                        {navButtons}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
