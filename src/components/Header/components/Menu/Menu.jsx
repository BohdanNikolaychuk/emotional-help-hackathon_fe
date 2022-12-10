import './Menu.css';
import {createRef, useCallback, useEffect} from "react";
import {useLocation} from "react-router-dom";

function Menu({ closeMenu, children, open }) {

    const menuRef = createRef();

    useEffect(() => {
        if (open) document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [open])

    const handleClick = useCallback((event) => {
        event.stopImmediatePropagation();
        if(menuRef.current?.contains(event.target)) return;
        closeMenu();
    }, []);

    return (
        <>
            {open &&
                <div ref={menuRef} className='popup-menu'>
                    <ul className='popup-menu-list'>
                        {children}
                    </ul>
                </div>
            }
        </>
    );
}

export default Menu;
