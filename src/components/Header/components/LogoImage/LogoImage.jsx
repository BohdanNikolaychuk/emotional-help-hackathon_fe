import logoImage from '../../../../assets/Logo.svg';

import './LogoImage.css';

function LogoImage() {
    return (
        <img
            className='logo-image'
            src={logoImage}
            alt="Medical logo"
        />
    );
}

export default LogoImage;
