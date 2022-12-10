import LogoImage from "../LogoImage/LogoImage.jsx";

import './Logo.css'
import {Link} from "react-router-dom";

function Logo() {
    return (
        <>
            <LogoImage />
            <Link className='logo-text' to='/'>Medical</Link>
        </>
    );
}

export default Logo;
