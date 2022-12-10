import './CommonLink.css';
import {Link} from "react-router-dom";

function CommonLink({ content, style, to}) {
    return (
        <Link
            style={style}
            className='common-link'
            to={to}
        >
            {content}
        </Link>
    );
}

export default CommonLink;
