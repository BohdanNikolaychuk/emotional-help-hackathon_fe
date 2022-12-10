import logoImage from '../../../../assets/Logo.svg';

function Logo() {
    return (
        <img style={{objectFit: "cover", maxWidth: "100%", maxHeight: "100%"}} src={logoImage} alt="Medical logo"/>
    );
}

export default Logo;
